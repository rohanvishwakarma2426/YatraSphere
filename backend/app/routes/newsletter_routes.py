from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.subscriber_model import Subscriber
from app.utils.mailer import send_email

router = APIRouter()


class NewsletterSubscribe(BaseModel):
    email: EmailStr


@router.post("/newsletter/subscribe")
def subscribe(payload: NewsletterSubscribe, db: Session = Depends(get_db)):

    existing = db.query(Subscriber).filter(Subscriber.email == payload.email).first()

    if not existing:
        db.add(Subscriber(email=payload.email))
        db.commit()

    try:
        send_email(
            to_email=payload.email,
            subject="Hello from YatraSphere! 👋",
            body=(
                "Hello!\n\n"
                "Thanks for subscribing to the YatraSphere newsletter. "
                "You'll get travel tips, exclusive deals, and inspiring "
                "stories straight to your inbox.\n\n"
                "Safe travels,\n"
                "The YatraSphere Team"
            ),
        )
    except RuntimeError as e:
        # Email is saved either way — SMTP just isn't configured yet.
        # Surface this clearly instead of pretending the email went out.
        raise HTTPException(status_code=503, detail=str(e))

    return {"message": "Subscribed! Check your inbox for a welcome email."}