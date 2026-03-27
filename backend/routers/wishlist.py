from fastapi import APIRouter, Depends, HTTPException
from psycopg2.extras import RealDictCursor
from database import get_db, standard_response
from auth_utils import get_current_user
from pydantic import BaseModel

router = APIRouter(prefix="/api/wishlist", tags=["wishlist"])

class WishlistItemToggle(BaseModel):
    product_id: int

@router.get("/")
def get_wishlist(current_user: dict = Depends(get_current_user), db=Depends(get_db)):
    user_id = current_user["user_id"]
    cursor = db.cursor(cursor_factory=RealDictCursor)
    try:
        cursor.execute("""
            SELECT 
                p.product_id, 
                p.name, 
                p.base_price,
                c.name as category_name,
                COALESCE(
                    p.main_image,
                    (SELECT pi.image_url 
                     FROM product_image pi 
                     JOIN product_variant pv ON pi.variant_id = pv.variant_id 
                     WHERE pv.product_id = p.product_id 
                     ORDER BY pi.image_id ASC LIMIT 1)
                ) as main_image
            FROM wishlist w
            JOIN product p ON w.product_id = p.product_id
            LEFT JOIN category c ON p.category_id = c.category_id
            WHERE w.user_id = %s
            ORDER BY w.created_at DESC
        """, (user_id,))
        items = cursor.fetchall()
        for i in items:
            i["base_price"] = float(i["base_price"])
        return standard_response(True, data=items)
    except Exception as e:
        return standard_response(False, message=str(e))
    finally:
        cursor.close()

@router.post("/toggle")
def toggle_wishlist(data: WishlistItemToggle, current_user: dict = Depends(get_current_user), db=Depends(get_db)):
    user_id = current_user["user_id"]
    cursor = db.cursor()
    try:
        # Check if already in wishlist
        cursor.execute("SELECT wishlist_id FROM wishlist WHERE user_id = %s AND product_id = %s", (user_id, data.product_id))
        existing = cursor.fetchone()
        
        if existing:
            # Remove it
            cursor.execute("DELETE FROM wishlist WHERE user_id = %s AND product_id = %s", (user_id, data.product_id))
            db.commit()
            return standard_response(True, message="Removed from wishlist", data={"status": "removed"})
        else:
            # Add it
            cursor.execute("INSERT INTO wishlist (user_id, product_id) VALUES (%s, %s)", (user_id, data.product_id))
            db.commit()
            return standard_response(True, message="Added to wishlist", data={"status": "added"})
    except Exception as e:
        db.rollback()
        return standard_response(False, message=str(e))
    finally:
        cursor.close()
