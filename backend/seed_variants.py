import psycopg2
from psycopg2.extras import RealDictCursor

def seed_missing_variants():
    try:
        conn = psycopg2.connect("postgresql://postgres:hqhq@localhost:5432/postgres")
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        # 0. Fix existing NULLs
        cur.execute("UPDATE product_variant SET size = 'Standard' WHERE size IS NULL")
        cur.execute("UPDATE product_variant SET color = 'Authentic' WHERE color IS NULL")
        
        # 1. Find products without variants
        cur.execute("""
            SELECT p.product_id, p.name 
            FROM product p 
            LEFT JOIN product_variant pv ON p.product_id = pv.product_id 
            WHERE pv.variant_id IS NULL
        """)
        empty_prods = cur.fetchall()
        print(f"Found {len(empty_prods)} products without variants.")
        
        for p in empty_prods:
            # Add a demo specification
            cur.execute("""
                INSERT INTO product_variant (product_id, size, color, stock_quantity, price) 
                VALUES (%s, %s, %s, %s, 
                    (SELECT base_price FROM product WHERE product_id = %s)
                ) RETURNING variant_id
            """, (p['product_id'], 'Standard Edition', 'Authentic Dye', 25, p['product_id']))
            variant_id = cur.fetchone()['variant_id']
            
            # Add a default image if none (Using a placeholder from the delta)
            cur.execute("INSERT INTO product_image (variant_id, image_url) VALUES (%s, %s)", 
                        (variant_id, 'images/products/Screenshot-2025-09-06-184742.png'))
            
            print(f"Seeded variants/images for artifact: {p['name']}")
            
        conn.commit()
        print("Heritage Registry successfully populated with demo specifications.")
        conn.close()
    except Exception as e:
        print(f"Error seeding variants: {e}")

if __name__ == "__main__":
    seed_missing_variants()
