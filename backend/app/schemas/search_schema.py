from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime


# ---------- DESTINATION ----------

class DestinationOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    city: str
    state: Optional[str] = None
    country: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    image: Optional[str] = None
    description: Optional[str] = None
    rating: Optional[float] = None
    created_at: Optional[datetime] = None


# ---------- EXPERIENCE ----------

class ExperienceOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    destination: Optional[str] = None
    category: str
    description: Optional[str] = None
    author: Optional[str] = None
    likes: int = 0
    created_at: Optional[datetime] = None


# ---------- GUIDE ----------

class GuideOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    destination: Optional[str] = None
    content: Optional[str] = None
    category: str
    author: Optional[str] = None
    reading_time: Optional[int] = None
    created_at: Optional[datetime] = None

class ExperienceCreate(BaseModel):
    title: str
    destination: str
    category: str
    description: str
    author: str = "Anonymous"