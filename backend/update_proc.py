import psycopg2, os
from dotenv import load_dotenv

load_dotenv('.env')
conn = psycopg2.connect(
    host=os.getenv('DB_HOST'), database=os.getenv('DB_NAME'),
    user=os.getenv('DB_USER'), password=os.getenv('DB_PASSWORD'), port=os.getenv('DB_PORT')
)
cur = conn.cursor()
try:
    cur.execute("""
CREATE OR REPLACE PROCEDURE place_complete_order(
    p_user_id INT,
    p_address_id INT,
    p_items_json JSONB
)
LANGUAGE plpgsql
AS $BODY
DECLARE
    v_order_id INT;
    v_item RECORD;
    v_total DECIMAL(10,2) := 0;
    v_product_id INT;
BEGIN
    FOR v_item IN SELECT * FROM jsonb_to_recordset(p_items_json) AS x(variant_id INT, quantity INT, price DECIMAL(10,2))
    LOOP
        v_total := v_total + (v_item.price * v_item.quantity);
    END LOOP;

    INSERT INTO orders (user_id, address_id, total_amount, status)
    VALUES (p_user_id, p_address_id, v_total, 'delivered')
    RETURNING order_id INTO v_order_id;
    
    FOR v_item IN SELECT * FROM jsonb_to_recordset(p_items_json) AS x(variant_id INT, quantity INT, price DECIMAL(10,2))
    LOOP
        SELECT product_id INTO v_product_id FROM product_variant WHERE variant_id = v_item.variant_id;
        INSERT INTO order_item (order_id, variant_id, quantity, price_at_purchase, product_id)
        VALUES (v_order_id, v_item.variant_id, v_item.quantity, v_item.price, v_product_id);

        UPDATE product_variant 
        SET stock_quantity = stock_quantity - v_item.quantity
        WHERE variant_id = v_item.variant_id;
    END LOOP;
    
    DELETE FROM cart_item ci USING cart c WHERE ci.cart_id = c.cart_id AND c.user_id = p_user_id;
    DELETE FROM cart WHERE user_id = p_user_id;
END;
$BODY;
""")
    conn.commit()
    print("Procedure modified successfully.")
except Exception as e:
    print(e)
