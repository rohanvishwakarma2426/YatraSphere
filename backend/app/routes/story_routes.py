from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.story_model import Story
from app.models.user_model import User
from app.schemas.story_schema import StoryCreate, StoryOut

router = APIRouter()

STORY_LIFETIME = timedelta(hours=24)


# ================= CREATE STORY =================
# Used by StoriesBar's "Your Story" upload. Image is uploaded first via
# POST /upload (existing endpoint), then the returned image_url is posted
# here.

@router.post("/stories", response_model=StoryOut)
def create_story(story: StoryCreate, db: Session = Depends(get_db)):

    author = db.query(User).filter(User.id == story.user_id).first()
    if not author:
        raise HTTPException(status_code=404, detail="User not found")

    now = datetime.now(timezone.utc)

    new_story = Story(
        user_id=story.user_id,
        image_url=story.image_url,
        expires_at=now + STORY_LIFETIME,
    )

    db.add(new_story)
    db.commit()
    db.refresh(new_story)

    return new_story


# ================= LIST ACTIVE STORIES =================
# Only stories younger than 24h — expired ones are simply excluded here,
# so the frontend never has to think about expiry itself.

@router.get("/stories", response_model=list[StoryOut])
def list_active_stories(db: Session = Depends(get_db)):

    now = datetime.now(timezone.utc)

    return (
        db.query(Story)
        .filter(Story.expires_at > now)
        .order_by(Story.created_at.desc())
        .all()
    )


# ================= DELETE STORY (manual remove) =================

@router.delete("/stories/{story_id}")
def delete_story(story_id: int, db: Session = Depends(get_db)):

    story = db.query(Story).filter(Story.id == story_id).first()
    if not story:
        raise HTTPException(status_code=404, detail="Story not found")

    db.delete(story)
    db.commit()

    return {"message": "Story deleted successfully"}
