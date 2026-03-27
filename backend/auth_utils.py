import os
import jwt
from datetime import datetime, timedelta, timezone
from typing import List
from fastapi import Request, HTTPException, Depends
from psycopg2.extras import RealDictCursor
import bcrypt
from database import get_db

# Auth Configuration
SECRET_KEY = os.getenv("JWT_SECRET", "default-folkmint-secret-change-me")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))

def get_password_hash(password: str):
    # bcrypt has a 72-byte limit.
    pwd_bytes = password.encode('utf-8')[:72]
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(pwd_bytes, salt).decode('utf-8')

def verify_password(plain_password: str, hashed_password: str):
    # bcrypt has a 72-byte limit.
    try:
        pass_bytes = plain_password.encode('utf-8')[:72]
        hash_bytes = hashed_password.encode('utf-8')
        return bcrypt.checkpw(pass_bytes, hash_bytes)
    except Exception:
        return False

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Dependency to get current user from JWT in cookie
async def get_current_user(request: Request, db=Depends(get_db)):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
        
    cursor = db.cursor(cursor_factory=RealDictCursor)
    try:
        cursor.execute("SELECT user_id, email, first_name, last_name, role, profile_picture_url FROM users WHERE user_id = %s", (user_id,))
        user = cursor.fetchone()
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    finally:
        cursor.close()

# Dependency for Role-Based Access
def role_required(allowed_roles: List[str]):
    async def role_dependency(current_user: dict = Depends(get_current_user)):
        if current_user["role"] not in allowed_roles:
            raise HTTPException(status_code=403, detail="Operation not permitted for this role")
        return current_user
    return role_dependency
