from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, ConfigDict

# Categories that make a post show up in Guide Search (/api/guides/search).
# Anything else ("awareness", "scam", "thoughts", "tips", "other") is a
# regular community post and is excluded from guide results.
GUIDE_CATEGORIES = {
    "budget_guide",
    "safety_guide",
    "packing_list",
    "food_guide",
    "itinerary",
    "best_time",
}

ALL_CATEGORIES = GUIDE_CATEGORIES | {"awareness", "scam", "thoughts", "tips", "other"}


class PostCreate(BaseModel):
    user_id: int
    title: str = Field(min_length=1, max_length=150)
    content: str = Field(min_length=1, max_length=5000)
    location: Optional[str] = None
    category: str = "other"
    image_url: Optional[str] = None


class AuthorOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str


class PostOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    content: str
    location: Optional[str]
    category: str
    image_url: Optional[str] = None
    likes_count: int
    created_at: datetime
    author: AuthorOut