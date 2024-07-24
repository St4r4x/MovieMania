from datetime import date
from typing import List, Optional
<<<<<<< HEAD
from sqlalchemy import Date, Float, ForeignKey, Integer, String, BLOB, Boolean, Column, UniqueConstraint
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

class Base(DeclarativeBase):
    pass

class Movies(Base):
    __tablename__ = "Movies"
    movie_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    overview: Mapped[Optional[str]] = mapped_column(String(5000), nullable=True)
    title: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    poster_path: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    backdrop_path: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
=======

from sqlalchemy import Date, Float, ForeignKey, Integer, String, BLOB
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
>>>>>>> origin/datacrawler
    release_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    budget: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    revenue: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    runtime: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    vote_average: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    vote_count: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    tagline: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
<<<<<<< HEAD
    adult = mapped_column(Boolean, nullable=False, default=False)
    embeddings: Mapped[Optional[bytes]] = mapped_column(BLOB, nullable=True)

    castings: Mapped[List["Castings"]] = relationship("Castings", back_populates="movie")
    crews: Mapped[List["Crews"]] = relationship("Crews", back_populates="movie")
    genres: Mapped[List["MovieGenres"]] = relationship("MovieGenres", back_populates="movie")
    similar_movies: Mapped[List["MoviesMovies"]] = relationship("MoviesMovies", foreign_keys="MoviesMovies.movie_id", back_populates="movie")
    users: Mapped[List["MovieUsers"]] = relationship("MovieUsers", back_populates="movie")
    credits: Mapped[List["Credits"]] = relationship("Credits", back_populates="movie")

class Job(Base):
    __tablename__ = "Job"
    id = Column(Integer, primary_key=True)
    title = Column(String(255), nullable=False)
    credits = relationship("Credits", back_populates="job")
    __table_args__ = (UniqueConstraint('title', name='_job_title_uc'),)

class People(Base):
    __tablename__ = "People"
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    photo = Column(String(255), nullable=True)
    credits = relationship("Credits", back_populates="people")
    __table_args__ = (UniqueConstraint('name', name='_people_name_uc'),)


class Credits(Base):
    __tablename__ = "Credits"
    credit_id = Column(Integer, primary_key=True)
    id_people = Column(Integer, ForeignKey("People.id"), nullable=False)
    id_job = Column(Integer, ForeignKey("Job.id"), nullable=False)
    id_movie = Column(Integer, ForeignKey("Movies.movie_id"), nullable=False)
    character_name = Column(String(255), nullable=True)
    cast_order = Column(Integer, nullable=True)
    movie = relationship("Movies", back_populates="credits")
    job = relationship("Job", back_populates="credits")
    people = relationship("People", back_populates="credits")
=======
    embeddings: Mapped[Optional[bytes]] = mapped_column(BLOB, nullable=True)

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

>>>>>>> origin/datacrawler

class Castings(Base):
    __tablename__ = "Castings"
    cast_id: Mapped[int] = mapped_column(Integer, primary_key=True)
<<<<<<< HEAD
    actor_name: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    character_name: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    movie_id: Mapped[int] = mapped_column(ForeignKey("Movies.movie_id"))
    movie: Mapped["Movies"] = relationship("Movies", back_populates="castings")

class Crews(Base):
    __tablename__ = "Crews"
    crew_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    person_name: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    role: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    movie_id: Mapped[int] = mapped_column(ForeignKey("Movies.movie_id"))
    movie: Mapped["Movies"] = relationship("Movies", back_populates="crews")

class Genres(Base):
    __tablename__ = "Genres"
    genre_id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=True)
    __table_args__ = (UniqueConstraint('name', name='_genre_name_uc'),)

class MovieGenres(Base):
    __tablename__ = "MovieGenres"
    movie_id: Mapped[int] = mapped_column(ForeignKey("Movies.movie_id"), primary_key=True)
    genre_id: Mapped[int] = mapped_column(ForeignKey("Genres.genre_id"), primary_key=True)
    movie: Mapped["Movies"] = relationship("Movies", back_populates="genres")
    genre: Mapped["Genres"] = relationship("Genres")

class MoviesMovies(Base):
    __tablename__ = "MoviesMovies"
    movie_id: Mapped[int] = mapped_column(ForeignKey("Movies.movie_id"), primary_key=True)
    movie_id_1: Mapped[int] = mapped_column(ForeignKey("Movies.movie_id"), primary_key=True)
    similarity_score: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    movie: Mapped["Movies"] = relationship("Movies", foreign_keys=[movie_id], back_populates="similar_movies")
    similar_movie: Mapped["Movies"] = relationship("Movies", foreign_keys=[movie_id_1])

class MovieUsers(Base):
    __tablename__ = "MovieUsers"
    movie_id: Mapped[int] = mapped_column(ForeignKey("Movies.movie_id"), primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("Users.user_id"), primary_key=True)
    note: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    movie: Mapped["Movies"] = relationship("Movies", back_populates="users")
    user: Mapped["Users"] = relationship("Users", back_populates="movies")

=======
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


>>>>>>> origin/datacrawler
class Users(Base):
    __tablename__ = "Users"
    user_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    nom: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    prenom: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    birthday: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
<<<<<<< HEAD
    sexe: Mapped[Optional[str]] = mapped_column(String(10), nullable=True)
    password: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    email: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    genres: Mapped[List["UserGenre"]] = relationship("UserGenre", back_populates="user")
    movies: Mapped[List["MovieUsers"]] = relationship("MovieUsers", back_populates="user")

class UserGenre(Base):
    __tablename__ = "UserGenre"
    genre_id: Mapped[int] = mapped_column(ForeignKey("Genres.genre_id"), primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("Users.user_id"), primary_key=True)
=======
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

>>>>>>> origin/datacrawler
    user: Mapped["Users"] = relationship("Users", back_populates="genres")
    genre: Mapped["Genres"] = relationship("Genres")
