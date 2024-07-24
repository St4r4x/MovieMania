from datetime import date
from typing import List, Optional

<<<<<<< HEAD
from sqlalchemy import Date, Float, ForeignKey, Integer, String
=======
from sqlalchemy import Date, Float, ForeignKey, Integer, String, BLOB
>>>>>>> origin/datacrawler
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    pass


class Movies(Base):
    __tablename__ = "Movies"
    movie_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    overview: Mapped[Optional[str]] = mapped_column(
        String(5000), nullable=True)
    title: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    poster_path: Mapped[Optional[str]] = mapped_column(
        String(255), nullable=True)
    backdrop_path: Mapped[Optional[str]] = mapped_column(
        String(255), nullable=True)
    release_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    budget: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    revenue: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    runtime: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    vote_average: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    vote_count: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    tagline: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
<<<<<<< HEAD
=======
    embeddings: Mapped[Optional[bytes]] = mapped_column(BLOB, nullable=True)
>>>>>>> origin/datacrawler

    castings: Mapped[List["Castings"]] = relationship(
        "Castings", back_populates="movie")
    crews: Mapped[List["Crews"]] = relationship(
        "Crews", back_populates="movie")
    genres: Mapped[List["MovieGenres"]] = relationship(
        "MovieGenres", back_populates="movie")
    similar_movies: Mapped[List["MoviesMovies"]] = relationship(
        "MoviesMovies", foreign_keys="MoviesMovies.movie_id", back_populates="movie")
    users: Mapped[List["MovieUsers"]] = relationship(
        "MovieUsers", back_populates="movie")


class Castings(Base):
    __tablename__ = "Castings"
    cast_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    actor_name: Mapped[Optional[str]] = mapped_column(
        String(255), nullable=True)
    character_name: Mapped[Optional[str]] = mapped_column(
        String(255), nullable=True)
    movie_id: Mapped[int] = mapped_column(ForeignKey("Movies.movie_id"))

    movie: Mapped["Movies"] = relationship("Movies", back_populates="castings")


class Crews(Base):
    __tablename__ = "Crews"
    crew_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    person_name: Mapped[Optional[str]] = mapped_column(
        String(255), nullable=True)  # Spécifier la longueur de la chaîne
    role: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    movie_id: Mapped[int] = mapped_column(ForeignKey("Movies.movie_id"))

    movie: Mapped["Movies"] = relationship("Movies", back_populates="crews")


class Genres(Base):
    __tablename__ = "Genres"
    genre_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)


class MovieGenres(Base):
    __tablename__ = "MovieGenres"
    movie_id: Mapped[int] = mapped_column(
        ForeignKey("Movies.movie_id"), primary_key=True)
    genre_id: Mapped[int] = mapped_column(
        ForeignKey("Genres.genre_id"), primary_key=True)

    movie: Mapped["Movies"] = relationship("Movies", back_populates="genres")
    genre: Mapped["Genres"] = relationship("Genres")


class MoviesMovies(Base):
    __tablename__ = "MoviesMovies"
    movie_id: Mapped[int] = mapped_column(
        ForeignKey("Movies.movie_id"), primary_key=True)
    movie_id_1: Mapped[int] = mapped_column(
        ForeignKey("Movies.movie_id"), primary_key=True)
    similarity_score: Mapped[Optional[float]
                             ] = mapped_column(Float, nullable=True)

    movie: Mapped["Movies"] = relationship(
        "Movies", foreign_keys=[movie_id], back_populates="similar_movies")
    similar_movie: Mapped["Movies"] = relationship(
        "Movies", foreign_keys=[movie_id_1])


class MovieUsers(Base):
    __tablename__ = "MovieUsers"
    movie_id: Mapped[int] = mapped_column(
        ForeignKey("Movies.movie_id"), primary_key=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("Users.user_id"), primary_key=True)
    note: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)

    movie: Mapped["Movies"] = relationship("Movies", back_populates="users")
    user: Mapped["Users"] = relationship("Users", back_populates="movies")


class Users(Base):
    __tablename__ = "Users"
    user_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    nom: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    prenom: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    birthday: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    sexe: Mapped[Optional[str]] = mapped_column(
        String(10), nullable=True)
    password: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    email: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)

    genres: Mapped[List["UserGenre"]] = relationship(
        "UserGenre", back_populates="user")
    movies: Mapped[List["MovieUsers"]] = relationship(
        "MovieUsers", back_populates="user")


class UserGenre(Base):
    __tablename__ = "UserGenre"
    genre_id: Mapped[int] = mapped_column(
        ForeignKey("Genres.genre_id"), primary_key=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("Users.user_id"), primary_key=True)

    user: Mapped["Users"] = relationship("Users", back_populates="genres")
    genre: Mapped["Genres"] = relationship("Genres")
