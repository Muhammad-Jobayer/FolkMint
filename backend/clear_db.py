import os
import psycopg2
from dotenv import load_dotenv

load_dotenv('.env')

conn = psycopg2.connect(
    host=os.getenv('DB_HOST'), database=os.getenv('DB_NAME'),
    user=os.getenv('DB_USER'), password=os.getenv('DB_PASSWORD'), port=os.getenv('DB_PORT')
)
cur = conn.cursor()

# 1. Clear ALL categories (CASCADE will clear children)
cur.execute("TRUNCATE TABLE category CASCADE")
conn.commit()
print("Cleared all categories.")
