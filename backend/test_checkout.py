import psycopg2, json, os
from dotenv import load_dotenv
load_dotenv('.env')

try:
    conn = psycopg2.connect(
        host=os.getenv('DB_HOST'), database=os.getenv('DB_NAME'),
        user=os.getenv('DB_USER'), password=os.getenv('DB_PASSWORD'), port=os.getenv('DB_PORT')
    )
    cur = conn.cursor()
    # Find a user and an address
    cur.execute('SELECT user_id FROM users LIMIT 1')
    user_id = cur.fetchone()[0]
    cur.execute('SELECT address_id FROM address WHERE user_id=%s LIMIT 1', (user_id,))
    addr = cur.fetchone()
    if not addr:
        cur.execute('INSERT INTO address (street, city, postal_code, country, user_id) VALUES (%s, %s, %s, %s, %s) RETURNING address_id', ('123 St', 'City', '00', 'Country', user_id))
        address_id = cur.fetchone()[0]
    else:
        address_id = addr[0]

    # find a variant
    cur.execute('SELECT variant_id, price FROM product_variant LIMIT 1')
    variant_id, price = cur.fetchone()

    items = [{'variant_id': variant_id, 'quantity': 1, 'price': float(price)}]
    items_json = json.dumps(items)

    print('Calling place_complete_order:', user_id, address_id, items_json)
    cur.execute('CALL place_complete_order(%s, %s, %s::jsonb)', (user_id, address_id, items_json))
    conn.commit()
    print('Success')
except Exception as e:
    print('Error:', e)
