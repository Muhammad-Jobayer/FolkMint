import psycopg2, os
from dotenv import load_dotenv

load_dotenv('.env')
conn = psycopg2.connect(
    host=os.getenv('DB_HOST'), database=os.getenv('DB_NAME'),
    user=os.getenv('DB_USER'), password=os.getenv('DB_PASSWORD'), port=os.getenv('DB_PORT')
)
cur = conn.cursor()
try:
    cur.execute("ALTER TABLE order_item RENAME COLUMN unit_price TO price_at_purchase;")
    conn.commit()
    print("Column renamed successfully.")
except Exception as e:
    print(e)
