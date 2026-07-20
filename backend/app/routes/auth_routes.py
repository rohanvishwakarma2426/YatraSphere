from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database.connection import get_db
from app.models.user_model import User
from app.schemas.user_schema import UserRegister, UserLogin, UserOut, UserUpdate
from app.utils.security import hash_password, verify_password

router = APIRouter()


# ================= SIGNUP =================

@router.post("/signup")
def signup(user: UserRegister, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="An account with this email already exists.",
        )

    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password),
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "Account Created Successfully",
        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email,
            "avatar_url": new_user.avatar_url,
            "bio": new_user.bio,
        },
    }


# ================= LOGIN =================

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(User.email == user.email).first()

    if not existing_user:
        raise HTTPException(status_code=401, detail="User Not Found")

    if not verify_password(user.password, existing_user.password):
        raise HTTPException(status_code=401, detail="Wrong Password")

    return {
        "message": "Login Success",
        "user": {
            "id": existing_user.id,
            "name": existing_user.name,
            "email": existing_user.email,
            "avatar_url": existing_user.avatar_url,
            "bio": existing_user.bio,
        },
    }


# ================= LIST USERS =================
# Powers "People You May Know" on Community — every real signed-up user,
# not just the ones who happen to have posted already.

@router.get("/users", response_model=List[UserOut])
def list_users(db: Session = Depends(get_db)):
    return db.query(User).all()


# ================= UPDATE PROFILE =================
# Powers the Profile Dashboard's "Edit Profile" form (name, bio, avatar).

@router.put("/users/{user_id}", response_model=UserOut)
def update_profile(user_id: int, payload: UserUpdate, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if payload.name is not None:
        user.name = payload.name
    if payload.bio is not None:
        user.bio = payload.bio
    if payload.avatar_url is not None:
        user.avatar_url = payload.avatar_url

    db.commit()
    db.refresh(user)

    return user