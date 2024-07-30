from datetime import date
from typing import  Optional
from pydantic import BaseModel

class Movie(BaseModel):
    movie_id: int
    title: str
    release_date: Optional[date] = None
    budget: Optional[float] = None
    revenue: Optional[float] = None
    runtime: Optional[int] = None
    vote_average: Optional[float] = None
    vote_count: Optional[int] = None
    tagline: Optional[str] = None
    overview: Optional[str] = None
    poster_path: Optional[str] = None
    backdrop_path: Optional[str] = None


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

class GenreSchema(BaseModel):
    genre_id: int
    name: str

    class Config:
        orm_mode = True
        from_attributes = True

class CreditSchema(BaseModel):
    credit_id: int
    id_movie: int
    id_people: int
    id_job: int
    character_name: Optional[str]  # Add this line
    role: Optional[str]

    class Config:
        orm_mode = True
        from_attributes = True