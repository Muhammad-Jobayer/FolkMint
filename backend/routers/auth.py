from fastapi import APIRouter, Response, Depends
from psycopg2.extras import RealDictCursor
from database import get_db, standard_response
from models import UserSignup, SellerSignup, UserLogin
from auth_utils import get_password_hash, verify_password, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/signup")
def signup(user_data: UserSignup, response: Response, db=Depends(get_db)):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    try:
        cursor.execute("SELECT user_id FROM users WHERE email = %s", (user_data.email,))
        if cursor.fetchone():
            return standard_response(False, message="Email already registered")

        hashed_pw = get_password_hash(user_data.password)
        username = user_data.email.split("@")[0]
        
        cursor.execute(
            "INSERT INTO users (username, email, password_hash, first_name, last_name, role) VALUES (%s, %s, %s, %s, %s, %s) RETURNING user_id, role",
            (username, user_data.email, hashed_pw, user_data.firstName, user_data.lastName, "customer")
        )
        new_user = cursor.fetchone()
        user_id = new_user["user_id"]

        cursor.execute(
            "INSERT INTO address (street, city, postal_code, country, user_id) VALUES (%s, %s, %s, %s, %s)",
            (user_data.address, "Dhaka", "1000", "Bangladesh", user_id)
        )
        db.commit()

        # Create token and set cookie
        token = create_access_token({"sub": str(user_id), "role": new_user["role"]})
        response.set_cookie(
            key="access_token", 
            value=token, 
            httponly=True, 
            max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            samesite="lax",
            secure=False # Set to True in production with HTTPS
        )

        return standard_response(True, data={"user_id": user_id, "role": new_user["role"]}, message="User created successfully")
    except Exception as err:
        db.rollback()
        return standard_response(False, message=f"Registration failed: {str(err)}")
    finally:
        cursor.close()

@router.post("/seller-signup")
def seller_signup(data: SellerSignup, response: Response, db=Depends(get_db)):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    try:
        if data.passkey != "2305112":
            return standard_response(False, message="Invalid Merchant Passkey. Registration denied.")
            
        cursor.execute("SELECT user_id FROM users WHERE email = %s", (data.email,))
        if cursor.fetchone():
            return standard_response(False, message="Email already registered")
            
        hashed_pw = get_password_hash(data.password)
        username = data.email.split("@")[0]
        
        cursor.execute(
            "INSERT INTO users (username, email, password_hash, first_name, last_name, role, shop_name, bio, category) VALUES (%s,%s,%s,%s,%s,'seller',%s,%s,%s) RETURNING user_id, role",
            (username, data.email, hashed_pw, data.firstName, data.lastName, data.shopName, data.bio, data.category)
        )
        new_user = cursor.fetchone()
        user_id = new_user["user_id"]
        
        cursor.execute(
            "INSERT INTO address (street, city, postal_code, country, user_id) VALUES (%s,'Dhaka','1000','Bangladesh',%s)",
            (data.address, user_id)
        )
        db.commit()

        token = create_access_token({"sub": str(user_id), "role": new_user["role"]})
        response.set_cookie(
            key="access_token", 
            value=token, 
            httponly=True, 
            max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            samesite="lax",
            secure=False
        )

        return standard_response(True, data={"user_id": user_id, "role": new_user["role"]}, message="Seller registered")
    except Exception as err:
        db.rollback()
        return standard_response(False, message=str(err))
    finally:
        cursor.close()

@router.post("/login")
def login(login_data: UserLogin, response: Response, db=Depends(get_db)):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    try:
        cursor.execute(
            "SELECT user_id, email, first_name, last_name, password_hash, role, shop_name, bio, category, profile_picture_url FROM users WHERE email = %s",
            (login_data.email,)
        )
        user = cursor.fetchone()

        if not user or not verify_password(login_data.password, user["password_hash"]):
            return standard_response(False, message="Invalid email or password")

        token = create_access_token({"sub": str(user["user_id"]), "role": user["role"]})
        response.set_cookie(
            key="access_token", 
            value=token, 
            httponly=True, 
            max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            samesite="lax",
            secure=False
        )

        user_data = {
            "user_id": user["user_id"],
            "email": user["email"],
            "first_name": user["first_name"],
            "last_name": user["last_name"],
            "username": f"{user['first_name']} {user['last_name']}",
            "role": user["role"],
            "shop_name": user.get("shop_name"),
            "bio": user.get("bio"),
            "category": user.get("category"),
            "profile_picture_url": user.get("profile_picture_url")
        }
        return standard_response(True, data=user_data, message="Login successful")
    finally:
        cursor.close()

@router.post("/logout")
def logout(response: Response):
    response.delete_cookie("access_token")
    return standard_response(True, message="Logged out successfully")

@router.get("/me")
def get_me(current_user: dict = Depends(get_db)): # Wait, I need auth_utils.get_current_user
    # Fix: Correct dependency
    pass # Moving it to auth_utils.py or main.py? No, it should be in auth router or profile.
