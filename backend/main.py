import os
import psycopg2
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from database import connection_pool, get_db, standard_response
from auth_utils import get_current_user

# Import Routers
from routers import auth, products, orders, cart, seller, admin, newsletter, upload, wishlist, analytics

app = FastAPI(title="FolkMint API")

# Enable CORS
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:5174,http://127.0.0.1:5173,http://127.0.0.1:5174").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directories
PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
UPLOADS_DIR = os.path.join(PROJECT_ROOT, "uploads")
IMAGES_DIR = os.path.join(os.path.dirname(PROJECT_ROOT), "gemini_img")

os.makedirs(UPLOADS_DIR, exist_ok=True)
os.makedirs(IMAGES_DIR, exist_ok=True)

# Mount Static Files
app.mount("/uploads", StaticFiles(directory=UPLOADS_DIR), name="uploads")
app.mount("/images", StaticFiles(directory=IMAGES_DIR), name="images")

# Startup Logic
@app.on_event("startup")
def startup_db_init():
    if connection_pool:
        try:
            with connection_pool.getconn() as conn:
                with conn.cursor() as cur:
                    cur.execute("""
                        CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
                            id SERIAL PRIMARY KEY,
                            email VARCHAR(255) UNIQUE NOT NULL,
                            subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                        )
                    """)
                    conn.commit()
                connection_pool.putconn(conn)
            print("Database initialized successfully")
        except Exception as e:
            print(f"Error initializing database: {e}")

# Include Routers
app.include_router(auth.router)
app.include_router(products.router)
app.include_router(orders.router)
app.include_router(cart.router)
app.include_router(seller.router)
app.include_router(admin.router)
app.include_router(newsletter.router)
app.include_router(upload.router)
app.include_router(wishlist.router)
app.include_router(analytics.router)

# Utility Routes
@app.get("/api/auth/me")
def get_me(current_user: dict = Depends(get_current_user)):
    return standard_response(True, data=current_user)

@app.get("/api/health")
def health_check():
    return standard_response(True, message="Service is healthy")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
