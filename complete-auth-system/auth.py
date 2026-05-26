import hashlib
import os
import base64
import hmac
import json
import time

# Secret key for signing session tokens
# In production, this would be loaded from an environment variable
JWT_SECRET = os.environ.get("JWT_SECRET", "secure_auth_system_secret_key_99881122")

# =====================================================================
# PASSWORD HASHING (Scrypt)
# =====================================================================

def hash_password(password: str) -> str:
    """Hash password using OWASP-recommended memory-hard scrypt algorithm."""
    salt = os.urandom(16)
    # n=16384 (CPU/memory cost), r=8 (block size), p=1 (parallelization)
    key = hashlib.scrypt(password.encode('utf-8'), salt=salt, n=16384, r=8, p=1, dklen=64)
    
    # Store parameters alongside base64 encoded salt and key
    encoded_salt = base64.b64encode(salt).decode('utf-8')
    encoded_key = base64.b64encode(key).decode('utf-8')
    return f"scrypt$16384$8$1${encoded_salt}${encoded_key}"

def verify_password(password: str, hashed_val: str) -> bool:
    """Verify password by checking computed scrypt hash against stored values."""
    try:
        parts = hashed_val.split('$')
        if len(parts) != 6 or parts[0] != 'scrypt':
            return False
        n = int(parts[1])
        r = int(parts[2])
        p = int(parts[3])
        salt = base64.b64decode(parts[4])
        stored_key = base64.b64decode(parts[5])
        
        computed_key = hashlib.scrypt(password.encode('utf-8'), salt=salt, n=n, r=r, p=p, dklen=len(stored_key))
        return hmac.compare_digest(stored_key, computed_key)
    except Exception:
        return False

# =====================================================================
# CUSTOM JWT COMPLIANT SIGNATURES (HMAC-SHA256)
# =====================================================================

def base64url_encode(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).decode('utf-8').replace('=', '')

def base64url_decode(s: str) -> bytes:
    padding = '=' * (4 - len(s) % 4)
    return base64.urlsafe_b64decode(s + padding)

def create_jwt(payload: dict, expires_in_seconds: int = 3600) -> str:
    """Create a signed JWT-like base64url encoded token valid for expires_in_seconds."""
    header = {"alg": "HS256", "typ": "JWT"}
    
    # Set expiration time
    payload_copy = payload.copy()
    payload_copy['exp'] = int(time.time() + expires_in_seconds)
    
    header_b64 = base64url_encode(json.dumps(header).encode('utf-8'))
    payload_b64 = base64url_encode(json.dumps(payload_copy).encode('utf-8'))
    
    signing_input = f"{header_b64}.{payload_b64}".encode('utf-8')
    signature = hmac.new(JWT_SECRET.encode('utf-8'), signing_input, hashlib.sha256).digest()
    signature_b64 = base64url_encode(signature)
    
    return f"{header_b64}.{payload_b64}.{signature_b64}"

def verify_jwt(token: str) -> dict:
    """Verify standard signature and expiration. Returns the payload or None."""
    try:
        parts = token.split('.')
        if len(parts) != 3:
            return None
            
        header_b64, payload_b64, signature_b64 = parts
        
        signing_input = f"{header_b64}.{payload_b64}".encode('utf-8')
        expected_signature = hmac.new(JWT_SECRET.encode('utf-8'), signing_input, hashlib.sha256).digest()
        expected_signature_b64 = base64url_encode(expected_signature)
        
        # Prevent timing attacks via constant-time hmac compare_digest
        if not hmac.compare_digest(signature_b64.encode('utf-8'), expected_signature_b64.encode('utf-8')):
            return None
            
        payload = json.loads(base64url_decode(payload_b64).decode('utf-8'))
        
        # Verify expiration
        exp = payload.get('exp', 0)
        if exp < time.time():
            return None # Token has expired
            
        return payload
    except Exception:
        return None
