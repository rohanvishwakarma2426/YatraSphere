from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.database.connection import get_db
from app.models.post_model import Post
from app.models.user_model import User
from app.schemas.post_schema import PostCreate, PostOut, GUIDE_CATEGORIES, ALL_CATEGORIES

router = APIRouter()


# ================= CREATE POST =================
# Used by the "Share Experience" form. If the post's category is one of the
# guide categories, it automatically becomes searchable via /api/guides/search
# — guides are just community posts, there's no separate guides table.

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
    )

    db.add(new_post)
    db.commit()
    db.refresh(new_post)

    return new_post


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
# Only ever searches within the guide categories — general community posts
# (awareness/scam/thoughts/tips/other) never show up here.

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
            )
        )

    return query.order_by(Post.created_at.desc()).all()