import json
import re
import time
import os
from wsgiref.simple_server import make_server
import urllib.parse

from database import get_db, init_db
from auth import hash_password, verify_password, create_jwt, verify_jwt
from mailer import send_otp_email
from limiter import RateLimiter

# Initialize global rate limiters
# Limit register / login steps to 5 attempts per 5 minutes
login_limiter = RateLimiter(max_requests=5, window_seconds=300)
register_limiter = RateLimiter(max_requests=5, window_seconds=300)

# =====================================================================
# REQUEST AND ROUTING FRAMEWORK
# =====================================================================

class Request:
    def __init__(self, environ, body, path_groups):
        self.environ = environ
        self.body = body or {}
        self.path_groups = path_groups
        self.cookies = self._parse_cookies()
        self.headers = self._parse_headers()
        self.ip = environ.get('HTTP_X_FORWARDED_FOR', environ.get('REMOTE_ADDR', '127.0.0.1'))

    def _parse_cookies(self):
        cookie_header = self.environ.get('HTTP_COOKIE', '')
        cookies = {}
        if cookie_header:
            for item in cookie_header.split(';'):
                if '=' in item:
                    k, v = item.strip().split('=', 1)
                    cookies[k] = v
        return cookies

    def _parse_headers(self):
        headers = {}
        for k, v in self.environ.items():
            if k.startswith('HTTP_'):
                headers[k[5:].replace('_', '-').lower()] = v
            elif k in ('CONTENT_TYPE', 'CONTENT_LENGTH'):
                headers[k.replace('_', '-').lower()] = v
        return headers


class WSGIApp:
    def __init__(self):
        self.routes = []

    def route(self, path, methods=["GET"]):
        def decorator(func):
            # Compile path as regex for URL mapping
            self.routes.append((re.compile(f"^{path}$"), methods, func))
            return func
        return decorator

    def __call__(self, environ, start_response):
        path = environ.get('PATH_INFO', '/')
        method = environ.get('REQUEST_METHOD', 'GET')
        
        # Standard CORS headers for testing
        cors_headers = [
            ('Content-Type', 'application/json'),
            ('Access-Control-Allow-Origin', '*'),
            ('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'),
            ('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie'),
            ('Access-Control-Allow-Credentials', 'true')
        ]
        
        if method == 'OPTIONS':
            start_response('200 OK', cors_headers)
            return [b'']

        # Parse request body if JSON
        body = None
        content_length = int(environ.get('CONTENT_LENGTH', 0) or 0)
        if content_length > 0:
            request_body = environ['wsgi.input'].read(content_length)
            try:
                body = json.loads(request_body.decode('utf-8'))
            except Exception:
                start_response('400 Bad Request', cors_headers)
                return [json.dumps({"error": "Malformed JSON payload"}).encode('utf-8')]

        # Match path with registered routes
        for path_re, methods_list, func in self.routes:
            match = path_re.match(path)
            if match:
                if method not in methods_list:
                    start_response('405 Method Not Allowed', cors_headers)
                    return [json.dumps({"error": f"Method {method} not allowed"}).encode('utf-8')]
                
                request = Request(environ, body, match.groups())
                try:
                    status, resp_headers, resp_body = func(request)
                    # Merge default CORS headers
                    final_headers = cors_headers.copy()
                    for h_name, h_val in resp_headers:
                        final_headers = [h for h in final_headers if h[0].lower() != h_name.lower()]
                        final_headers.append((h_name, h_val))
                    
                    start_response(status, final_headers)
                    if isinstance(resp_body, str):
                        return [resp_body.encode('utf-8')]
                    return [resp_body]
                except Exception as e:
                    import traceback
                    traceback.print_exc()
                    start_response('500 Internal Server Error', cors_headers)
                    return [json.dumps({"error": f"Internal Server Error: {str(e)}"}).encode('utf-8')]

        # Serve static assets
        if method == 'GET' and (path.startswith('/static/') or path == '/'):
            return self.serve_static(path, start_response)

        start_response('404 Not Found', cors_headers)
        return [json.dumps({"error": "Resource not found"}).encode('utf-8')]

    def serve_static(self, path, start_response):
        if path == '/':
            path = '/index.html'
        else:
            path = path.replace('/static/', '/')
            
        file_path = os.path.join(os.path.dirname(__file__), 'static', path.lstrip('/'))
        if os.path.exists(file_path) and os.path.isfile(file_path):
            ext = os.path.splitext(file_path)[1]
            mime_types = {
                '.html': 'text/html',
                '.css': 'text/css',
                '.js': 'application/javascript',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.svg': 'image/svg+xml'
            }
            mime = mime_types.get(ext, 'text/plain')
            
            try:
                with open(file_path, 'rb') as f:
                    content = f.read()
                start_response('200 OK', [('Content-Type', mime), ('Content-Length', str(len(content)))])
                return [content]
            except Exception as e:
                start_response('500 Server Error', [('Content-Type', 'text/html')])
                return [f"<h1>500 Server Error: {str(e)}</h1>".encode('utf-8')]
            
        start_response('404 Not Found', [('Content-Type', 'text/html')])
        return [b'<h1>404 File Not Found</h1>']


