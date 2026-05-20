from fastapi import APIRouter
from app.database.connection import SessionLocal
from app.models.user_model import User

router = APIRouter()

# ================= SIGNUP =================

@router.post("/signup")
def signup(user: dict):

    db = SessionLocal()

    new_user = User(
        name=user["name"],
        email=user["email"],
        password=user["password"]
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "Account Created Successfully"
    }


# ================= LOGIN =================

@router.post("/login")
def login(user: dict):

    db = SessionLocal()

    existing_user = db.query(User).filter(
        User.email == user["email"]
    ).first()

    if not existing_user:
        return {
            "message": "User Not Found"
        }

    if existing_user.password != user["password"]:
        return {
            "message": "Wrong Password"
        }

    return {
        "message": "Login Success",
        "user": {
            "id": existing_user.id,
            "name": existing_user.name,
            "email": existing_user.email
        }
    }