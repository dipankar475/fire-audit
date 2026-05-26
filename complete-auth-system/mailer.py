import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

# Read SMTP configuration variables from environment
# (If these are not configured, the mailer defaults to stdout console print logs)
SMTP_HOST = os.environ.get('SMTP_HOST', '')
SMTP_PORT = int(os.environ.get('SMTP_PORT', '587'))
SMTP_USER = os.environ.get('SMTP_USER', '')
SMTP_PASSWORD = os.environ.get('SMTP_PASSWORD', '')
SMTP_FROM = os.environ.get('SMTP_FROM', 'system@secureauth.pro')

def send_otp_email(to_email: str, otp: str, purpose: str) -> bool:
    """Send verification or 2FA OTP codes using smtplib or print to console logs."""
    subject = f"Verification Code: {otp}"
    purpose_label = "Activate Your Account" if purpose == 'activation' else "Secure Two-Factor Login"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>{purpose_label}</title>
        <style>
            body {{
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                background-color: #04070d;
                color: #e2e8f0;
                margin: 0;
                padding: 40px 20px;
            }}
            .card {{
                max-width: 480px;
                margin: 0 auto;
                background: #111827;
                border: 1px solid #1f2937;
                border-radius: 12px;
                padding: 36px;
                box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5);
            }}
            .logo {{
                font-size: 24px;
                font-weight: 800;
                color: #38bdf8;
                text-align: center;
                margin-bottom: 24px;
                letter-spacing: 1px;
            }}
            .title {{
                font-size: 20px;
                font-weight: 700;
                color: #ffffff;
                margin-bottom: 12px;
                text-align: center;
            }}
            .desc {{
                font-size: 13px;
                line-height: 1.6;
                color: #9ca3af;
                text-align: center;
                margin-bottom: 24px;
            }}
            .otp-box {{
                background: rgba(56, 189, 248, 0.06);
                border: 1px dashed rgba(56, 189, 248, 0.3);
                border-radius: 8px;
                font-size: 36px;
                font-weight: bold;
                color: #38bdf8;
                text-align: center;
                padding: 16px;
                letter-spacing: 6px;
                margin: 24px 0;
                font-family: monospace;
            }}
            .footer {{
                font-size: 11px;
                color: #4b5563;
                text-align: center;
                border-top: 1px solid #1f2937;
                padding-top: 16px;
                margin-top: 24px;
                line-height: 1.4;
            }}
        </style>
    </head>
    <body>
        <div class="card">
            <div class="logo">⚡ SecureAuth Pro</div>
            <div class="title">{purpose_label}</div>
            <p class="desc">Please enter the following 6-digit code. This verification code expires in 10 minutes. For your security, do not share this code.</p>
            <div class="otp-box">{otp}</div>
            <div class="footer">
                This is an automated system email. If you did not make this request, please change your password.<br>
                SecureAuth Pro Systems &copy; 2026
            </div>
        </div>
    </body>
    </html>
    """

    # Format output block for local console logging
    log_boundary = "=" * 60
    print(f"\n{log_boundary}")
    print(f"[SYSTEM EMAIL DISPATCH] (Simulated Delivery)")
    print(f"From: {SMTP_FROM}")
    print(f"To: {to_email}")
    print(f"Subject: {subject}")
    print(f"OTP Verification Code: {otp}")
    print(f"Purpose: {purpose.upper()}")
    print(f"{log_boundary}\n")

    # If SMTP variables are configured, attempt real email transmission
    if SMTP_HOST and SMTP_USER and SMTP_PASSWORD:
        try:
            msg = MIMEMultipart('alternative')
            msg['Subject'] = subject
            msg['From'] = SMTP_FROM
            msg['To'] = to_email
            
            part = MIMEText(html_content, 'html')
            msg.attach(part)
            
            server = smtplib.SMTP(SMTP_HOST, SMTP_PORT)
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.sendmail(SMTP_FROM, [to_email], msg.as_string())
            server.quit()
            print("[SMTP SUCCESS] Code sent successfully.")
            return True
        except Exception as e:
            print(f"[SMTP ERROR] Failed to send SMTP mail: {str(e)}")
            return False
            
    return True
