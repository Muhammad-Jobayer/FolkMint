from fastapi import APIRouter, Depends
from psycopg2.extras import RealDictCursor
from database import get_db, standard_response
from models import CartItemAdd
from auth_utils import get_current_user

router = APIRouter(prefix="/api/cart", tags=["cart"])

@router.get("")
def get_cart(current_user: dict = Depends(get_current_user), db=Depends(get_db)):
    user_id = current_user["user_id"]
    cursor = db.cursor(cursor_factory=RealDictCursor)
    try:
        cursor.execute("SELECT cart_id FROM cart WHERE user_id = %s", (user_id,))
        cart = cursor.fetchone()
        if not cart: return standard_response(True, data={"items": []})
        
        cursor.execute(
            """
            SELECT 
                ci.cart_item_id, ci.quantity, ci.variant_id, p.name, 
                pv.price, pv.color, pv.size, p.product_id,
                (SELECT image_url FROM product_image WHERE variant_id = pv.variant_id LIMIT 1) as image
            FROM cart_item ci 
            JOIN product_variant pv ON ci.variant_id = pv.variant_id 
            JOIN product p ON pv.product_id = p.product_id 
            WHERE ci.cart_id = %s
            """,
            (cart["cart_id"],)
        )
        items = cursor.fetchall()
        for i in items:
            i["price"] = float(i["price"])
        return standard_response(True, data={"items": items})
    except Exception as e:
        return standard_response(False, message=f"Failed to fetch cart: {str(e)}")
    finally:
        cursor.close()

@router.post("/add")
def add_to_cart(item: CartItemAdd, current_user: dict = Depends(get_current_user), db=Depends(get_db)):
    user_id = current_user["user_id"]
    cursor = db.cursor(cursor_factory=RealDictCursor)
    try:
        cursor.execute("SELECT cart_id FROM cart WHERE user_id = %s", (user_id,))
        cart = cursor.fetchone()
        if not cart:
            cursor.execute("INSERT INTO cart (user_id) VALUES (%s) RETURNING cart_id", (user_id,))
            cart_id = cursor.fetchone()["cart_id"]
        else:
            cart_id = cart["cart_id"]
        
        cursor.execute("SELECT cart_item_id, quantity FROM cart_item WHERE cart_id = %s AND variant_id = %s", (cart_id, item.variant_id))
        existing = cursor.fetchone()
        
        if existing:
            cursor.execute("UPDATE cart_item SET quantity = %s WHERE cart_item_id = %s", (existing["quantity"] + item.quantity, existing["cart_item_id"]))
        else:
            # Need to get product_id from variant_id
            cursor.execute("SELECT product_id FROM product_variant WHERE variant_id = %s", (item.variant_id,))
            res = cursor.fetchone()
            if not res:
                return standard_response(False, message="Product variant not found")
            product_id = res["product_id"]
            
            cursor.execute("INSERT INTO cart_item (quantity, cart_id, variant_id, product_id) VALUES (%s, %s, %s, %s)", 
                           (item.quantity, cart_id, item.variant_id, product_id))
        
        db.commit()
        return standard_response(True, message="Item added to cart")
    except Exception as err:
        db.rollback()
        return standard_response(False, message=f"Failed to add to cart: {str(err)}")
    finally:
        cursor.close()

@router.put("/item/{item_id}")
def update_cart_item(item_id: int, quantity: int, current_user: dict = Depends(get_current_user), db=Depends(get_db)):
    user_id = current_user["user_id"]
    cursor = db.cursor()
    try:
        # Verify ownership
        cursor.execute("SELECT cart_id FROM cart WHERE user_id = %s", (user_id,))
        cart = cursor.fetchone()
        if not cart:
            return standard_response(False, message="Cart not found")
            
        cursor.execute("UPDATE cart_item SET quantity = %s WHERE cart_item_id = %s AND cart_id = %s", (quantity, item_id, cart[0]))
        db.commit()
        return standard_response(True, message="Quantity updated")
    except Exception as e:
        db.rollback()
        return standard_response(False, message=str(e))
    finally:
        cursor.close()

@router.delete("/item/{item_id}")
def remove_from_cart(item_id: int, current_user: dict = Depends(get_current_user), db=Depends(get_db)):
    user_id = current_user["user_id"]
    cursor = db.cursor()
    try:
        # Verify ownership
        cursor.execute("SELECT cart_id FROM cart WHERE user_id = %s", (user_id,))
        cart = cursor.fetchone()
        if not cart:
            return standard_response(False, message="Cart not found")
            
        cursor.execute("DELETE FROM cart_item WHERE cart_item_id = %s AND cart_id = %s", (item_id, cart[0]))
        db.commit()
        return standard_response(True, message="Item removed from cart")
    except Exception as e:
        db.rollback()
        return standard_response(False, message=str(e))
    finally:
        cursor.close()
