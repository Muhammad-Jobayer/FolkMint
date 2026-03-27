from fastapi import APIRouter, Depends
from psycopg2.extras import RealDictCursor
from database import get_db, standard_response
from auth_utils import get_current_user, role_required

router = APIRouter(prefix="/api/analytics", tags=["analytics"])

@router.get("/overview", dependencies=[Depends(role_required(["admin"]))])
def get_analytics_overview(db=Depends(get_db)):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    try:
        # Total Sales
        cursor.execute("SELECT SUM(total_amount) as total_revenue, COUNT(order_id) as total_orders FROM orders WHERE status = 'delivered'")
        overview = cursor.fetchone()
        
        # Total Users
        cursor.execute("SELECT COUNT(user_id) as total_users FROM users WHERE role = 'customer'")
        users = cursor.fetchone()
        
        # Total Products
        cursor.execute("SELECT COUNT(product_id) as total_products FROM product")
        products = cursor.fetchone()
        
        return standard_response(True, data={
            "revenue": float(overview["total_revenue"] or 0),
            "orders": overview["total_orders"],
            "users": users["total_users"],
            "products": products["total_products"]
        })
    finally:
        cursor.close()

@router.get("/revenue", dependencies=[Depends(role_required(["admin"]))])
def get_revenue_timeline(db=Depends(get_db)):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    try:
        cursor.execute("SELECT * FROM get_monthly_revenue()")
        data = cursor.fetchall()
        for d in data:
            d["revenue"] = float(d["revenue"] or 0)
        return standard_response(True, data=data)
    finally:
        cursor.close()

@router.get("/top-products", dependencies=[Depends(role_required(["admin"]))])
def get_top_products(limit: int = 5, db=Depends(get_db)):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    try:
        cursor.execute("SELECT * FROM get_top_selling_products(%s)", (limit,))
        data = cursor.fetchall()
        return standard_response(True, data=data)
    finally:
        cursor.close()

@router.get("/best-artisans", dependencies=[Depends(role_required(["admin"]))])
def get_best_artisans_list(limit: int = 5, db=Depends(get_db)):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    try:
        cursor.execute("SELECT * FROM get_best_artisans(%s)", (limit,))
        data = cursor.fetchall()
        for d in data:
            d["total_sales"] = float(d["total_sales"] or 0)
        return standard_response(True, data=data)
    finally:
        cursor.close()
