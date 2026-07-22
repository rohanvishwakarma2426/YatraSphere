from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.user_model import User
from app.models.post_model import Post
from app.utils.security import verify_password

router = APIRouter()


# ================= ADMIN LOGIN =================

class AdminLogin(BaseModel):
    email: EmailStr
    password: str


@router.post("/admin/login")
def admin_login(payload: AdminLogin, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.email == payload.email).first()

    if not user or not verify_password(payload.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not user.is_admin:
        raise HTTPException(status_code=403, detail="This account does not have admin access")

    return {
        "message": "Login successful",
        "admin": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "avatar_url": user.avatar_url,
        },
    }


# ================= DASHBOARD STATS =================

@router.get("/admin/stats")
def admin_stats(db: Session = Depends(get_db)):

    users = db.query(User).order_by(User.id.desc()).all()
    posts = db.query(Post).order_by(Post.created_at.desc()).all()

    location_counts = {}
    for p in posts:
        loc = (p.location or "").strip()
        if not loc:
            continue
        location_counts[loc] = location_counts.get(loc, 0) + 1

    total_located = sum(location_counts.values()) or 1
    ranked_locations = sorted(location_counts.items(), key=lambda x: x[1], reverse=True)

    top_destinations = [
        {"name": name, "percent": round(count / total_located * 100)}
        for name, count in ranked_locations[:5]
    ]
    others_percent = 100 - sum(d["percent"] for d in top_destinations)
    if others_percent > 0 and len(ranked_locations) > 5:
        top_destinations.append({"name": "Others", "percent": others_percent})

    recent_users = [
        {
            "id": u.id,
            "name": u.name,
            "email": u.email,
            "avatar_url": u.avatar_url,
            "joined_at": u.created_at,
        }
        for u in users[:5]
    ]

    recent_posts = [
        {
            "id": p.id,
            "title": p.title,
            "author_name": p.author.name if p.author else "Traveler",
            "image_url": p.image_url,
            "created_at": p.created_at,
        }
        for p in posts[:5]
    ]

    today = datetime.utcnow().date()
    bookings_overview = [
        {
            "date": (today - timedelta(days=18 - i)).strftime("%d %b"),
            "this_month": v,
            "last_month": v2,
        }
        for i, (v, v2) in enumerate([
            (220, 150), (430, 260), (520, 300), (400, 340), (620, 480),
            (830, 560), (700, 610), (650, 720), (760, 790), (820, 750),
            (900, 680), (780, 590), (650, 480), (500, 400), (420, 350),
            (330, 280), (250, 220), (180, 160), (100, 120),
        ])
    ]

    recent_bookings = [
        {"title": "Trip to Manali", "by": "Rahul Sharma", "amount": 12500, "status": "Confirmed", "image_url": None},
        {"title": "Goa Beach Package", "by": "Priya Singh", "amount": 8999, "status": "Confirmed", "image_url": None},
        {"title": "Kerala 5 Days Trip", "by": "Ankit Verma", "amount": 15750, "status": "Pending", "image_url": None},
        {"title": "Ladakh Adventure", "by": "Neha Kapoor", "amount": 18999, "status": "Confirmed", "image_url": None},
    ]

    return {
        "cards": {
            "total_users": {"value": len(users), "is_placeholder": False},
            "total_posts": {"value": len(posts), "is_placeholder": False},
            "total_trips_booked": {"value": 3782, "is_placeholder": True},
            "total_revenue": {"value": 2468350, "is_placeholder": True},
        },
        "bookings_overview": bookings_overview,
        "top_destinations": top_destinations,
        "recent_users": recent_users,
        "recent_posts": recent_posts,
        "recent_bookings": recent_bookings,
    }