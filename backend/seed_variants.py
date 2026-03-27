import os
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

load_dotenv()

def get_connection():
    db_url = os.getenv("DATABASE_URL", "postgresql://postgres:hqhq@localhost:5432/postgres")
    return psycopg2.connect(db_url)

def complete_database_setup():
    """
    Ensures the database is in a ready-to-use state:
    1. Creates a default seller if none exists.
    2. Creates a default category if none exists.
    3. Adds variants to products that are missing them.
    4. Ensures all product variants have at least one image.
    """
    try:
        conn = get_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        print("--- Starting Database Integrity Check ---")

        # 1. Ensure at least one Seller exists (needed for products)
        cur.execute("SELECT user_id FROM users WHERE role IN ('seller', 'admin') LIMIT 1")
        seller = cur.fetchone()
        if not seller:
            print("No seller found. Creating default 'FolkMint Artisan' account...")
            cur.execute("""
                INSERT INTO users (username, email, password_hash, first_name, last_name, role, shop_name)
                VALUES ('artisan', 'artisan@folkmint.com', 'pbkdf2:sha256:260000$local_debug_hash', 'FolkMint', 'Artisan', 'seller', 'The Heritage Workshop')
                RETURNING user_id
            """)
            seller_id = cur.fetchone()['user_id']
        else:
            seller_id = seller['user_id']

        # 2. Ensure at least one Category exists
        cur.execute("SELECT category_id FROM category LIMIT 1")
        if not cur.fetchone():
            print("No categories found. Seeding 'Traditional Crafts'...")
            cur.execute("INSERT INTO category (name) VALUES ('Traditional Crafts') RETURNING category_id")
            category_id = cur.fetchone()['category_id']
        else:
            cur.execute("SELECT category_id FROM category LIMIT 1")
            category_id = cur.fetchone()['category_id']

        # 3. Fix existing product/variant NULL values
        cur.execute("UPDATE product_variant SET size = 'Standard' WHERE size IS NULL")
        cur.execute("UPDATE product_variant SET color = 'Authentic' WHERE color IS NULL")
        cur.execute("UPDATE product SET seller_id = %s WHERE seller_id IS NULL", (seller_id,))
        cur.execute("UPDATE product SET category_id = %s WHERE category_id IS NULL", (category_id,))

        # 4. Find products without variants and add them
        cur.execute("""
            SELECT p.product_id, p.name 
            FROM product p 
            LEFT JOIN product_variant pv ON p.product_id = pv.product_id 
            WHERE pv.variant_id IS NULL
        """)
        empty_prods = cur.fetchall()
        if empty_prods:
            print(f"Adding variants to {len(empty_prods)} products...")
            for p in empty_prods:
                cur.execute("""
                    INSERT INTO product_variant (product_id, size, color, stock_quantity, price) 
                    VALUES (%s, %s, %s, %s, 
                        (SELECT COALESCE(base_price, 1200.0) FROM product WHERE product_id = %s)
                    ) RETURNING variant_id
                """, (p['product_id'], 'Standard', 'Original', 50, p['product_id']))
                print(f"  + Added variant for: {p['name']}")

        # 5. Ensure all variants have a product image
        cur.execute("""
            SELECT pv.variant_id, p.name
            FROM product_variant pv
            JOIN product p ON pv.product_id = p.product_id
            LEFT JOIN product_image pi ON pv.variant_id = pi.variant_id
            WHERE pi.image_id IS NULL
        """)
        imageless_variants = cur.fetchall()
        if imageless_variants:
            print(f"Adding placeholder images to {len(imageless_variants)} variants...")
            placeholder = "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=800"
            for v in imageless_variants:
                cur.execute("INSERT INTO product_image (variant_id, image_url) VALUES (%s, %s)", 
                            (v['variant_id'], placeholder))
            
        conn.commit()
        print("--- Database successfully completed and verified for deployment ---")
        conn.close()
    except Exception as e:
        print(f"Error during seeding: {e}")

if __name__ == "__main__":
    complete_database_setup()
