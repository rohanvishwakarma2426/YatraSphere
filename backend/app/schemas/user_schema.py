from typing import Optional
from pydantic import BaseModel, EmailStr, Field


class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    avatar_url: Optional[str] = None
    bio: Optional[str] = None


# Used by PUT /users/{id} — profile edit (name/bio/avatar only, no password/email here)
class UserUpdate(BaseModel):
    name: Optional[str] = Field(default=None, min_length=1, max_length=80)
    bio: Optional[str] = Field(default=None, max_length=300)
    avatar_url: Optional[str] = None