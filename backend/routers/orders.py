from fastapi import APIRouter, Depends
from psycopg2.extras import RealDictCursor
from database import get_db, standard_response
from models import AddressUpdate, CheckoutRequest
from pydantic import BaseModel
from auth_utils import get_current_user

router = APIRouter(prefix="/api", tags=["orders"])

@router.get("/user/profile")
def get_user_profile(current_user: dict = Depends(get_current_user), db=Depends(get_db)):
    user_id = current_user["user_id"]
    cursor = db.cursor(cursor_factory=RealDictCursor)
    try:
        # Fetch profile
        cursor.execute(
            "SELECT u.first_name, u.last_name, u.email, u.profile_picture_url, a.street as address FROM users u LEFT JOIN address a ON u.user_id = a.user_id WHERE u.user_id = %s",
            (user_id,)
        )
        user = cursor.fetchone()
        if not user:
            return standard_response(False, message="User profile not found")

        # Fetch order history
        cursor.execute(
            "SELECT order_id, created_at as order_date, total_amount, status FROM orders WHERE user_id = %s ORDER BY created_at DESC",
            (user_id,)
        )
        orders = cursor.fetchall()

        for order in orders:
            order["order_date"] = order["order_date"].isoformat() if order["order_date"] else None
            cursor.execute(
                "SELECT oi.quantity, oi.price_at_purchase, pv.size, pv.color, p.name, p.product_id FROM order_item oi JOIN product_variant pv ON oi.variant_id = pv.variant_id JOIN product p ON pv.product_id = p.product_id WHERE oi.order_id = %s",
                (order["order_id"],)
            )
            items = cursor.fetchall()
            for i in items:
                i["price_at_purchase"] = float(i["price_at_purchase"])
            order["items"] = items

        return standard_response(True, data={"profile": user, "orders": orders})
    except Exception as e:
        return standard_response(False, message=str(e))
    finally:
        cursor.close()

@router.get("/user/p/{user_id}")
def get_public_profile(user_id: int, db=Depends(get_db)):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    try:
        cursor.execute(
            "SELECT first_name, last_name, email, role, profile_picture_url FROM users WHERE user_id = %s",
            (user_id,)
        )
        user = cursor.fetchone()
        if not user:
             return standard_response(False, message="User not found")
        return standard_response(True, data=user)
    except Exception as e:
        return standard_response(False, message=str(e))
    finally:
        cursor.close()

@router.put("/user/profile/address")
def update_address(address_data: AddressUpdate, current_user: dict = Depends(get_current_user), db=Depends(get_db)):
    user_id = current_user["user_id"]
    cursor = db.cursor(cursor_factory=RealDictCursor)
    try:
        cursor.execute("SELECT address_id FROM address WHERE user_id = %s", (user_id,))
        address = cursor.fetchone()
        
        if address:
            cursor.execute("UPDATE address SET street = %s WHERE user_id = %s", (address_data.address, user_id))
        else:
            cursor.execute(
                "INSERT INTO address (street, city, postal_code, country, user_id) VALUES (%s, %s, %s, %s, %s)",
                (address_data.address, "Dhaka", "1000", "Bangladesh", user_id)
            )
        db.commit()
        return standard_response(True, message="Address updated successfully")
    except Exception as e:
        db.rollback()
        return standard_response(False, message=f"Failed to update address: {str(e)}")
    finally:
        cursor.close()

class ProfilePictureUpdate(BaseModel):
    profile_picture_url: str

@router.put("/user/profile/picture")
def update_profile_picture(data: ProfilePictureUpdate, current_user: dict = Depends(get_current_user), db=Depends(get_db)):
    user_id = current_user["user_id"]
    cursor = db.cursor(cursor_factory=RealDictCursor)
    try:
        cursor.execute(
            "UPDATE users SET profile_picture_url = %s WHERE user_id = %s",
            (data.profile_picture_url, user_id)
        )
        db.commit()
        return standard_response(True, data={"profile_picture_url": data.profile_picture_url}, message="Profile picture updated")
    except Exception as e:
        db.rollback()
        return standard_response(False, message=f"Failed to update profile picture: {str(e)}")
    finally:
        cursor.close()

@router.post("/checkout")
def checkout(request: CheckoutRequest, current_user: dict = Depends(get_current_user), db=Depends(get_db)):
    user_id = current_user["user_id"]
    cursor = db.cursor(cursor_factory=RealDictCursor)
    try:
        # Handling address (if missing, grab their default address)
        address_id = request.address_id
        if not address_id:
            cursor.execute("SELECT address_id FROM address WHERE user_id = %s LIMIT 1", (user_id,))
            addr = cursor.fetchone()
            if addr: address_id = addr["address_id"]

        if not address_id:
            # Create a default dummy address if none exists
            cursor.execute(
                "INSERT INTO address (street, city, postal_code, country, user_id) VALUES (%s, %s, %s, %s, %s) RETURNING address_id",
                ("123 Main St", "Dhaka", "1000", "Bangladesh", user_id)
            )
            address_id = cursor.fetchone()["address_id"]

        # Call the Stored Procedure for the multi-step checkout workflow
        # Requirement #6 Fulfillment: Stored Procedure handles order + stock + cart
        import json
        items_json = json.dumps(request.items)
        
        # We call the procedure. It manages the transaction internally if we want, 
        # but psql/psycopg2 manages the outer transaction block.
        cursor.execute("CALL place_complete_order(%s, %s, %s::jsonb)", (user_id, address_id, items_json))
        
        # Get the order_id from the latest order created by this user
        cursor.execute("SELECT order_id FROM orders WHERE user_id = %s ORDER BY created_at DESC LIMIT 1", (user_id,))
        order_id = cursor.fetchone()["order_id"]

        db.commit()
        return standard_response(True, data={"order_id": order_id}, message="Order placed successfully via Stored Procedure")
    except Exception as err:
        db.rollback()
        return standard_response(False, message=f"Checkout failed: {str(err)}")
    finally:
        cursor.close()
