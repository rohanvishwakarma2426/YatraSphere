from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from app.database.base import Base


class Story(Base):
    __tablename__ = "stories"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    image_url = Column(String, nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    # Set at creation time = created_at + 24h. Stories past this are just
    # filtered out of GET /stories — no cleanup job needed, they simply
    # stop showing up (and can be swept from the table later if desired).
    expires_at = Column(DateTime(timezone=True), nullable=False)

    author = relationship("User")
