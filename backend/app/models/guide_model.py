from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.database.base import Base


class Guide(Base):
    __tablename__ = "guides"

    id = Column(Integer, primary_key=True, index=True)

    # what the user searched for — lets us hit the cache on repeat searches
    query = Column(String, index=True)

    title = Column(String, index=True)
    destination = Column(String, nullable=True)
    content = Column(String, nullable=True)
    category = Column(String, index=True)  # Budget Guides, Safety Guides, Packing Lists, Food Guides, Itineraries, Best Time to Visit
    author = Column(String, nullable=True)
    reading_time = Column(Integer, nullable=True)  # in minutes

    created_at = Column(DateTime(timezone=True), server_default=func.now())