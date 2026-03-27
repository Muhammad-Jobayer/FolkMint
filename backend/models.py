from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class UserSignup(BaseModel):
    firstName: str
    lastName: str
    email: str
    password: str
    address: str

class SellerSignup(BaseModel):
    firstName: str
    lastName: str
    email: str
    password: str
    address: str
    shopName: str
    bio: str
    category: str
    passkey: str

class UserLogin(BaseModel):
    email: str
    password: str

class AddressUpdate(BaseModel):
    address: str

class CategoryModel(BaseModel):
    category_id: int
    name: str
    parent_category: int = None

class ProductVariant(BaseModel):
    variant_id: int
    product_id: int
    size: str = None
    color: str = None
    stock_quantity: int
    price: float

class Product(BaseModel):
    product_id: int
    name: str
    description: str = None
    base_price: float
    category_id: int
    variants: List[ProductVariant] = []

class ProductCreate(BaseModel):
    name: str
    description: str
    base_price: float
    category_id: int
    # seller_id: int # Often derived from JWT, keep it if user uses it explicitly

class ProductUpdate(BaseModel):
    name: str = None
    description: str = None
    base_price: float = None
    category_id: int = None

class ReviewCreate(BaseModel):
    rating: int
    comment: str
    product_id: int

class CartItemAdd(BaseModel):
    variant_id: int
    quantity: int

class PaymentMethodCreate(BaseModel):
    card_last4: str
    type: str
    expiry_date: str # YYYY-MM-DD

class CheckoutRequest(BaseModel):
    items: List[Dict[str, Any]] # {variant_id, quantity, price}
    address_id: Optional[int] = None
    payment_method: Optional[PaymentMethodCreate] = None

class OrderStatusUpdate(BaseModel):
    status: str

class OrderItemStatusUpdate(BaseModel):
    status: str

class NewsletterSubscribe(BaseModel):
    email: str
