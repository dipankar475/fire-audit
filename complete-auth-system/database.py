import sqlite3
import os
import time

DB_FILE = os.path.join(os.path.dirname(__file__), 'auth.db')

def get_db():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row  # Dict-like row access
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()
    
    # Users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT DEFAULT 'user',
            is_active INTEGER DEFAULT 0,
            created_at REAL NOT NULL
        )
    ''')
    
    # OTPs table (for verification codes and 2FA tokens)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS otps (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL,
            otp_code TEXT NOT NULL,
            otp_type TEXT NOT NULL, -- 'activation' or '2fa'
            expires_at REAL NOT NULL,
            created_at REAL NOT NULL
        )
    ''')
    
    # Index for fast OTP queries
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_otps_email ON otps(email)')
    
    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db()
    print("Database schema initialized successfully.")
