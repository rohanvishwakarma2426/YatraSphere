from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.database.connection import get_db
from app.models.post_model import Post
from app.models.user_model import User
from app.schemas.post_schema import (
    PostCreate, PostUpdate, PostOut, GUIDE_CATEGORIES, EXPERIENCE_CATEGORIES, ALL_CATEGORIES,
)

router = APIRouter()


# ================= CREATE POST =================
# Used by the "Share Experience" form. If the post's category is one of the
# guide or experience categories, it automatically becomes searchable via
# /api/guides/search or /api/experience/search — they're just normal
# community posts under the hood, there's no separate table for either.

@router.post("/posts", response_model=PostOut)
def create_post(post: PostCreate, db: Session = Depends(get_db)):

    if post.category not in ALL_CATEGORIES:
        raise HTTPException(status_code=400, detail=f"Invalid category '{post.category}'")

    author = db.query(User).filter(User.id == post.user_id).first()
    if not author:
        raise HTTPException(status_code=404, detail="User not found")

    new_post = Post(
        user_id=post.user_id,
        title=post.title,
        content=post.content,
        location=post.location,
        category=post.category,
        image_url=post.image_url,
    )

    db.add(new_post)
    db.commit()
    db.refresh(new_post)

    return new_post


# ================= KNOWN LOCATIONS =================

@router.get("/locations", response_model=list[str])
def list_known_locations(db: Session = Depends(get_db)):

    rows = (
        db.query(Post.location)
        .filter(Post.location.isnot(None), Post.location != "")
        .distinct()
        .all()
    )

    seen = {}
    for (loc,) in rows:
        key = loc.strip().lower()
        if key and key not in seen:
            seen[key] = loc.strip()

    return sorted(seen.values(), key=str.lower)


# ================= MY POSTS (Profile Dashboard) =================

@router.get("/users/{user_id}/posts", response_model=list[PostOut])
def list_user_posts(user_id: int, db: Session = Depends(get_db)):
    return (
        db.query(Post)
        .filter(Post.user_id == user_id)
        .order_by(Post.created_at.desc())
        .all()
    )


# ================= EDIT POST =================

@router.put("/posts/{post_id}", response_model=PostOut)
def update_post(post_id: int, payload: PostUpdate, db: Session = Depends(get_db)):

    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    if payload.category is not None and payload.category not in ALL_CATEGORIES:
        raise HTTPException(status_code=400, detail=f"Invalid category '{payload.category}'")

    for field in ("title", "content", "location", "category", "image_url"):
        value = getattr(payload, field)
        if value is not None:
            setattr(post, field, value)

    db.commit()
    db.refresh(post)

    return post


# ================= DELETE POST =================

@router.delete("/posts/{post_id}")
def delete_post(post_id: int, db: Session = Depends(get_db)):

    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    db.delete(post)
    db.commit()

    return {"message": "Post deleted successfully"}


# ================= COMMUNITY FEED =================

@router.get("/posts", response_model=list[PostOut])
def list_posts(
    category: Optional[str] = None,
    db: Session = Depends(get_db),
):
    query = db.query(Post)

    if category:
        query = query.filter(Post.category == category)

    return query.order_by(Post.created_at.desc()).all()


# ================= GUIDE SEARCH =================
# GET /api/guides/search?q=Goa&category=budget_guide

@router.get("/api/guides/search", response_model=list[PostOut])
def search_guides(
    q: Optional[str] = Query(None, description="Search text (matches title, content or location)"),
    category: Optional[str] = Query(None, description="One of: " + ", ".join(sorted(GUIDE_CATEGORIES))),
    db: Session = Depends(get_db),
):

    if category and category not in GUIDE_CATEGORIES:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid guide category. Must be one of: {', '.join(sorted(GUIDE_CATEGORIES))}",
        )

    query = db.query(Post).filter(Post.category.in_(GUIDE_CATEGORIES))

    if category:
        query = query.filter(Post.category == category)

    if q:
        like = f"%{q}%"
        query = query.filter(
            or_(
                Post.title.ilike(like),
                Post.content.ilike(like),
                Post.location.ilike(like),
                Post.category.ilike(like),
            )
        )

    return query.order_by(Post.created_at.desc()).all()


# ================= EXPERIENCE SEARCH =================


# ================= EXPERIENCE SEARCH =================
# GET /api/experience/search?q=camping&category=camping
# Same pattern as Guide Search — only ever searches within the experience
# categories (camping, trekking, nightlife, cafes, river_rafting,
# solo_trips, hidden_gems). General community/guide posts never show up here.

@router.get("/api/experience/search", response_model=list[PostOut])
def search_experiences(
    q: Optional[str] = Query(None, description="Search text (matches title, content or location)"),
    category: Optional[str] = Query(None, description="One of: " + ", ".join(sorted(EXPERIENCE_CATEGORIES))),
    db: Session = Depends(get_db),
):

    if category and category not in EXPERIENCE_CATEGORIES:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid experience category. Must be one of: {', '.join(sorted(EXPERIENCE_CATEGORIES))}",
        )

    query = db.query(Post).filter(Post.category.in_(EXPERIENCE_CATEGORIES))

    if category:
        query = query.filter(Post.category == category)

    if q:
        like = f"%{q}%"
        query = query.filter(
            or_(
                Post.title.ilike(like),
                Post.content.ilike(like),
                Post.location.ilike(like),
                Post.category.ilike(like),
            )
        )

    return query.order_by(Post.created_at.desc()).all()