from datetime import date
from typing import List, Optional
from pydantic import BaseModel

class Config:
    orm_mode = True
    from_attributes = True

class UserBase(BaseModel):
    email: str
    username: str
    birthday: date

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int

    class Config:
        orm_mode = True
        from_attributes = True

class MovieBase(BaseModel):
    title: str
    release_date: Optional[date] = None
    budget: Optional[float] = None
    revenue: Optional[float] = None
    runtime: Optional[int] = None
    vote_average: Optional[float] = None
    vote_count: Optional[int] = None
    tagline: Optional[str] = None

class MovieCreate(MovieBase):
    pass

class Movie(MovieBase):
    id: int

    class Config:
        orm_mode = True
        from_attributes = True

class Recommendation(BaseModel):
    movie_id: int
    title: str
    genre: str

    class Config:
        orm_mode = True
        from_attributes = True
