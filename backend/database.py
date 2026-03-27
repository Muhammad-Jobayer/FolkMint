import os
import psycopg2
from psycopg2 import pool
from fastapi import HTTPException
from dotenv import load_dotenv

load_dotenv()

# Database configuration
db_config = {
    "host": os.getenv("DB_HOST", "localhost"),
    "database": os.getenv("DB_NAME", "postgres"),
    "user": os.getenv("DB_USER", "postgres"),
    "password": os.getenv("DB_PASSWORD", ""),
    "port": os.getenv("DB_PORT", "5432")
}

try:
    print(f"DEBUG: Attempting to connect to PostgreSQL at {db_config['host']}:{db_config['port']} as {db_config['user']}")
    # Use ThreadedConnectionPool for thread safety in FastAPI (with sync def routes)
    connection_pool = psycopg2.pool.ThreadedConnectionPool(1, 20, **db_config)
    if connection_pool:
        print("PostgreSQL threaded connection pool initialized successfully")
except Exception as err:
    print(f"CRITICAL ERROR: Failed to create PostgreSQL connection pool: {err}")
    connection_pool = None

def get_db():
    if connection_pool is None:
        raise HTTPException(status_code=500, detail="Database connection not available. Please check PostgreSQL credentials.")
    connection = connection_pool.getconn()
    try:
        yield connection
    finally:
        connection_pool.putconn(connection)

def standard_response(success: bool, data: any = None, message: str = ""):
    return {
        "success": success,
        "data": data,
        "message": message
    }
