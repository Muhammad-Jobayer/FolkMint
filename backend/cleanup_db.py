import os
import psycopg2
from dotenv import load_dotenv

load_dotenv('.env')

conn = psycopg2.connect(
    host=os.getenv('DB_HOST'), database=os.getenv('DB_NAME'),
    user=os.getenv('DB_USER'), password=os.getenv('DB_PASSWORD'), port=os.getenv('DB_PORT')
)
cur = conn.cursor()

# 1. Names of categories we want (from gemini_img)
desired_parents = ['art', 'bambo craft', 'folk jewelary', 'folk musical stuff', 'folk textile', 'handi craft', 'home decor', 'poittry and clay', 'stone craft', 'wooden craft']

# 2. Get list of all parents
cur.execute("SELECT category_id, name FROM category WHERE parent_category IS NULL")
all_parents = cur.fetchall()

for cid, name in all_parents:
    if name not in desired_parents:
        print(f"Deleting non-standard category: {name} (ID: {cid})")
        # To avoid foreign key issues, we might need to cascade or move items
        # But this is a cleanup, so we'll just delete (CASCADE handles children)
        try:
            cur.execute("DELETE FROM category WHERE category_id = %s", (cid,))
        except Exception as e:
            print(f"Error deleting {name}: {e}")
            conn.rollback()
            continue

conn.commit()
print("Database cleanup complete. Current Parents:")
cur.execute("SELECT name FROM category WHERE parent_category IS NULL")
print([r[0] for r in cur.fetchall()])
