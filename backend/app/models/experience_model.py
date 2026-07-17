from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.database.base import Base


class Experience(Base):
    __tablename__ = "experiences"

    id = Column(Integer, primary_key=True, index=True)

    # what the user searched for — lets us hit the cache on repeat searches
    query = Column(String, index=True)

    title = Column(String, index=True)
    destination = Column(String, nullable=True)
    category = Column(String, index=True)  # Camping, Trekking, Nightlife, Cafes, River Rafting, Solo Trips, Hidden Gems
    description = Column(String, nullable=True)
    author = Column(String, nullable=True)
    likes = Column(Integer, default=0)

    created_at = Column(DateTime(timezone=True), server_default=func.now())