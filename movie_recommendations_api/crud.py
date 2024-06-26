from sqlalchemy.orm import Session
from models import Movies, Users, Castings, Crews, Genres, MovieGenres, MoviesMovies, MovieUsers, UserGenre

def get_movie(db: Session, movie_id: int):
    return db.query(Movies).filter(Movies.movie_id == movie_id).first()

def get_movies(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Movies).offset(skip).limit(limit).all()

def create_movie(db: Session, movie: Movies):
    db.add(movie)
    db.commit()
    db.refresh(movie)
    return movie

def update_movie(db: Session, movie_id: int, title: str):
    movie = db.query(Movies).filter(Movies.movie_id == movie_id).first()
    if movie:
        movie.title = title
        db.commit()
        db.refresh(movie)
    return movie

def delete_movie(db: Session, movie_id: int):
    movie = db.query(Movies).filter(Movies.movie_id == movie_id).first()
    if movie:
        db.delete(movie)
        db.commit()
    return movie