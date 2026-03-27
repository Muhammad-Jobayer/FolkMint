import psycopg2
from fastapi import APIRouter, Depends
from database import get_db, standard_response
from models import NewsletterSubscribe

router = APIRouter(prefix="/api/newsletter", tags=["newsletter"])

@router.post("/subscribe")
def subscribe_newsletter(data: NewsletterSubscribe, db=Depends(get_db)):
    cursor = db.cursor()
    try:
        cursor.execute("INSERT INTO newsletter_subscriptions (email) VALUES (%s)", (data.email,))
        db.commit()
        return standard_response(True, message="Successfully joined the heritage!")
    except psycopg2.IntegrityError:
        db.rollback()
        return standard_response(True, message="You are already part of our heritage!")
    except Exception as err:
        db.rollback()
        return standard_response(False, message=f"Subscription failed: {str(err)}")
    finally:
        cursor.close()
