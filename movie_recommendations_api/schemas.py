from datetime import date
from typing import  Optional
from pydantic import BaseModel

<<<<<<< HEAD
class UserBase(BaseModel):
    email: str
    username: str
    birthday: date

    class Config:
        orm_mode = True
        from_attributes = True

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int

    class Config:
        orm_mode = True
        from_attributes = True

class MovieBase(BaseModel):
=======
class Movie(BaseModel):
    movie_id: int
>>>>>>> origin/datacrawler
    title: str
    release_date: Optional[date] = None
    budget: Optional[float] = None
    revenue: Optional[float] = None
    runtime: Optional[int] = None
    vote_average: Optional[float] = None
    vote_count: Optional[int] = None
    tagline: Optional[str] = None
<<<<<<< HEAD
=======
    overview: Optional[str] = None
    poster_path: Optional[str] = None
    backdrop_path: Optional[str] = None

>>>>>>> origin/datacrawler

    class Config:
        orm_mode = True
        from_attributes = True

<<<<<<< HEAD
class MovieCreate(MovieBase):
    pass

class Movie(MovieBase):
    movie_id: int

    class Config:
        orm_mode = True
        from_attributes = True
=======
>>>>>>> origin/datacrawler

class Recommendation(BaseModel):
    movie_id: int
    title: str
    genre: str

    class Config:
        orm_mode = True
        from_attributes = True
