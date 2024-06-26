from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import Movies
import crud

# Créer les tables dans la base de données
Base.metadata.create_all(bind=engine)

# Démarrer une session
db = SessionLocal()
print(db)

# Ajouter un nouveau film
new_movie = Movies(
    overview="A great movie",
    title="Movie Title",
    release_date="2024-01-01",
    budget=1000000,
    revenue=5000000,
    runtime=120,
    vote_average=8.5,
    vote_count=1000,
    tagline="An awesome tagline"
)
crud.create_movie(db, new_movie)

# Lire un film
movie = crud.get_movie(db, 1)
print(movie.title if movie else "Movie not found")

# Mettre à jour un film
updated_movie = crud.update_movie(db, 1, "New Movie Title")
print(updated_movie.title if updated_movie else "Movie not found")

# Supprimer un film
deleted_movie = crud.delete_movie(db, 1)
print(f"Deleted movie: {deleted_movie.title}" if deleted_movie else "Movie not found")

# Fermer la session
db.close()
