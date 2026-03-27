-- FolkMint Database Schema for PostgreSQL
-- Run this to initialize your local PostgreSQL database

-- Enum for User roles
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('customer', 'seller', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role user_role DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_user_email ON users(email);

-- Address Table
CREATE TABLE IF NOT EXISTS address (
    address_id SERIAL PRIMARY KEY,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payment Method Table
CREATE TABLE IF NOT EXISTS payment_method (
    method_id SERIAL PRIMARY KEY,
    card_last4 VARCHAR(4) NOT NULL,
    type VARCHAR(20) NOT NULL,
    expiry_date VARCHAR(10) NOT NULL,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payment Table
CREATE TABLE IF NOT EXISTS payment (
    payment_id SERIAL PRIMARY KEY,
    amount DECIMAL(10,2) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    method_id INT REFERENCES payment_method(method_id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Category Table
CREATE TABLE IF NOT EXISTS category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    parent_category INT REFERENCES category(category_id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product Table
CREATE TABLE IF NOT EXISTS product (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    base_price DECIMAL(10,2) NOT NULL,
    category_id INT NOT NULL REFERENCES category(category_id) ON DELETE CASCADE,
    seller_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_product_name ON product(name);
CREATE INDEX IF NOT EXISTS idx_product_category ON product(category_id);

-- Product Variant
CREATE TABLE IF NOT EXISTS product_variant (
    variant_id SERIAL PRIMARY KEY,
    product_id INT NOT NULL REFERENCES product(product_id) ON DELETE CASCADE,
    size VARCHAR(50),
    color VARCHAR(50),
    stock_quantity INT NOT NULL DEFAULT 0,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product Image
CREATE TABLE IF NOT EXISTS product_image (
    image_id SERIAL PRIMARY KEY,
    image_url VARCHAR(255) NOT NULL,
    variant_id INT NOT NULL REFERENCES product_variant(variant_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews
CREATE TABLE IF NOT EXISTS review (
    review_id SERIAL PRIMARY KEY,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES product(product_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cart
CREATE TABLE IF NOT EXISTS cart (
    cart_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL UNIQUE REFERENCES users(user_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cart Items
CREATE TABLE IF NOT EXISTS cart_item (
    cart_item_id SERIAL PRIMARY KEY,
    quantity INT NOT NULL DEFAULT 1,
    cart_id INT NOT NULL REFERENCES cart(cart_id) ON DELETE CASCADE,
    variant_id INT NOT NULL REFERENCES product_variant(variant_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (cart_id, variant_id)
);

-- Orders
CREATE TABLE IF NOT EXISTS orders (
    order_id SERIAL PRIMARY KEY,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Processing',
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    address_id INT REFERENCES address(address_id) ON DELETE SET NULL,
    payment_id INT REFERENCES payment(payment_id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order Items
CREATE TABLE IF NOT EXISTS order_item (
    order_item_id SERIAL PRIMARY KEY,
    quantity INT NOT NULL,
    price_at_purchase DECIMAL(10,2) NOT NULL,
    order_id INT NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
    variant_id INT NOT NULL REFERENCES product_variant(variant_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Function and Trigger to automatically update 'updated_at' columns on all tables
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers conditionally (this ignores errors if they already exist, though not strictly required)
DO $$
DECLARE
    t text;
BEGIN
    FOR t IN 
        SELECT table_name FROM information_schema.columns WHERE column_name = 'updated_at' AND table_schema = 'public'
    LOOP
        EXECUTE format('DROP TRIGGER IF EXISTS set_timestamp ON %I', t);
        EXECUTE format('CREATE TRIGGER set_timestamp BEFORE UPDATE ON %I FOR EACH ROW EXECUTE PROCEDURE update_timestamp()', t);
    END LOOP;
END;
$$;


-- Seed Initial Categories
INSERT INTO category (name) VALUES 
('Textiles & Fabrics'), 
('Bamboo Craft'), 
('Pottery'), 
('Home Decor'), 
('Folk Jewelry'), 
('Wooden Craft'), 
('Stone Craft')
ON CONFLICT (name) DO NOTHING;

-- Seed Default Admin
-- Password is 'admin123' hashed with bcrypt
INSERT INTO users (username, email, password_hash, first_name, last_name, role) 
VALUES ('admin', 'admin@folkmint.com', '$2b$12$N9tP0/xWJzD6H5Ld4k3g9.2r/kNxN2Fm5M5T0zXYh8gW3d5H/B8m6', 'Admin', 'FolkMint', 'admin')
ON CONFLICT (username) DO UPDATE SET role = 'admin', email = EXCLUDED.email;