app = WSGIApp()

# =====================================================================
# MIDDLEWARE HELPERS
# =====================================================================

def get_current_user(request: Request) -> dict:
    """Extract and verify session token from cookie or Authorization header."""
    token = request.cookies.get('token')
    if not token:
        # Check header
        auth_header = request.headers.get('authorization', '')
        if auth_header.startswith('Bearer '):
            token = auth_header[7:]
            
    if not token:
        return None
        
    payload = verify_jwt(token)
    return payload  # Contains sub (id), email, role


# =====================================================================
# API CONTROLLERS
# =====================================================================

@app.route('/api/auth/register', methods=['POST'])
def register(request: Request):
    # Rate Limiting check
    if register_limiter.is_rate_limited(request.ip):
        rem = register_limiter.get_remaining_seconds(request.ip)
        return '429 Too Many Requests', [], json.dumps({
            "error": f"Rate limit exceeded. Please wait {rem} seconds."
        })

    email = request.body.get('email', '').strip().lower()
    password = request.body.get('password', '')
    
    # Validation
    if not email or not password:
        return '400 Bad Request', [], json.dumps({"error": "Email and password are required"})
        
    if not re.match(r'^[^\s@]+@[^\s@]+\.[^\s@]+$', email):
        return '400 Bad Request', [], json.dumps({"error": "Invalid email address format"})
        
    if len(password) < 6:
        return '400 Bad Request', [], json.dumps({"error": "Password must be at least 6 characters long"})

    # Rate Limiting check on email
    if register_limiter.is_rate_limited(email):
        rem = register_limiter.get_remaining_seconds(email)
        return '429 Too Many Requests', [], json.dumps({
            "error": f"Rate limit exceeded for this email. Please wait {rem} seconds."
        })

    conn = get_db()
    cursor = conn.cursor()
    
    # Check if user already exists
    cursor.execute('SELECT id FROM users WHERE email = ?', (email,))
    if cursor.fetchone():
        conn.close()
        return '400 Bad Request', [], json.dumps({"error": "Email is already registered"})
        
    # Hash password
    pw_hash = hash_password(password)
    role = 'admin' if email.startswith('admin@') else 'user'
    
    # Create inactive user
    cursor.execute(
        'INSERT INTO users (email, password_hash, role, is_active, created_at) VALUES (?, ?, ?, 0, ?)',
        (email, pw_hash, role, time.time())
    )
    
    # Generate 6-digit OTP code
    import random
    otp = f"{random.randint(100000, 999999)}"
    expires_at = time.time() + 600  # 10 minutes expiry
    
    # Clear older registration OTPs
    cursor.execute('DELETE FROM otps WHERE email = ? AND otp_type = "activation"', (email,))
    
    # Save OTP to DB
    cursor.execute(
        'INSERT INTO otps (email, otp_code, otp_type, expires_at, created_at) VALUES (?, ?, "activation", ?, ?)',
        (email, otp, expires_at, time.time())
    )
    
    conn.commit()
    conn.close()
    
    # Send email
    email_sent = send_otp_email(email, otp, 'activation')
    if not email_sent:
        return '500 Internal Server Error', [], json.dumps({"error": "Failed to send verification email"})
        
    return '200 OK', [], json.dumps({"message": "Verification code dispatched to your email."})


