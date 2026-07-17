from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from app.database.base import Base


class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    location = Column(String, nullable=True)

    # "awareness" | "scam" | "thoughts" | "tips" | "other"  <- general community posts
    # "budget_guide" | "safety_guide" | "packing_list" | "food_guide" | "itinerary" | "best_time"  <- guide posts
    category = Column(String, nullable=False, default="other")

    image_url = Column(String, nullable=True)

    likes_count = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    author = relationship("User")