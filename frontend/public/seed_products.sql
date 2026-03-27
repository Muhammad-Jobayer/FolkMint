-- FolkMint Product Seed Script
-- AUTO-GENERATED

DELETE FROM cart_item; DELETE FROM product_variant; DELETE FROM product; -- Optional: Clear existing for fresh seed

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Art Piece 1', 'Handcrafted art item from local artisans.', 763, 5, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 763 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/art/art_1.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Art Piece 2', 'Handcrafted art item from local artisans.', 2978, 5, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 2978 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/art/art_2.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Art Piece 3', 'Handcrafted art item from local artisans.', 3054, 5, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 3054 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/art/art_3.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Art Piece 4', 'Handcrafted art item from local artisans.', 2062, 5, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 2062 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/art/art_4.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Art Piece 5', 'Handcrafted art item from local artisans.', 1380, 5, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1380 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/art/art_5.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Art Piece 6', 'Handcrafted art item from local artisans.', 4026, 5, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 4026 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/art/art_6.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Art Piece 7', 'Handcrafted art item from local artisans.', 4070, 5, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 4070 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/art/art_7.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Art Piece 8', 'Handcrafted art item from local artisans.', 2065, 5, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 2065 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/art/art_8.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Art Piece 9', 'Handcrafted art item from local artisans.', 1622, 5, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1622 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/art/art_9.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Art Piece 10', 'Handcrafted art item from local artisans.', 1841, 5, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1841 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/art/art_10.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Art Piece 11', 'Handcrafted art item from local artisans.', 1102, 5, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1102 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/art/art_11.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Art Piece 12', 'Handcrafted art item from local artisans.', 1179, 5, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1179 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/art/art_12.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Art Piece 13', 'Handcrafted art item from local artisans.', 3816, 5, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 3816 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/art/art_13.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Art Piece 14', 'Handcrafted art item from local artisans.', 4704, 5, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 4704 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/art/art_14.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Art Piece 15', 'Handcrafted art item from local artisans.', 3083, 5, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 3083 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/art/art_15.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Bamboo Craft Piece 1', 'Handcrafted bamboo craft item from local artisans.', 1286, 6, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1286 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/bamboo_craft/bamboo_craft_1.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Bamboo Craft Piece 2', 'Handcrafted bamboo craft item from local artisans.', 1293, 6, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1293 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/bamboo_craft/bamboo_craft_2.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Bamboo Craft Piece 3', 'Handcrafted bamboo craft item from local artisans.', 505, 6, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 505 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/bamboo_craft/bamboo_craft_3.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Bamboo Craft Piece 4', 'Handcrafted bamboo craft item from local artisans.', 215, 6, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 215 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/bamboo_craft/bamboo_craft_4.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Bamboo Craft Piece 5', 'Handcrafted bamboo craft item from local artisans.', 1669, 6, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1669 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/bamboo_craft/bamboo_craft_5.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Bamboo Craft Piece 6', 'Handcrafted bamboo craft item from local artisans.', 1949, 6, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1949 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/bamboo_craft/bamboo_craft_6.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Bamboo Craft Piece 7', 'Handcrafted bamboo craft item from local artisans.', 242, 6, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 242 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/bamboo_craft/bamboo_craft_7.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Bamboo Craft Piece 8', 'Handcrafted bamboo craft item from local artisans.', 1524, 6, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1524 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/bamboo_craft/bamboo_craft_8.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Bamboo Craft Piece 9', 'Handcrafted bamboo craft item from local artisans.', 1991, 6, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1991 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/bamboo_craft/bamboo_craft_9.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Bamboo Craft Piece 10', 'Handcrafted bamboo craft item from local artisans.', 504, 6, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 504 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/bamboo_craft/bamboo_craft_10.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Bamboo Craft Piece 11', 'Handcrafted bamboo craft item from local artisans.', 1837, 6, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1837 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/bamboo_craft/bamboo_craft_11.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Bamboo Craft Piece 12', 'Handcrafted bamboo craft item from local artisans.', 1263, 6, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1263 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/bamboo_craft/bamboo_craft_12.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Bamboo Craft Piece 13', 'Handcrafted bamboo craft item from local artisans.', 1898, 6, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1898 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/bamboo_craft/bamboo_craft_13.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Bamboo Craft Piece 14', 'Handcrafted bamboo craft item from local artisans.', 1951, 6, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1951 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/bamboo_craft/bamboo_craft_14.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Bamboo Craft Piece 15', 'Handcrafted bamboo craft item from local artisans.', 556, 6, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 556 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/bamboo_craft/bamboo_craft_15.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Bamboo Craft Piece 16', 'Handcrafted bamboo craft item from local artisans.', 839, 6, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 839 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/bamboo_craft/bamboo_craft_16.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Bamboo Craft Piece 17', 'Handcrafted bamboo craft item from local artisans.', 1256, 6, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1256 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/bamboo_craft/bamboo_craft_17.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Bamboo Craft Piece 18', 'Handcrafted bamboo craft item from local artisans.', 754, 6, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 754 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/bamboo_craft/bamboo_craft_18.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Bamboo Craft Piece 19', 'Handcrafted bamboo craft item from local artisans.', 1408, 6, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1408 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/bamboo_craft/bamboo_craft_19.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Bamboo Craft Piece 20', 'Handcrafted bamboo craft item from local artisans.', 1914, 6, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1914 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/bamboo_craft/bamboo_craft_20.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Bamboo Craft Piece 21', 'Handcrafted bamboo craft item from local artisans.', 692, 6, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 692 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/bamboo_craft/bamboo_craft_21.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Bamboo Craft Piece 22', 'Handcrafted bamboo craft item from local artisans.', 1938, 6, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1938 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/bamboo_craft/bamboo_craft_22.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Bamboo Craft Piece 23', 'Handcrafted bamboo craft item from local artisans.', 1142, 6, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1142 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/bamboo_craft/bamboo_craft_23.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Bamboo Craft Piece 24', 'Handcrafted bamboo craft item from local artisans.', 1353, 6, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1353 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/bamboo_craft/bamboo_craft_24.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Bamboo Craft Piece 25', 'Handcrafted bamboo craft item from local artisans.', 451, 6, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 451 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/bamboo_craft/bamboo_craft_25.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Bamboo Craft Piece 26', 'Handcrafted bamboo craft item from local artisans.', 966, 6, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 966 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/bamboo_craft/bamboo_craft_26.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Bamboo Craft Piece 27', 'Handcrafted bamboo craft item from local artisans.', 1266, 6, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1266 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/bamboo_craft/bamboo_craft_27.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Bamboo Craft Piece 28', 'Handcrafted bamboo craft item from local artisans.', 338, 6, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 338 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/bamboo_craft/bamboo_craft_28.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Bamboo Craft Piece 29', 'Handcrafted bamboo craft item from local artisans.', 460, 6, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 460 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/bamboo_craft/bamboo_craft_29.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Bamboo Craft Piece 30', 'Handcrafted bamboo craft item from local artisans.', 482, 6, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 482 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/bamboo_craft/bamboo_craft_30.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Bamboo Craft Piece 31', 'Handcrafted bamboo craft item from local artisans.', 670, 6, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 670 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/bamboo_craft/bamboo_craft_31.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Bamboo Craft Piece 32', 'Handcrafted bamboo craft item from local artisans.', 394, 6, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 394 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/bamboo_craft/bamboo_craft_32.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Bamboo Craft Piece 33', 'Handcrafted bamboo craft item from local artisans.', 559, 6, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 559 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/bamboo_craft/bamboo_craft_33.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Bamboo Craft Piece 34', 'Handcrafted bamboo craft item from local artisans.', 642, 6, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 642 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/bamboo_craft/bamboo_craft_34.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Bamboo Craft Piece 35', 'Handcrafted bamboo craft item from local artisans.', 1914, 6, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1914 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/bamboo_craft/bamboo_craft_35.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Bamboo Craft Piece 36', 'Handcrafted bamboo craft item from local artisans.', 1216, 6, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1216 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/bamboo_craft/bamboo_craft_36.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Jewelry Piece 1', 'Handcrafted folk jewelry item from local artisans.', 774, 7, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 774 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_jewelry/folk_jewelry_1.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Jewelry Piece 2', 'Handcrafted folk jewelry item from local artisans.', 3367, 7, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 3367 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_jewelry/folk_jewelry_2.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Jewelry Piece 3', 'Handcrafted folk jewelry item from local artisans.', 3616, 7, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 3616 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_jewelry/folk_jewelry_3.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Jewelry Piece 4', 'Handcrafted folk jewelry item from local artisans.', 1060, 7, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1060 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_jewelry/folk_jewelry_4.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Jewelry Piece 5', 'Handcrafted folk jewelry item from local artisans.', 3063, 7, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 3063 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_jewelry/folk_jewelry_5.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Jewelry Piece 6', 'Handcrafted folk jewelry item from local artisans.', 2593, 7, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 2593 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_jewelry/folk_jewelry_6.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Jewelry Piece 7', 'Handcrafted folk jewelry item from local artisans.', 357, 7, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 357 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_jewelry/folk_jewelry_7.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Jewelry Piece 8', 'Handcrafted folk jewelry item from local artisans.', 3187, 7, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 3187 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_jewelry/folk_jewelry_8.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Jewelry Piece 9', 'Handcrafted folk jewelry item from local artisans.', 2448, 7, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 2448 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_jewelry/folk_jewelry_9.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Jewelry Piece 10', 'Handcrafted folk jewelry item from local artisans.', 463, 7, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 463 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_jewelry/folk_jewelry_10.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Jewelry Piece 11', 'Handcrafted folk jewelry item from local artisans.', 1970, 7, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1970 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_jewelry/folk_jewelry_11.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Jewelry Piece 12', 'Handcrafted folk jewelry item from local artisans.', 3326, 7, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 3326 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_jewelry/folk_jewelry_12.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Jewelry Piece 13', 'Handcrafted folk jewelry item from local artisans.', 3615, 7, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 3615 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_jewelry/folk_jewelry_13.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Jewelry Piece 14', 'Handcrafted folk jewelry item from local artisans.', 2127, 7, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 2127 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_jewelry/folk_jewelry_14.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Jewelry Piece 15', 'Handcrafted folk jewelry item from local artisans.', 3252, 7, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 3252 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_jewelry/folk_jewelry_15.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Jewelry Piece 16', 'Handcrafted folk jewelry item from local artisans.', 3067, 7, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 3067 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_jewelry/folk_jewelry_16.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Jewelry Piece 17', 'Handcrafted folk jewelry item from local artisans.', 2383, 7, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 2383 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_jewelry/folk_jewelry_17.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Jewelry Piece 18', 'Handcrafted folk jewelry item from local artisans.', 1300, 7, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1300 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_jewelry/folk_jewelry_18.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Jewelry Piece 19', 'Handcrafted folk jewelry item from local artisans.', 3143, 7, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 3143 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_jewelry/folk_jewelry_19.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Jewelry Piece 20', 'Handcrafted folk jewelry item from local artisans.', 873, 7, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 873 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_jewelry/folk_jewelry_20.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Jewelry Piece 21', 'Handcrafted folk jewelry item from local artisans.', 1182, 7, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1182 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_jewelry/folk_jewelry_21.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Musical Stuff Piece 1', 'Handcrafted folk musical stuff item from local artisans.', 7371, 8, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 7371 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_musical_stuff/folk_musical_stuff_1.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Musical Stuff Piece 2', 'Handcrafted folk musical stuff item from local artisans.', 1387, 8, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1387 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_musical_stuff/folk_musical_stuff_2.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Musical Stuff Piece 3', 'Handcrafted folk musical stuff item from local artisans.', 3698, 8, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 3698 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_musical_stuff/folk_musical_stuff_3.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Musical Stuff Piece 4', 'Handcrafted folk musical stuff item from local artisans.', 6043, 8, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 6043 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_musical_stuff/folk_musical_stuff_4.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Musical Stuff Piece 5', 'Handcrafted folk musical stuff item from local artisans.', 5635, 8, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 5635 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_musical_stuff/folk_musical_stuff_5.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Musical Stuff Piece 6', 'Handcrafted folk musical stuff item from local artisans.', 13379, 8, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 13379 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_musical_stuff/folk_musical_stuff_6.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Musical Stuff Piece 7', 'Handcrafted folk musical stuff item from local artisans.', 13701, 8, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 13701 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_musical_stuff/folk_musical_stuff_7.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Musical Stuff Piece 8', 'Handcrafted folk musical stuff item from local artisans.', 5056, 8, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 5056 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_musical_stuff/folk_musical_stuff_8.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Musical Stuff Piece 9', 'Handcrafted folk musical stuff item from local artisans.', 11909, 8, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 11909 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_musical_stuff/folk_musical_stuff_9.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Musical Stuff Piece 10', 'Handcrafted folk musical stuff item from local artisans.', 13540, 8, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 13540 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_musical_stuff/folk_musical_stuff_10.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Musical Stuff Piece 11', 'Handcrafted folk musical stuff item from local artisans.', 12929, 8, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 12929 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_musical_stuff/folk_musical_stuff_11.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Musical Stuff Piece 12', 'Handcrafted folk musical stuff item from local artisans.', 3629, 8, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 3629 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_musical_stuff/folk_musical_stuff_12.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Musical Stuff Piece 13', 'Handcrafted folk musical stuff item from local artisans.', 7305, 8, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 7305 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_musical_stuff/folk_musical_stuff_13.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Musical Stuff Piece 14', 'Handcrafted folk musical stuff item from local artisans.', 9512, 8, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 9512 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_musical_stuff/folk_musical_stuff_14.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Musical Stuff Piece 15', 'Handcrafted folk musical stuff item from local artisans.', 12687, 8, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 12687 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_musical_stuff/folk_musical_stuff_15.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Musical Stuff Piece 16', 'Handcrafted folk musical stuff item from local artisans.', 7292, 8, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 7292 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_musical_stuff/folk_musical_stuff_16.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Musical Stuff Piece 17', 'Handcrafted folk musical stuff item from local artisans.', 12500, 8, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 12500 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_musical_stuff/folk_musical_stuff_17.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Musical Stuff Piece 18', 'Handcrafted folk musical stuff item from local artisans.', 3792, 8, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 3792 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_musical_stuff/folk_musical_stuff_18.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Musical Stuff Piece 19', 'Handcrafted folk musical stuff item from local artisans.', 2421, 8, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 2421 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_musical_stuff/folk_musical_stuff_19.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Musical Stuff Piece 20', 'Handcrafted folk musical stuff item from local artisans.', 9423, 8, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 9423 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_musical_stuff/folk_musical_stuff_20.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Musical Stuff Piece 21', 'Handcrafted folk musical stuff item from local artisans.', 11759, 8, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 11759 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_musical_stuff/folk_musical_stuff_21.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Textile Piece 1', 'Handcrafted folk textile item from local artisans.', 1573, 9, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1573 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_textile/folk_textile_1.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Textile Piece 2', 'Handcrafted folk textile item from local artisans.', 2698, 9, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 2698 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_textile/folk_textile_2.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Textile Piece 3', 'Handcrafted folk textile item from local artisans.', 14341, 9, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 14341 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_textile/folk_textile_3.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Textile Piece 4', 'Handcrafted folk textile item from local artisans.', 20498, 9, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 20498 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_textile/folk_textile_4.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Textile Piece 5', 'Handcrafted folk textile item from local artisans.', 18170, 9, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 18170 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_textile/folk_textile_5.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Textile Piece 6', 'Handcrafted folk textile item from local artisans.', 6754, 9, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 6754 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_textile/folk_textile_6.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Textile Piece 7', 'Handcrafted folk textile item from local artisans.', 11076, 9, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 11076 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_textile/folk_textile_7.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Textile Piece 8', 'Handcrafted folk textile item from local artisans.', 19405, 9, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 19405 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_textile/folk_textile_8.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Textile Piece 9', 'Handcrafted folk textile item from local artisans.', 6822, 9, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 6822 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_textile/folk_textile_9.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Textile Piece 10', 'Handcrafted folk textile item from local artisans.', 13340, 9, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 13340 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_textile/folk_textile_10.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Textile Piece 11', 'Handcrafted folk textile item from local artisans.', 18800, 9, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 18800 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_textile/folk_textile_11.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Textile Piece 12', 'Handcrafted folk textile item from local artisans.', 10695, 9, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 10695 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_textile/folk_textile_12.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Textile Piece 13', 'Handcrafted folk textile item from local artisans.', 5271, 9, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 5271 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_textile/folk_textile_13.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Textile Piece 14', 'Handcrafted folk textile item from local artisans.', 22957, 9, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 22957 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_textile/folk_textile_14.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Textile Piece 15', 'Handcrafted folk textile item from local artisans.', 9349, 9, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 9349 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_textile/folk_textile_15.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Textile Piece 16', 'Handcrafted folk textile item from local artisans.', 17554, 9, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 17554 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_textile/folk_textile_16.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Textile Piece 17', 'Handcrafted folk textile item from local artisans.', 7908, 9, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 7908 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_textile/folk_textile_17.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Textile Piece 18', 'Handcrafted folk textile item from local artisans.', 7889, 9, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 7889 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_textile/folk_textile_18.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Textile Piece 19', 'Handcrafted folk textile item from local artisans.', 12204, 9, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 12204 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_textile/folk_textile_19.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Textile Piece 20', 'Handcrafted folk textile item from local artisans.', 13635, 9, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 13635 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_textile/folk_textile_20.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Textile Piece 21', 'Handcrafted folk textile item from local artisans.', 22621, 9, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 22621 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_textile/folk_textile_21.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Textile Piece 22', 'Handcrafted folk textile item from local artisans.', 11742, 9, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 11742 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_textile/folk_textile_22.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Textile Piece 23', 'Handcrafted folk textile item from local artisans.', 6453, 9, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 6453 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_textile/folk_textile_23.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Textile Piece 24', 'Handcrafted folk textile item from local artisans.', 16574, 9, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 16574 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_textile/folk_textile_24.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Textile Piece 25', 'Handcrafted folk textile item from local artisans.', 4918, 9, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 4918 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_textile/folk_textile_25.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Folk Textile Piece 26', 'Handcrafted folk textile item from local artisans.', 5953, 9, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 5953 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/folk_textile/folk_textile_26.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Handicraft Piece 1', 'Handcrafted handicraft item from local artisans.', 1901, 10, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1901 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/handicraft/handicraft_1.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Handicraft Piece 2', 'Handcrafted handicraft item from local artisans.', 2879, 10, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 2879 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/handicraft/handicraft_2.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Handicraft Piece 3', 'Handcrafted handicraft item from local artisans.', 871, 10, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 871 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/handicraft/handicraft_3.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Handicraft Piece 4', 'Handcrafted handicraft item from local artisans.', 860, 10, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 860 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/handicraft/handicraft_4.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Handicraft Piece 5', 'Handcrafted handicraft item from local artisans.', 2593, 10, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 2593 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/handicraft/handicraft_5.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Handicraft Piece 6', 'Handcrafted handicraft item from local artisans.', 1277, 10, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1277 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/handicraft/handicraft_6.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Handicraft Piece 7', 'Handcrafted handicraft item from local artisans.', 1208, 10, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1208 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/handicraft/handicraft_7.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Handicraft Piece 8', 'Handcrafted handicraft item from local artisans.', 466, 10, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 466 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/handicraft/handicraft_8.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Home Decor Piece 1', 'Handcrafted home decor item from local artisans.', 1987, 11, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1987 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/home_decor/home_decor_1.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Home Decor Piece 2', 'Handcrafted home decor item from local artisans.', 6131, 11, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 6131 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/home_decor/home_decor_2.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Home Decor Piece 3', 'Handcrafted home decor item from local artisans.', 6239, 11, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 6239 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/home_decor/home_decor_3.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Home Decor Piece 4', 'Handcrafted home decor item from local artisans.', 5409, 11, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 5409 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/home_decor/home_decor_4.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Home Decor Piece 5', 'Handcrafted home decor item from local artisans.', 3869, 11, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 3869 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/home_decor/home_decor_5.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Home Decor Piece 6', 'Handcrafted home decor item from local artisans.', 3345, 11, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 3345 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/home_decor/home_decor_6.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Home Decor Piece 7', 'Handcrafted home decor item from local artisans.', 2761, 11, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 2761 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/home_decor/home_decor_7.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Home Decor Piece 8', 'Handcrafted home decor item from local artisans.', 5053, 11, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 5053 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/home_decor/home_decor_8.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Home Decor Piece 9', 'Handcrafted home decor item from local artisans.', 3424, 11, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 3424 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/home_decor/home_decor_9.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Home Decor Piece 10', 'Handcrafted home decor item from local artisans.', 2786, 11, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 2786 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/home_decor/home_decor_10.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Home Decor Piece 11', 'Handcrafted home decor item from local artisans.', 5910, 11, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 5910 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/home_decor/home_decor_11.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Home Decor Piece 12', 'Handcrafted home decor item from local artisans.', 2127, 11, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 2127 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/home_decor/home_decor_12.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Home Decor Piece 13', 'Handcrafted home decor item from local artisans.', 5926, 11, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 5926 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/home_decor/home_decor_13.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Home Decor Piece 14', 'Handcrafted home decor item from local artisans.', 3230, 11, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 3230 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/home_decor/home_decor_14.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Home Decor Piece 15', 'Handcrafted home decor item from local artisans.', 2410, 11, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 2410 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/home_decor/home_decor_15.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Home Decor Piece 16', 'Handcrafted home decor item from local artisans.', 5505, 11, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 5505 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/home_decor/home_decor_16.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Home Decor Piece 17', 'Handcrafted home decor item from local artisans.', 2330, 11, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 2330 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/home_decor/home_decor_17.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Home Decor Piece 18', 'Handcrafted home decor item from local artisans.', 2008, 11, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 2008 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/home_decor/home_decor_18.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Home Decor Piece 19', 'Handcrafted home decor item from local artisans.', 4243, 11, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 4243 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/home_decor/home_decor_19.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Home Decor Piece 20', 'Handcrafted home decor item from local artisans.', 3257, 11, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 3257 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/home_decor/home_decor_20.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Home Decor Piece 21', 'Handcrafted home decor item from local artisans.', 4089, 11, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 4089 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/home_decor/home_decor_21.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Home Decor Piece 22', 'Handcrafted home decor item from local artisans.', 5529, 11, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 5529 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/home_decor/home_decor_22.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Home Decor Piece 23', 'Handcrafted home decor item from local artisans.', 7511, 11, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 7511 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/home_decor/home_decor_23.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Home Decor Piece 24', 'Handcrafted home decor item from local artisans.', 3581, 11, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 3581 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/home_decor/home_decor_24.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Home Decor Piece 25', 'Handcrafted home decor item from local artisans.', 7146, 11, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 7146 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/home_decor/home_decor_25.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Home Decor Piece 26', 'Handcrafted home decor item from local artisans.', 6864, 11, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 6864 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/home_decor/home_decor_26.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Home Decor Piece 27', 'Handcrafted home decor item from local artisans.', 4916, 11, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 4916 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/home_decor/home_decor_27.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Home Decor Piece 28', 'Handcrafted home decor item from local artisans.', 3265, 11, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 3265 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/home_decor/home_decor_28.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Home Decor Piece 29', 'Handcrafted home decor item from local artisans.', 3408, 11, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 3408 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/home_decor/home_decor_29.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Home Decor Piece 30', 'Handcrafted home decor item from local artisans.', 1127, 11, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1127 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/home_decor/home_decor_30.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Home Decor Piece 31', 'Handcrafted home decor item from local artisans.', 2379, 11, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 2379 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/home_decor/home_decor_31.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Pottery And Clay Piece 1', 'Handcrafted pottery and clay item from local artisans.', 806, 12, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 806 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/pottery_and_clay/pottery_and_clay_1.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Pottery And Clay Piece 2', 'Handcrafted pottery and clay item from local artisans.', 1738, 12, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1738 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/pottery_and_clay/pottery_and_clay_2.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Pottery And Clay Piece 3', 'Handcrafted pottery and clay item from local artisans.', 902, 12, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 902 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/pottery_and_clay/pottery_and_clay_3.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Pottery And Clay Piece 4', 'Handcrafted pottery and clay item from local artisans.', 2496, 12, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 2496 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/pottery_and_clay/pottery_and_clay_4.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Pottery And Clay Piece 5', 'Handcrafted pottery and clay item from local artisans.', 2484, 12, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 2484 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/pottery_and_clay/pottery_and_clay_5.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Pottery And Clay Piece 6', 'Handcrafted pottery and clay item from local artisans.', 1836, 12, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1836 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/pottery_and_clay/pottery_and_clay_6.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Pottery And Clay Piece 7', 'Handcrafted pottery and clay item from local artisans.', 2349, 12, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 2349 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/pottery_and_clay/pottery_and_clay_7.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Pottery And Clay Piece 8', 'Handcrafted pottery and clay item from local artisans.', 2451, 12, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 2451 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/pottery_and_clay/pottery_and_clay_8.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Pottery And Clay Piece 9', 'Handcrafted pottery and clay item from local artisans.', 1441, 12, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1441 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/pottery_and_clay/pottery_and_clay_9.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Pottery And Clay Piece 10', 'Handcrafted pottery and clay item from local artisans.', 417, 12, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 417 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/pottery_and_clay/pottery_and_clay_10.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Pottery And Clay Piece 11', 'Handcrafted pottery and clay item from local artisans.', 933, 12, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 933 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/pottery_and_clay/pottery_and_clay_11.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Pottery And Clay Piece 12', 'Handcrafted pottery and clay item from local artisans.', 1204, 12, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1204 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/pottery_and_clay/pottery_and_clay_12.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Pottery And Clay Piece 13', 'Handcrafted pottery and clay item from local artisans.', 1479, 12, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1479 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/pottery_and_clay/pottery_and_clay_13.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Stone Craft Piece 1', 'Handcrafted stone craft item from local artisans.', 2685, 13, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 2685 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/stone_craft/stone_craft_1.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Stone Craft Piece 2', 'Handcrafted stone craft item from local artisans.', 3025, 13, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 3025 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/stone_craft/stone_craft_2.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Stone Craft Piece 3', 'Handcrafted stone craft item from local artisans.', 2075, 13, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 2075 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/stone_craft/stone_craft_3.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Stone Craft Piece 4', 'Handcrafted stone craft item from local artisans.', 960, 13, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 960 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/stone_craft/stone_craft_4.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Stone Craft Piece 5', 'Handcrafted stone craft item from local artisans.', 5390, 13, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 5390 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/stone_craft/stone_craft_5.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Stone Craft Piece 6', 'Handcrafted stone craft item from local artisans.', 1253, 13, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1253 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/stone_craft/stone_craft_6.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Stone Craft Piece 7', 'Handcrafted stone craft item from local artisans.', 4124, 13, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 4124 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/stone_craft/stone_craft_7.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Stone Craft Piece 8', 'Handcrafted stone craft item from local artisans.', 654, 13, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 654 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/stone_craft/stone_craft_8.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Stone Craft Piece 9', 'Handcrafted stone craft item from local artisans.', 1905, 13, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1905 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/stone_craft/stone_craft_9.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Stone Craft Piece 10', 'Handcrafted stone craft item from local artisans.', 2915, 13, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 2915 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/stone_craft/stone_craft_10.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Stone Craft Piece 11', 'Handcrafted stone craft item from local artisans.', 1642, 13, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1642 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/stone_craft/stone_craft_11.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Stone Craft Piece 12', 'Handcrafted stone craft item from local artisans.', 4708, 13, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 4708 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/stone_craft/stone_craft_12.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Stone Craft Piece 13', 'Handcrafted stone craft item from local artisans.', 3553, 13, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 3553 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/stone_craft/stone_craft_13.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Stone Craft Piece 14', 'Handcrafted stone craft item from local artisans.', 5628, 13, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 5628 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/stone_craft/stone_craft_14.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Stone Craft Piece 15', 'Handcrafted stone craft item from local artisans.', 4518, 13, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 4518 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/stone_craft/stone_craft_15.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Wooden Craft Piece 1', 'Handcrafted wooden craft item from local artisans.', 4263, 14, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 4263 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/wooden_craft/wooden_craft_1.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Wooden Craft Piece 2', 'Handcrafted wooden craft item from local artisans.', 4166, 14, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 4166 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/wooden_craft/wooden_craft_2.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Wooden Craft Piece 3', 'Handcrafted wooden craft item from local artisans.', 2288, 14, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 2288 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/wooden_craft/wooden_craft_3.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Wooden Craft Piece 4', 'Handcrafted wooden craft item from local artisans.', 1315, 14, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1315 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/wooden_craft/wooden_craft_4.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Wooden Craft Piece 5', 'Handcrafted wooden craft item from local artisans.', 6935, 14, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 6935 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/wooden_craft/wooden_craft_5.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Wooden Craft Piece 6', 'Handcrafted wooden craft item from local artisans.', 6994, 14, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 6994 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/wooden_craft/wooden_craft_6.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Wooden Craft Piece 7', 'Handcrafted wooden craft item from local artisans.', 4633, 14, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 4633 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/wooden_craft/wooden_craft_7.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Wooden Craft Piece 8', 'Handcrafted wooden craft item from local artisans.', 2019, 14, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 2019 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/wooden_craft/wooden_craft_8.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Wooden Craft Piece 9', 'Handcrafted wooden craft item from local artisans.', 2605, 14, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 2605 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/wooden_craft/wooden_craft_9.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Wooden Craft Piece 10', 'Handcrafted wooden craft item from local artisans.', 1131, 14, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 1131 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/wooden_craft/wooden_craft_10.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Wooden Craft Piece 11', 'Handcrafted wooden craft item from local artisans.', 6363, 14, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 6363 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/wooden_craft/wooden_craft_11.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Wooden Craft Piece 12', 'Handcrafted wooden craft item from local artisans.', 6131, 14, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 6131 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/wooden_craft/wooden_craft_12.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Wooden Craft Piece 13', 'Handcrafted wooden craft item from local artisans.', 3418, 14, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 3418 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/wooden_craft/wooden_craft_13.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Wooden Craft Piece 14', 'Handcrafted wooden craft item from local artisans.', 5477, 14, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 5477 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/wooden_craft/wooden_craft_14.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Wooden Craft Piece 15', 'Handcrafted wooden craft item from local artisans.', 4964, 14, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 4964 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/wooden_craft/wooden_craft_15.jpg', variant_id FROM inserted_variant;

WITH inserted_product AS (
    INSERT INTO product (name, description, base_price, category_id, seller_id) 
    VALUES ('Wooden Craft Piece 16', 'Handcrafted wooden craft item from local artisans.', 3346, 14, 1)
    RETURNING product_id
), inserted_variant AS (
    INSERT INTO product_variant (product_id, size, color, stock_quantity, price)
    SELECT product_id, 'Standard', 'Original', 15, 3346 FROM inserted_product
    RETURNING variant_id
)
INSERT INTO product_image (image_url, variant_id)
SELECT '/images/wooden_craft/wooden_craft_16.jpg', variant_id FROM inserted_variant;

