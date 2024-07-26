from sqlmodel import Field, Relationship, SQLModel
from pydantic import EmailStr
from datetime import date
from typing import List


# Shared properties
class UserBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True)
    nom: str | None = None
    prenom: str | None = None
    birthday: date | None = None
    sexe: str | None = None
    is_active: bool = True
    is_superuser: bool = False


# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str


class UserCreateOpen(SQLModel):
    email: EmailStr
    password: str


# Properties to receive via API on update, all are optional
class UserUpdate(UserBase):
    email: EmailStr | None = None  # type: ignore
    password: str | None = None


class UserUpdateMe(SQLModel):
    nom: str | None = None
    prenom: str | None = None
    birthday: date | None = None
    sexe: str | None = None
    email: EmailStr | None = None


class UpdatePassword(SQLModel):
    current_password: str
    new_password: str


# Database model, database table inferred from class name
class User(UserBase, table=True):
    __tablename__ = "User"
    user_id: int | None = Field(default=None, primary_key=True)
    password: str


# Properties to return via API, id is always required
class UserOut(UserBase):
    user_id: int


class UsersOut(SQLModel):
    data: list[UserOut]
    count: int


# Shared properties
class MovieUserBase(SQLModel):
    movie_id: int
    note: int | None = None


# Properties to receive on item creation
class MovieUserCreate(MovieUserBase):
    movie_id: int
    note: int | None = None


# Database model, database table inferred from class name
class MovieUser(MovieUserBase, table=True):
    __tablename__ = "MovieUser"
    movie_id: int | None = Field(default=None, primary_key=True)
    user_id: int | None = Field(
        default=None, foreign_key="User.user_id", nullable=False
    )
    note: int | None = None


# Properties to return via API, id is always required
class MovieUserOut(MovieUserBase):
    movie_id: int | None = None
    note: int | None = None


class MovieUsersOut(SQLModel):
    data: list[MovieUserOut]
    count: int

class GenreUserBase(SQLModel):
    genre_id: int

# Properties to receive on item creation
class GenreUserCreate(GenreUserBase):
    genre_id: List[int]

class GenreUserUpdate(GenreUserBase):
    genre_ids: List[int]

# Database model, database table inferred from class name
class GenreUser(GenreUserBase, table=True):
    __tablename__ = "UserGenre"
    genre_id: int | None = Field(default=None, primary_key=True)
    user_id: int | None = Field(
        default=None, foreign_key="User.user_id", nullable=False
    )

# Properties to return via API, id is always required
class GenreUserOut(GenreUserBase):
    genre_id: int
    user_id: int


class GenreUsersOut(SQLModel):
    data: list[GenreUserOut]
    count: int

# Generic message
class Message(SQLModel):
    message: str


# JSON payload containing access token
class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"


# Contents of JWT token
class TokenPayload(SQLModel):
    sub: int | None = None


class NewPassword(SQLModel):
    token: str
    new_password: str
