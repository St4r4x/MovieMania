from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, Movies
from database import engine, SessionLocal

# Créer un film exemple
def add_example_movie():
    # Créer une session de base de données
    db = SessionLocal()
    
    try:
        # Créer un film exemple
        new_movie = Movies(
            overview="An example overview",
            title="Example Movie",
            release_date="2023-06-01",
            budget=1000000,
            revenue=5000000,
            runtime=120,
            vote_average=7.5,
            vote_count=100,
            tagline="An example tagline"
        )
        
        # Ajouter le film à la base de données
        db.add(new_movie)
        db.commit()
        db.refresh(new_movie)
        
        print("Created Movie:", new_movie)
    except Exception as e:
        db.rollback()
        print(f"An error occurred: {e}")
    finally:
        # Fermer la session de base de données
        db.close()

if __name__ == "__main__":
    add_example_movie()