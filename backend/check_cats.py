import psycopg2
from psycopg2.extras import RealDictCursor

def list_cats():
    try:
        conn = psycopg2.connect("postgresql://postgres:hqhq@localhost:5432/postgres")
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("SELECT category_id, name FROM category")
        cats = cur.fetchall()
        for cat in cats:
            print(f"ID: {cat['category_id']}, Name: {cat['name']}")
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    list_cats()
