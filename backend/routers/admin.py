from fastapi import APIRouter, Depends
from psycopg2.extras import RealDictCursor
from database import get_db, standard_response
from models import OrderStatusUpdate
from auth_utils import role_required

router = APIRouter(prefix="/api/admin", tags=["admin"])

@router.get("/stats")
def get_admin_stats(current_user: dict = Depends(role_required(["admin"])), db=Depends(get_db)):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    try:
        cursor.execute("SELECT COUNT(*) as total_users FROM users")
        users = cursor.fetchone()["total_users"]
        cursor.execute("SELECT COUNT(*) as total_products FROM product")
        products = cursor.fetchone()["total_products"]
        cursor.execute("SELECT COUNT(*) as total_orders FROM orders")
        orders = cursor.fetchone()["total_orders"]
        cursor.execute("SELECT COALESCE(SUM(total_amount),0) as total_revenue FROM orders")
        revenue = cursor.fetchone()["total_revenue"]
        return standard_response(True, data={"total_users": users, "total_products": products, "total_orders": orders, "total_revenue": float(revenue)})
    except Exception as e:
        return standard_response(False, message=str(e))
    finally:
        cursor.close()

@router.get("/users")
def get_all_users(current_user: dict = Depends(role_required(["admin"])), db=Depends(get_db)):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    try:
        cursor.execute("SELECT user_id, first_name, last_name, email, role, profile_picture_url, created_at FROM users ORDER BY user_id DESC")
        users = cursor.fetchall()
        for u in users:
            u["created_at"] = u["created_at"].isoformat() if u.get("created_at") else None
        return standard_response(True, data=users)
    except Exception as e:
        return standard_response(False, message=str(e))
    finally:
        cursor.close()

@router.get("/orders")
def get_all_orders(current_user: dict = Depends(role_required(["admin"])), db=Depends(get_db)):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    try:
        cursor.execute("SELECT o.*, u.first_name, u.last_name, u.email FROM orders o JOIN users u ON o.user_id = u.user_id ORDER BY o.order_date DESC")
        orders = cursor.fetchall()
        for o in orders:
            o["order_date"] = o["order_date"].isoformat() if o.get("order_date") else None
            o["created_at"] = o["created_at"].isoformat() if o.get("created_at") else None
            o["updated_at"] = o["updated_at"].isoformat() if o.get("updated_at") else None
            o["total_amount"] = float(o["total_amount"]) if o.get("total_amount") else None
        return standard_response(True, data=orders)
    except Exception as e:
        return standard_response(False, message=str(e))
    finally:
        cursor.close()

@router.put("/orders/{order_id}/status")
def update_order_status(order_id: int, update: OrderStatusUpdate, current_user: dict = Depends(role_required(["admin"])), db=Depends(get_db)):
    cursor = db.cursor()
    try:
        cursor.execute("UPDATE orders SET status = %s WHERE order_id = %s", (update.status, order_id))
        db.commit()
        return standard_response(True, message="Order status updated")
    except Exception as e:
        db.rollback()
        return standard_response(False, message=str(e))
    finally:
        cursor.close()

@router.delete("/products/{product_id}")
def admin_delete_product(product_id: int, current_user: dict = Depends(role_required(["admin"])), db=Depends(get_db)):
    cursor = db.cursor()
    try:
        cursor.execute("DELETE FROM product WHERE product_id=%s", (product_id,))
        db.commit()
        return standard_response(True, message="Product deleted successfully")
    except Exception as e:
        db.rollback()
        return standard_response(False, message=str(e))
    finally:
        cursor.close()
