from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    role: str
    status: str

class User(BaseModel):
    id: str
    name: str
    email: EmailStr
    role: str
    status: str
    profile_picture: Optional[str]
    created_at: str
