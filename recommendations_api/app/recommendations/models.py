from datetime import date
from typing import List, Optional

from sqlalchemy import Date, Float, ForeignKey, Integer, String, BLOB
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
    release_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    budget: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    revenue: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    runtime: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    vote_average: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    vote_count: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    tagline: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    embeddings: Mapped[Optional[bytes]] = mapped_column(BLOB, nullable=True)

    genres: Mapped[List["MovieGenreAssociations"]] = relationship(
        "MovieGenreAssociations", back_populates="movie"
    )

    users: Mapped[List["UserMovieRatings"]] = relationship(
        "UserMovieRatings", back_populates="movie"
    )

    credits: Mapped[List["Credits"]] = relationship("Credits", back_populates="movie")


class Peoples(Base):
    __tablename__ = "Peoples"
    people_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=True)
    photo: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)

    credits: Mapped[List["Credits"]] = relationship("Credits", back_populates="people")


class Credits(Base):
    __tablename__ = "Credits"
    credit_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    id_people: Mapped[int] = mapped_column(ForeignKey("Peoples.people_id"))
    id_movie: Mapped[int] = mapped_column(ForeignKey("Movies.movie_id"))
    id_job: Mapped[int] = mapped_column(ForeignKey("Jobs.job_id"))
    character_name: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    cast_order: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)

    job: Mapped["Jobs"] = relationship("Jobs", overlaps="credits")
    movie: Mapped["Movies"] = relationship("Movies", overlaps="credits")
    people: Mapped["Peoples"] = relationship("Peoples", overlaps="credits")


class Jobs(Base):
    __tablename__ = "Jobs"
    job_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(255), nullable=True)

    credits: Mapped[List["Credits"]] = relationship("Credits", back_populates="job")


class Genres(Base):
    __tablename__ = "Genres"
    genre_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)

    moviegenresasociations: Mapped[List["MovieGenreAssociations"]] = relationship(
        "MovieGenreAssociations", back_populates="genre"
    )
    usergenrespreferences: Mapped[List["UserGenrePreferences"]] = relationship(
        "UserGenrePreferences", back_populates="genre"
    )


class MovieGenres(Base):
    __tablename__ = "MovieGenres"
    movie_id: Mapped[int] = mapped_column(
        ForeignKey("Movies.movie_id"), primary_key=True
    )
    genre_id: Mapped[int] = mapped_column(
        ForeignKey("Genres.genre_id"), primary_key=True
    )

    movie: Mapped["Movies"] = relationship("Movies", overlaps="genres")
    genre: Mapped["Genres"] = relationship("Genres", overlaps="moviegenres")


class MovieUsers(Base):
    __tablename__ = "MovieUsers"
    movie_id: Mapped[int] = mapped_column(
        ForeignKey("Movies.movie_id"), primary_key=True
    )
    user_id: Mapped[int] = mapped_column(ForeignKey("Users.user_id"), primary_key=True)
    note: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)

    movie: Mapped["Movies"] = relationship("Movies", overlaps="users")
    user: Mapped["Users"] = relationship("Users")


class Users(Base):
    __tablename__ = "Users"
    user_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    nom: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    prenom: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    birthday: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    sexe: Mapped[Optional[str]] = mapped_column(String(10), nullable=True)
    password: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    email: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)

    genres: Mapped[List["UserGenrePreferences"]] = relationship(
        "UserGenrePreferences", back_populates="user"
    )
    movies: Mapped[List["UserMovieRatings"]] = relationship(
        "UserMovieRatings", back_populates="user"
    )


class UserGenre(Base):
    __tablename__ = "UserGenre"
    genre_id: Mapped[int] = mapped_column(
        ForeignKey("Genres.genre_id"), primary_key=True
    )
    user_id: Mapped[int] = mapped_column(ForeignKey("Users.user_id"), primary_key=True)

    user: Mapped["Users"] = relationship("Users", overlaps="genres")
    genre: Mapped["Genres"] = relationship("Genres", overlaps="usergenres")


class MovieGenreAssociations(Base):
    __tablename__ = "MovieGenreAssociations"
    movie_id: Mapped[int] = mapped_column(
        ForeignKey("Movies.movie_id"), primary_key=True
    )
    genre_id: Mapped[int] = mapped_column(
        ForeignKey("Genres.genre_id"), primary_key=True
    )

    movie: Mapped["Movies"] = relationship("Movies", back_populates="genres")
    genre: Mapped["Genres"] = relationship(
        "Genres", back_populates="moviegenresasociations"
    )


class UserMovieRatings(Base):
    __tablename__ = "UserMovieRatings"
    movie_id: Mapped[int] = mapped_column(
        ForeignKey("Movies.movie_id"), primary_key=True
    )
    user_id: Mapped[int] = mapped_column(ForeignKey("Users.user_id"), primary_key=True)
    note: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)

    movie: Mapped["Movies"] = relationship("Movies", back_populates="users")
    user: Mapped["Users"] = relationship("Users", back_populates="movies")


class UserGenrePreferences(Base):
    __tablename__ = "UserGenrePreferences"
    genre_id: Mapped[int] = mapped_column(
        ForeignKey("Genres.genre_id"), primary_key=True
    )
    user_id: Mapped[int] = mapped_column(ForeignKey("Users.user_id"), primary_key=True)

    user: Mapped["Users"] = relationship("Users", back_populates="genres")
    genre: Mapped["Genres"] = relationship("Genres")