@app.route('/api/auth/verify-registration', methods=['POST'])
def verify_registration(request: Request):
    email = request.body.get('email', '').strip().lower()
    code = request.body.get('code', '').strip()
    
    if not email or not code:
        return '400 Bad Request', [], json.dumps({"error": "Email and verification code are required"})

    conn = get_db()
    cursor = conn.cursor()
    
    # Retrieve active OTP
    cursor.execute(
        'SELECT * FROM otps WHERE email = ? AND otp_code = ? AND otp_type = "activation"',
        (email, code)
    )
    otp_record = cursor.fetchone()
    
    if not otp_record:
        conn.close()
        return '400 Bad Request', [], json.dumps({"error": "Invalid verification code"})
        
    if otp_record['expires_at'] < time.time():
        cursor.execute('DELETE FROM otps WHERE id = ?', (otp_record['id'],))
        conn.commit()
        conn.close()
        return '400 Bad Request', [], json.dumps({"error": "Verification code has expired"})
        
    # Mark user as active
    cursor.execute('UPDATE users SET is_active = 1 WHERE email = ?', (email,))
    # Delete verified OTP
    cursor.execute('DELETE FROM otps WHERE id = ?', (otp_record['id'],))
    
    conn.commit()
    conn.close()
    
    return '200 OK', [], json.dumps({"message": "Account successfully activated! You can now log in."})


@app.route('/api/auth/login-step1', methods=['POST'])
def login_step1(request: Request):
    # Rate Limit check
    if login_limiter.is_rate_limited(request.ip):
        rem = login_limiter.get_remaining_seconds(request.ip)
        return '429 Too Many Requests', [], json.dumps({
            "error": f"Too many attempts. Please try again in {rem} seconds."
        })

    email = request.body.get('email', '').strip().lower()
    password = request.body.get('password', '')
    
    if not email or not password:
        return '400 Bad Request', [], json.dumps({"error": "Email and password are required"})

    # Rate Limit check on email
    if login_limiter.is_rate_limited(email):
        rem = login_limiter.get_remaining_seconds(email)
        return '429 Too Many Requests', [], json.dumps({
            "error": f"Too many attempts for this email. Please try again in {rem} seconds."
        })

    conn = get_db()
    cursor = conn.cursor()
    
    # Query user credentials
    cursor.execute('SELECT * FROM users WHERE email = ?', (email,))
    user = cursor.fetchone()
    
    if not user or not verify_password(password, user['password_hash']):
        conn.close()
        return '401 Unauthorized', [], json.dumps({"error": "Invalid email or password"})
        
    if user['is_active'] == 0:
        conn.close()
        return '403 Forbidden', [], json.dumps({"error": "Please verify your email address to activate your account."})
        
    # Generate 6-digit OTP code for 2FA validation
    import random
    otp = f"{random.randint(100000, 999999)}"
    expires_at = time.time() + 600  # 10 minutes expiry
    
    # Clear older 2FA codes
    cursor.execute('DELETE FROM otps WHERE email = ? AND otp_type = "2fa"', (email,))
    
    # Save OTP to DB
    cursor.execute(
        'INSERT INTO otps (email, otp_code, otp_type, expires_at, created_at) VALUES (?, ?, "2fa", ?, ?)',
        (email, otp, expires_at, time.time())
    )
    
    conn.commit()
    conn.close()
    
    # Dispatch email
    email_sent = send_otp_email(email, otp, '2fa')
    if not email_sent:
        return '500 Internal Server Error', [], json.dumps({"error": "Failed to send 2FA verification email"})
        
    return '200 OK', [], json.dumps({
        "message": "Two-factor verification code sent to your email.",
        "email": email
    })


@app.route('/api/auth/login-step2', methods=['POST'])
def login_step2(request: Request):
    email = request.body.get('email', '').strip().lower()
    code = request.body.get('code', '').strip()
    
    if not email or not code:
        return '400 Bad Request', [], json.dumps({"error": "Email and 2FA code are required"})

    conn = get_db()
    cursor = conn.cursor()
    
    # Verify 2FA OTP
    cursor.execute(
        'SELECT * FROM otps WHERE email = ? AND otp_code = ? AND otp_type = "2fa"',
        (email, code)
    )
    otp_record = cursor.fetchone()
    
    if not otp_record:
        conn.close()
        return '400 Bad Request', [], json.dumps({"error": "Invalid verification code"})
        
    if otp_record['expires_at'] < time.time():
        cursor.execute('DELETE FROM otps WHERE id = ?', (otp_record['id'],))
        conn.commit()
        conn.close()
        return '400 Bad Request', [], json.dumps({"error": "2FA code has expired"})
        
    # Get user profile details
    cursor.execute('SELECT id, email, role FROM users WHERE email = ?', (email,))
    user = cursor.fetchone()
    
    if not user:
        conn.close()
        return '400 Bad Request', [], json.dumps({"error": "User record not found"})
        
    # Delete verified OTP
    cursor.execute('DELETE FROM otps WHERE id = ?', (otp_record['id'],))
    conn.commit()
    conn.close()
    
    # Generate JWT token payload
    payload = {
        "sub": user['id'],
        "email": user['email'],
        "role": user['role']
    }
    # Expire in 1 hour
    token = create_jwt(payload, expires_in_seconds=3600)
    
    # Set HttpOnly Session Cookie header
    cookie_expiry = time.strftime('%a, %d-%b-%Y %H:%M:%S GMT', time.gmtime(time.time() + 3600))
    cookie_str = f"token={token}; Path=/; HttpOnly; SameSite=Lax; Expires={cookie_expiry}"
    
    headers = [
        ('Set-Cookie', cookie_str)
    ]
    
    return '200 OK', headers, json.dumps({
        "message": "Logged in successfully.",
        "token": token,
        "user": {
            "email": user['email'],
            "role": user['role']
        }
    })


