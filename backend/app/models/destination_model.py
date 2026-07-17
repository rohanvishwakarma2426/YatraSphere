from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func
from app.database.base import Base


class Destination(Base):
    __tablename__ = "destinations"

    id = Column(Integer, primary_key=True, index=True)

    # what the user searched for — lets us hit the cache on repeat searches
    query = Column(String, index=True)

    city = Column(String, index=True)
    state = Column(String, nullable=True)
    country = Column(String, nullable=True)

    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)

    image = Column(String, nullable=True)
    description = Column(String, nullable=True)
    rating = Column(Float, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())