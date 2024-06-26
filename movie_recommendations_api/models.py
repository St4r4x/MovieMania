from typing import List, Optional
from datetime import date
from sqlalchemy import ForeignKey
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

class Base(DeclarativeBase):
    pass

class Movies(Base):
    __tablename__ = "Movies"
    movie_id: Mapped[int] = mapped_column(primary_key=True)
    overview: Mapped[Optional[str]]
    title: Mapped[Optional[str]]
    release_date: Mapped[Optional[date]]
    budget: Mapped[Optional[float]]
    revenue: Mapped[Optional[float]]
    runtime: Mapped[Optional[float]]
    vote_average: Mapped[Optional[float]]
    vote_count: Mapped[Optional[int]]
    tagline: Mapped[Optional[str]]

    castings: Mapped[List["Castings"]] = relationship(back_populates="movie")
    crews: Mapped[List["Crews"]] = relationship(back_populates="movie")
    genres: Mapped[List["MovieGenres"]] = relationship(back_populates="movie")
    similar_movies: Mapped[List["MoviesMovies"]] = relationship(back_populates="movie")
    users: Mapped[List["MovieUsers"]] = relationship(back_populates="movie")

class Castings(Base):
    __tablename__ = "Castings"
    cast_id: Mapped[int] = mapped_column(primary_key=True)
    actor_name: Mapped[Optional[str]]
    character_name: Mapped[Optional[str]]
    movie_id: Mapped[int] = mapped_column(ForeignKey("Movies.movie_id"))

    movie: Mapped["Movies"] = relationship(back_populates="castings")

class Crews(Base):
    __tablename__ = "Crews"
    crew_id: Mapped[int] = mapped_column(primary_key=True)
    person_name: Mapped[Optional[str]]
    role: Mapped[Optional[str]]
    movie_id: Mapped[int] = mapped_column(ForeignKey("Movies.movie_id"))

    movie: Mapped["Movies"] = relationship(back_populates="crews")

class Genres(Base):
    __tablename__ = "Genres"
    genre_id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[Optional[str]]

class MovieGenres(Base):
    __tablename__ = "MovieGenres"
    movie_id: Mapped[int] = mapped_column(ForeignKey("Movies.movie_id"), primary_key=True)
    genre_id: Mapped[int] = mapped_column(ForeignKey("Genres.genre_id"), primary_key=True)

    movie: Mapped["Movies"] = relationship(back_populates="genres")
    genre: Mapped["Genres"] = relationship()

class MoviesMovies(Base):
    __tablename__ = "MoviesMovies"
    movie_id: Mapped[int] = mapped_column(ForeignKey("Movies.movie_id"), primary_key=True)
    movie_id_1: Mapped[int] = mapped_column(ForeignKey("Movies.movie_id"), primary_key=True)
    similarity_score: Mapped[Optional[float]]

    movie: Mapped["Movies"] = relationship(foreign_keys=[movie_id], back_populates="similar_movies")
    similar_movie: Mapped["Movies"] = relationship(foreign_keys=[movie_id_1])

class MovieUsers(Base):
    __tablename__ = "MovieUsers"
    movie_id: Mapped[int] = mapped_column(ForeignKey("Movies.movie_id"), primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("Users.user_id"), primary_key=True)
    note: Mapped[Optional[str]]

    movie: Mapped["Movies"] = relationship(back_populates="users")
    user: Mapped["Users"] = relationship()

class Users(Base):
    __tablename__ = "Users"
    user_id: Mapped[int] = mapped_column(primary_key=True)
    nom: Mapped[Optional[str]]
    prenom: Mapped[Optional[str]]
    age: Mapped[Optional[int]]
    sexe: Mapped[Optional[str]]
    password: Mapped[Optional[str]]
    email: Mapped[Optional[str]]

    genres: Mapped[List["UserGenre"]] = relationship(back_populates="user")
    movies: Mapped[List["MovieUsers"]] = relationship(back_populates="user")

class UserGenre(Base):
    __tablename__ = "UserGenre"
    genre_id: Mapped[int] = mapped_column(ForeignKey("Genres.genre_id"), primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("Users.user_id"), primary_key=True)

    user: Mapped["Users"] = relationship(back_populates="genres")
    genre: Mapped["Genres"] = relationship()
