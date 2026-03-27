from fastapi import APIRouter, Depends
from psycopg2.extras import RealDictCursor
from database import get_db, standard_response
from models import ReviewCreate
from auth_utils import get_current_user

router = APIRouter(prefix="/api", tags=["products"])

@router.get("/categories")
def get_categories(db=Depends(get_db)):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    try:
        cursor.execute("SELECT category_id, name, parent_category FROM category")
        categories = cursor.fetchall()
        return standard_response(True, data=categories)
    except Exception as e:
        return standard_response(False, message=str(e))
    finally:
        cursor.close()

@router.get("/products")
def get_products(category_id: int = None, product_id: int = None, db=Depends(get_db)):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    try:
        query = "SELECT product_id, name, description, base_price, category_id, seller_id FROM product"
        params = []
        
        if product_id:
            query += " WHERE product_id = %s"
            params.append(product_id)
        elif category_id:
            query += " WHERE category_id = %s"
            params.append(category_id)
        
        cursor.execute(query, tuple(params))
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

            # fetch rating
            cursor.execute("SELECT AVG(rating) as avg, COUNT(review_id) as count FROM review WHERE product_id = %s", (p["product_id"],))
            rev_data = cursor.fetchone()
            p["average_rating"] = round(float(rev_data["avg"] or 0), 1)
            p["total_reviews"] = rev_data["count"]
        return standard_response(True, data=products)
    except Exception as e:
        return standard_response(False, message=str(e))
    finally:
        cursor.close()

@router.get("/products/search")
def search_products(q: str = "", db=Depends(get_db)):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    try:
        cursor.execute(
            "SELECT product_id, name, description, base_price, category_id, seller_id FROM product WHERE name ILIKE %s OR description ILIKE %s",
            (f"%{q}%", f"%{q}%")
        )
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

            # fetch rating
            cursor.execute("SELECT AVG(rating) as avg, COUNT(review_id) as count FROM review WHERE product_id = %s", (p["product_id"],))
            rev_data = cursor.fetchone()
            p["average_rating"] = round(float(rev_data["avg"] or 0), 1)
            p["total_reviews"] = rev_data["count"]
        return standard_response(True, data=products)
    except Exception as e:
        return standard_response(False, message=str(e))
    finally:
        cursor.close()

@router.get("/products/recommendations")
def get_recommendations(limit: int = 4, current_user: dict = Depends(get_current_user), db=Depends(get_db)):
    user_id = current_user["user_id"]
    cursor = db.cursor(cursor_factory=RealDictCursor)
    try:
        # 1. Find categories the user has bought OR rated highly
        cursor.execute("""
            SELECT DISTINCT p.category_id 
            FROM product p
            LEFT JOIN review r ON p.product_id = r.product_id AND r.user_id = %s
            LEFT JOIN order_item oi ON p.product_id = oi.product_id
            LEFT JOIN orders o ON oi.order_id = o.order_id AND o.user_id = %s AND o.status = 'delivered'
            WHERE r.rating >= 4 OR oi.order_item_id IS NOT NULL
        """, (user_id, user_id))
        cats = cursor.fetchall()
        
        if not cats:
            return standard_response(True, data=[])
            
        cat_ids = tuple(c["category_id"] for c in cats)
        
        # 2. Find highly rated or relative products from those categories (Allowing items they already bought to show up for demo)
        query_recs = """
            SELECT 
                p.product_id, 
                p.name, 
                p.base_price,
                COALESCE(AVG(r.rating), 0) AS average_rating,
                COUNT(r.review_id) AS total_reviews
            FROM 
                product p
            LEFT JOIN review r ON p.product_id = r.product_id
            WHERE p.category_id IN %s 
            GROUP BY p.product_id
            ORDER BY average_rating DESC, RANDOM()
            LIMIT %s
        """
        cursor.execute(query_recs, (cat_ids, limit))
        products = cursor.fetchall()
        
        # Hydrate images for the frontend card Component
        for p in products:
            p["base_price"] = float(p["base_price"])
            p["average_rating"] = round(float(p["average_rating"]), 1)
            cursor.execute("""
                SELECT pi.image_url 
                FROM product_image pi 
                JOIN product_variant pv ON pi.variant_id = pv.variant_id 
                WHERE pv.product_id = %s 
                LIMIT 1
            """, (p["product_id"],))
            img = cursor.fetchone()
            p["main_image"] = img["image_url"] if img else None
            
        return standard_response(True, data=products)
    except Exception as e:
        return standard_response(False, message=str(e))
    finally:
        cursor.close()

