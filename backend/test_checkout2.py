import sys, psycopg2, json, traceback
from dotenv import load_dotenv; import os

try:
    load_dotenv('.env')
    conn = psycopg2.connect(
        host=os.getenv('DB_HOST'), database=os.getenv('DB_NAME'),
        user=os.getenv('DB_USER'), password=os.getenv('DB_PASSWORD'), port=os.getenv('DB_PORT')
    )
    cur = conn.cursor()
    cur.execute('SELECT user_id FROM users LIMIT 1'); user_id = cur.fetchone()[0]
    
    cur.execute('SELECT address_id FROM address LIMIT 1')
    res = cur.fetchone()
    if not res:
        cur.execute('INSERT INTO address (street, city, postal_code, country, user_id) VALUES (%s,%s,%s,%s,%s) RETURNING address_id', ('s', 'c', 'p', 'c', user_id))
        address_id = cur.fetchone()[0]
    else:
        address_id = res[0]

    cur.execute('SELECT variant_id, price FROM product_variant LIMIT 1'); v = cur.fetchone()
    items_json = json.dumps([{"variant_id": v[0], "quantity": 1, "price": float(v[1])}])

    print('Calling with:', user_id, address_id, items_json)
    cur.execute('CALL place_complete_order(%s, %s, %s::jsonb)', (user_id, address_id, items_json))
    conn.commit()
    print('Success')
except Exception as e:
    with open('error_log.txt', 'w') as f:
        f.write(traceback.format_exc())
    print('Error written to error_log.txt')
