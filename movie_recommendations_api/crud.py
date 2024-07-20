from sqlalchemy.orm import Session
from models import Movies, Users, Castings, Crews, Genres, MovieGenres, MoviesMovies, MovieUsers, UserGenre

# Fonction pour récupérer un film par son ID
def get_movie(db: Session, movie_id: int):
    return db.query(Movies).filter(Movies.movie_id == movie_id).first()

# Fonction pour récupérer plusieurs films avec pagination
def get_movies(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Movies).offset(skip).limit(limit).all()

# Fonction pour créer un nouveau film
def create_movie(db: Session, movie: Movies):
    db.add(movie)
    db.commit()
    db.refresh(movie)
    return movie

# Fonction pour mettre à jour le titre d'un film
def update_movie(db: Session, movie_id: int, title: str):
    movie = db.query(Movies).filter(Movies.movie_id == movie_id).first()
    if movie:
        movie.title = title
        db.commit()
        db.refresh(movie)
    return movie

# Fonction pour supprimer un film par son ID
def delete_movie(db: Session, movie_id: int):
    movie = db.query(Movies).filter(Movies.movie_id == movie_id).first()
    if movie:
        db.delete(movie)
        db.commit()
    return movie

# Fonctions CRUD pour l'entité Users
def get_user(db: Session, user_id: int):
    return db.query(Users).filter(Users.user_id == user_id).first()

def get_users(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Users).offset(skip).limit(limit).all()

def create_user(db: Session, user: Users):
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def update_user(db: Session, user_id: int, nom: str, prenom: str):
    user = db.query(Users).filter(Users.user_id == user_id).first()
    if user:
        user.nom = nom
        user.prenom = prenom
        db.commit()
        db.refresh(user)
    return user

def delete_user(db: Session, user_id: int):
    user = db.query(Users).filter(Users.user_id == user_id).first()
    if user:
        db.delete(user)
        db.commit()
    return user
