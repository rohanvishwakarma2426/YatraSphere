from datetime import datetime
from pydantic import BaseModel, ConfigDict


class StoryCreate(BaseModel):
    user_id: int
    image_url: str


class StoryAuthorOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    avatar_url: str | None = None


class StoryOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    image_url: str
    created_at: datetime
    expires_at: datetime
    author: StoryAuthorOut
