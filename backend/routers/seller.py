from fastapi import APIRouter, Depends
from psycopg2.extras import RealDictCursor
from database import get_db, standard_response
from models import ProductCreate, ProductUpdate, OrderItemStatusUpdate
from auth_utils import role_required

router = APIRouter(prefix="/api", tags=["seller"])

@router.get("/seller/products")
def get_seller_products(current_user: dict = Depends(role_required(["seller", "admin"])), db=Depends(get_db)):
    seller_id = current_user["user_id"]
    cursor = db.cursor(cursor_factory=RealDictCursor)
    try:
        cursor.execute("""
            SELECT p.product_id, p.name, p.description, p.base_price, p.category_id, p.seller_id,
                   COALESCE(SUM(oi.quantity), 0) as sold_count
            FROM product p
            LEFT JOIN product_variant pv ON p.product_id = pv.product_id
            LEFT JOIN order_item oi ON pv.variant_id = oi.variant_id
            WHERE p.seller_id = %s
            GROUP BY p.product_id
        """, (seller_id,))
        products = cursor.fetchall()
        for p in products:
            p["base_price"] = float(p["base_price"])
            cursor.execute("SELECT * FROM product_variant WHERE product_id = %s", (p["product_id"],))
            variants = cursor.fetchall()
            for v in variants:
                v["price"] = float(v["price"])
                v.pop('created_at', None)
                v.pop('updated_at', None)
            p["variants"] = variants
            
            p["main_image"] = None
            if p["variants"]:
                cursor.execute("SELECT image_url FROM product_image WHERE variant_id = %s LIMIT 1", (p["variants"][0]["variant_id"],))
                img = cursor.fetchone()
                if img:
                    p["main_image"] = img["image_url"]

        return standard_response(True, data=products)
    except Exception as e:
        return standard_response(False, message=str(e))
    finally:
        cursor.close()

@router.post("/seller/products")
def create_seller_product(product: ProductCreate, image_url: str = "", current_user: dict = Depends(role_required(["seller"])), db=Depends(get_db)):
    seller_id = current_user["user_id"]
    cursor = db.cursor(cursor_factory=RealDictCursor)
    try:
        cursor.execute(
            "INSERT INTO product (name, description, base_price, category_id, seller_id) VALUES (%s,%s,%s,%s,%s) RETURNING product_id",
            (product.name, product.description, product.base_price, product.category_id, seller_id)
        )
        product_id = cursor.fetchone()["product_id"]
        
        # Fixed: allow custom stock if needed, for now default to 10 but can be enhanced
        cursor.execute(
            "INSERT INTO product_variant (product_id, price, stock_quantity) VALUES (%s,%s,10) RETURNING variant_id",
            (product_id, product.base_price)
        )
        variant_id = cursor.fetchone()["variant_id"]
        
        if image_url:
            cursor.execute("INSERT INTO product_image (image_url, variant_id) VALUES (%s,%s)", (image_url, variant_id))
        db.commit()
        return standard_response(True, data={"product_id": product_id}, message="Product created successfully")
    except Exception as err:
        db.rollback()
        return standard_response(False, message=f"Failed to create product: {str(err)}")
    finally:
        cursor.close()

# Fixed: Added security (role_required)
@router.put("/seller/products/{product_id}")
def update_seller_product(product_id: int, product: ProductUpdate, current_user: dict = Depends(role_required(["seller", "admin"])), db=Depends(get_db)):
    seller_id = current_user["user_id"]
    cursor = db.cursor()
    try:
        # Verify ownership
        if current_user["role"] != "admin":
            cursor.execute("SELECT seller_id FROM product WHERE product_id = %s", (product_id,))
            res = cursor.fetchone()
            if not res or res[0] != seller_id:
                return standard_response(False, message="Permission denied. You do not own this product.")

        updates = []
        params = []
        if product.name: updates.append("name=%s"); params.append(product.name)
        if product.description: updates.append("description=%s"); params.append(product.description)
        if product.base_price: updates.append("base_price=%s"); params.append(product.base_price)
        if product.category_id: updates.append("category_id=%s"); params.append(product.category_id)
        if updates:
            params.append(product_id)
            cursor.execute(f"UPDATE product SET {', '.join(updates)} WHERE product_id=%s", params)
            db.commit()
        return standard_response(True, message="Product updated successfully")
    except Exception as e:
        db.rollback()
        return standard_response(False, message=str(e))
    finally:
        cursor.close()

