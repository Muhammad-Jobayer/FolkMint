import psycopg2, os
from dotenv import load_dotenv

load_dotenv('.env')
conn = psycopg2.connect(
    host=os.getenv('DB_HOST'), database=os.getenv('DB_NAME'),
    user=os.getenv('DB_USER'), password=os.getenv('DB_PASSWORD'), port=os.getenv('DB_PORT')
)
cur = conn.cursor()
cur.execute("ALTER TABLE order_item ALTER COLUMN product_id DROP NOT NULL")
conn.commit()
print("Constraint dropped")
