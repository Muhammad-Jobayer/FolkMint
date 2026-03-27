import os
import psycopg2
from dotenv import load_dotenv

load_dotenv('.env')

conn = psycopg2.connect(
    host=os.getenv('DB_HOST'), database=os.getenv('DB_NAME'),
    user=os.getenv('DB_USER'), password=os.getenv('DB_PASSWORD'), port=os.getenv('DB_PORT')
)
cur = conn.cursor()

base_dir = r"c:\Users\HP\OneDrive\Desktop\FolkMint Stuff\FolkMint project\gemini_img\catagorized img"

# Make sure we have a seller
cur.execute("SELECT user_id FROM users WHERE role='seller' LIMIT 1")
seller = cur.fetchone()
if not seller:
    cur.execute("SELECT user_id FROM users LIMIT 1")
    seller = cur.fetchone()
seller_id = seller[0] if seller else 1

# Process All Parents
for parent in os.listdir(base_dir):
    parent_path = os.path.join(base_dir, parent)
    if not os.path.isdir(parent_path): continue
    
    # 1. Insert parent category
    parent_name = parent[:100]
    cur.execute("SELECT category_id FROM category WHERE name = %s AND parent_category IS NULL", (parent_name,))
    res = cur.fetchone()
    if res:
        parent_id = res[0]
    else:
        cur.execute("INSERT INTO category (name) VALUES (%s) RETURNING category_id", (parent_name,))
        parent_id = cur.fetchone()[0]
        
    # 2. Iterate ALL subcategories
    subcategories = os.listdir(parent_path)
    for sub in subcategories: # No more slicing
        sub_path = os.path.join(parent_path, sub)
        if not os.path.isdir(sub_path): continue
        
        sub_name = sub[:100]
        cur.execute("SELECT category_id FROM category WHERE name = %s AND parent_category = %s", (sub_name, parent_id))
        res2 = cur.fetchone()
        if res2:
            sub_id = res2[0]
        else:
            cur.execute("INSERT INTO category (name, parent_category) VALUES (%s, %s) RETURNING category_id", (sub_name, parent_id))
            sub_id = cur.fetchone()[0]
            
        # 3. Create products for images in sub_path
        images = os.listdir(sub_path)
        print(f"Processing subcategory {sub_name} with {len(images)} items.")
        
        for img in images:
            img_path = os.path.join(sub_path, img)
            if not os.path.isfile(img_path) or not img.lower().endswith(('.jpg', '.jpeg', '.png', '.webp', '.gif', '.jfif', '.avif')): 
                continue
                
            # Create a unique product name
            p_name_base = f"{sub_name} {img.split('.')[0]}"[:100]
            
            # Check if product OR image already exists linked to this category to avoid exact duplicates
            rel_url = f"/images/catagorized img/{parent}/{sub}/{img}".replace('\\', '/')
            cur.execute("SELECT 1 FROM product_image WHERE image_url = %s", (rel_url,))
            if cur.fetchone():
                continue
                
            # Create product
            cur.execute(
                "INSERT INTO product (name, description, base_price, category_id, seller_id) VALUES (%s, %s, %s, %s, %s) RETURNING product_id",
                (p_name_base, f"Authentic handcrafted {sub_name} artifact.", 1200.0, sub_id, seller_id)
            )
            prod_id = cur.fetchone()[0]
            
            # Create variant
            cur.execute(
                "INSERT INTO product_variant (product_id, stock_quantity, price) VALUES (%s, %s, %s) RETURNING variant_id",
                (prod_id, 15, 1200.0)
            )
            var_id = cur.fetchone()[0]
            
            # Create image mapping
            cur.execute("INSERT INTO product_image (variant_id, image_url) VALUES (%s, %s)", (var_id, rel_url))
            
conn.commit()
print("Success: Fully populated all subcategories and relevant item images.")