# Fixed: Added security (role_required)
@router.delete("/seller/products/{product_id}")
def delete_seller_product(product_id: int, current_user: dict = Depends(role_required(["seller", "admin"])), db=Depends(get_db)):
    seller_id = current_user["user_id"]
    cursor = db.cursor()
    try:
        # Verify ownership
        if current_user["role"] != "admin":
            cursor.execute("SELECT seller_id FROM product WHERE product_id = %s", (product_id,))
            res = cursor.fetchone()
            if not res or res[0] != seller_id:
                return standard_response(False, message="Permission denied. You do not own this product.")

        cursor.execute("DELETE FROM product WHERE product_id=%s", (product_id,))
        db.commit()
        return standard_response(True, message="Product deleted successfully")
    except Exception as e:
        db.rollback()
        return standard_response(False, message=str(e))
    finally:
        cursor.close()

@router.get("/seller/orders")
def get_seller_orders(current_user: dict = Depends(role_required(["seller", "admin"])), db=Depends(get_db)):
    seller_id = current_user["user_id"]
    cursor = db.cursor(cursor_factory=RealDictCursor)
    try:
        cursor.execute("""
            SELECT DISTINCT o.*, u.first_name, u.last_name, u.email 
            FROM orders o 
            JOIN users u ON o.user_id = u.user_id 
            JOIN order_item oi ON o.order_id = oi.order_id
            JOIN product_variant pv ON oi.variant_id = pv.variant_id
            JOIN product p ON pv.product_id = p.product_id
            WHERE p.seller_id = %s
            ORDER BY o.order_date DESC
        """, (seller_id,))
        orders = cursor.fetchall()
        
        for o in orders:
            o["order_date"] = o["order_date"].isoformat() if o.get("order_date") else None
            o["total_amount"] = float(o["total_amount"])
            
            cursor.execute("""
                SELECT oi.*, p.name, pv.size, pv.color 
                FROM order_item oi
                JOIN product_variant pv ON oi.variant_id = pv.variant_id
                JOIN product p ON pv.product_id = p.product_id
                WHERE oi.order_id = %s AND p.seller_id = %s
            """, (o["order_id"], seller_id))
            items = cursor.fetchall()
            for i in items:
                i["price_at_purchase"] = float(i["price_at_purchase"])
            o["items"] = items
            
        return standard_response(True, data=orders)
    except Exception as e:
        return standard_response(False, message=str(e))
    finally:
        cursor.close()

@router.put("/order-item/{item_id}/status")
def update_order_item_status(item_id: int, update: OrderItemStatusUpdate, current_user: dict = Depends(role_required(["seller", "admin"])), db=Depends(get_db)):
    seller_id = current_user["user_id"]
    cursor = db.cursor()
    try:
        # Verify ownership
        if current_user["role"] != "admin":
            cursor.execute("""
                SELECT p.seller_id 
                FROM order_item oi 
                JOIN product_variant pv ON oi.variant_id = pv.variant_id 
                JOIN product p ON pv.product_id = p.product_id 
                WHERE oi.order_item_id = %s
            """, (item_id,))
            res = cursor.fetchone()
            if not res or res[0] != seller_id:
                return standard_response(False, message="You do not have permission to update this order item")

        cursor.execute("SELECT order_id FROM order_item WHERE order_item_id = %s", (item_id,))
        res = cursor.fetchone()
        if not res:
            return standard_response(False, message="Order item not found")
        order_id = res[0]
        
        cursor.execute("UPDATE orders SET status = %s WHERE order_id = %s", (update.status, order_id))
        db.commit()
        return standard_response(True, message="Status updated successfully")
    except Exception as e:
        db.rollback()
        return standard_response(False, message=str(e))
    finally:
        cursor.close()
