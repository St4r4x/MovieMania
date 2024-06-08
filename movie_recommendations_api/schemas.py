from datetime import date
from typing import List

from pydantic import BaseModel


class MovieBase(BaseModel):
    title: str
    release_date: date
    press_notation: float
    people_notation: float

    class Config:
        from_attributes = True


class MovieCreate(MovieBase):
    pass


class Movie(MovieBase):
    id: int
    types: List[str]

    class Config:
        orm_mode = True
        from_attributes = True


class UserBase(BaseModel):
    email: str
    username: str
    birthday: date

    class Config:
        from_attributes = True


class UserCreate(UserBase):
    pass


class User(UserBase):
    id: int

    class Config:
        orm_mode = True
        from_attributes = True


class Recommendation(BaseModel):
    movie_id: int
    title: str
    genre: str

    class Config:
        from_attributes = True