@app.route('/api/auth/logout', methods=['POST'])
def logout(request: Request):
    # Set expired cookie to clear from client browser
    cookie_str = "token=; Path=/; HttpOnly; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
    headers = [
        ('Set-Cookie', cookie_str)
    ]
    return '200 OK', headers, json.dumps({"message": "Logged out successfully."})


@app.route('/api/user/profile', methods=['GET'])
def user_profile(request: Request):
    user = get_current_user(request)
    if not user:
        return '401 Unauthorized', [], json.dumps({"error": "Access denied. Valid session token required."})
        
    return '200 OK', [], json.dumps({
        "user": {
            "email": user['email'],
            "role": user['role']
        }
    })


@app.route('/api/admin/dashboard', methods=['GET'])
def admin_dashboard(request: Request):
    user = get_current_user(request)
    if not user:
        return '401 Unauthorized', [], json.dumps({"error": "Access denied. Valid session token required."})
        
    if user['role'] != 'admin':
        return '403 Forbidden', [], json.dumps({"error": "Access denied. Admin access credentials required."})
        
    # Get simple stats from database
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute('SELECT COUNT(id) as cnt FROM users')
    total_users = cursor.fetchone()['cnt']
    
    cursor.execute('SELECT COUNT(id) as cnt FROM users WHERE is_active = 1')
    active_users = cursor.fetchone()['cnt']
    
    cursor.execute('SELECT COUNT(id) as cnt FROM users WHERE role = "admin"')
    admin_users = cursor.fetchone()['cnt']
    
    conn.close()
    
    return '200 OK', [], json.dumps({
        "message": "Welcome to the Secure Admin Panel.",
        "stats": {
            "total_users": total_users,
            "active_users": active_users,
            "admin_users": admin_users
        }
    })


# =====================================================================
# SERVER STARTUP & SEEDING
# =====================================================================

def seed_database():
    """Seed default active Admin credentials if users table is empty."""
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute('SELECT COUNT(id) as cnt FROM users')
    count = cursor.fetchone()['cnt']
    
    if count == 0:
        # Create default Admin
        admin_email = 'admin@secureauth.pro'
        admin_pass = 'admin123'
        admin_hash = hash_password(admin_pass)
        cursor.execute(
            'INSERT INTO users (email, password_hash, role, is_active, created_at) VALUES (?, ?, "admin", 1, ?)',
            (admin_email, admin_hash, time.time())
        )
        
        # Create default User
        user_email = 'user@secureauth.pro'
        user_pass = 'user123'
        user_hash = hash_password(user_pass)
        cursor.execute(
            'INSERT INTO users (email, password_hash, role, is_active, created_at) VALUES (?, ?, "user", 1, ?)',
            (user_email, user_hash, time.time())
        )
        
        conn.commit()
        print(f"\n[DATABASE SEEDED]")
        print(f"Default Admin: {admin_email} / {admin_pass}")
        print(f"Default User:  {user_email} / {user_pass}\n")
        
    conn.close()


def main():
    # Initialize DB files
    init_db()
    seed_database()
    
    # Start web server
    port = 8000
    server = make_server('0.0.0.0', port, app)
    print(f"Server is listening at http://localhost:{port}...")
    print("Serving static client SPA files at http://localhost:8000/")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server.")

if __name__ == '__main__':
    main()