@router.get("/products/top-rated")
def get_top_rated_products(limit: int = 10, min_reviews: int = 5, db=Depends(get_db)):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    try:
        query = """
            SELECT 
                p.product_id, 
                p.name, 
                p.base_price as price,
                p.category_id as category,
                COALESCE(AVG(r.rating), 0) AS "averageRating",
                COUNT(DISTINCT r.review_id) AS "totalReviews",
                COALESCE(SUM(oi.quantity), 0) AS "totalSales"
            FROM 
                product p
            LEFT JOIN 
                review r ON p.product_id = r.product_id
            LEFT JOIN
                product_variant pv ON p.product_id = pv.product_id
            LEFT JOIN
                order_item oi ON pv.variant_id = oi.variant_id
            GROUP BY 
                p.product_id
            HAVING 
                COALESCE(AVG(r.rating), 0) >= 0
            ORDER BY 
                "averageRating" DESC, 
                "totalSales" DESC,
                "totalReviews" DESC
            LIMIT %s
        """
        cursor.execute(query, (limit,))
        products = cursor.fetchall()
        
        for p in products:
            p["price"] = float(p["price"])
            p["averageRating"] = round(float(p["averageRating"]), 1)
            # fetch all images linked to this product (via its variants)
            cursor.execute("""
                SELECT DISTINCT pi.image_url 
                FROM product_image pi 
                JOIN product_variant pv ON pi.variant_id = pv.variant_id 
                WHERE pv.product_id = %s
            """, (p["product_id"],))
            imgs = cursor.fetchall()
            p["images"] = [img["image_url"] for img in imgs]
            p["main_image"] = p["images"][0] if p["images"] else None
            
        return standard_response(True, data=products)
    except Exception as e:
        return standard_response(False, message=str(e))
    finally:
        cursor.close()

@router.get("/products/{product_id}/reviews")
def get_reviews(product_id: int, db=Depends(get_db)):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    try:
        cursor.execute(
            "SELECT r.review_id, r.rating, r.comment, r.created_at, u.username, u.first_name FROM review r JOIN users u ON r.user_id = u.user_id WHERE r.product_id = %s",
            (product_id,)
        )
        reviews = cursor.fetchall()
        for r in reviews:
            r["created_at"] = r["created_at"].isoformat() if r["created_at"] else None
        return standard_response(True, data=reviews)
    except Exception as e:
        return standard_response(False, message=str(e))
    finally:
        cursor.close()

@router.post("/reviews")
def create_review(review: ReviewCreate, current_user: dict = Depends(get_current_user), db=Depends(get_db)):
    user_id = current_user["user_id"]
    cursor = db.cursor(cursor_factory=RealDictCursor)
    try:
        # Check if they already reviewed this product
        cursor.execute("SELECT review_id FROM review WHERE user_id = %s AND product_id = %s", (user_id, review.product_id))
        if cursor.fetchone():
            return standard_response(False, message="You have already reviewed this product")

        # Check if they actually bought it (Verified Purchase check)
        cursor.execute("""
            SELECT oi.order_item_id 
            FROM order_item oi 
            JOIN orders o ON oi.order_id = o.order_id 
            JOIN product_variant pv ON oi.variant_id = pv.variant_id 
            WHERE o.user_id = %s AND pv.product_id = %s AND o.status = 'delivered'
        """, (user_id, review.product_id))
        if not cursor.fetchone():
             return standard_response(False, message="You can only review products you have purchased and received")

        cursor.execute(
            "INSERT INTO review (rating, comment, user_id, product_id) VALUES (%s, %s, %s, %s) RETURNING review_id",
            (review.rating, review.comment, user_id, review.product_id)
        )
        review_id = cursor.fetchone()["review_id"]
        db.commit()
        return standard_response(True, data={"review_id": review_id}, message="Review submitted successfully")
    except Exception as err:
        db.rollback()
        return standard_response(False, message=f"Failed to submit review: {str(err)}")
    finally:
        cursor.close()
