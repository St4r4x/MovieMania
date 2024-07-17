import numpy as np
import pickle
from sqlalchemy.orm import Session, sessionmaker
from models import Movies
from database import engine

class MovieRecommender:
    """A class to recommend similar movies based on embeddings.

    Attributes:
        db_session (Session): A SQLAlchemy session for database operations.
    """

    def __init__(self, db_session: Session):
        """Initializes the MovieRecommender with a database session.

        Args:
            db_session (Session): A SQLAlchemy session for database operations.
        """
        self.db_session = db_session

    def distance_euclidienne(self, vecteur1: np.ndarray, vecteur2: np.ndarray) -> float:
        """Calculates the Euclidean distance between two vectors.

        Args:
            vecteur1 (np.ndarray): The first vector.
            vecteur2 (np.ndarray): The second vector.

        Returns:
            float: The Euclidean distance between vecteur1 and vecteur2.
        """
        return np.linalg.norm(vecteur1 - vecteur2)

    def similar_movies(self, id_film_cible: int) -> list:
        """Finds the 10 most similar movies to a target movie.

        Args:
            id_film_cible (int): The target movie's ID.

        Returns:
            list: A list of tuples containing the titles and distances of the 10 closest movies.
        """
        # Retrieve the target movie and all other movies
        film_cible = self.db_session.query(Movies).filter(Movies.movie_id == id_film_cible).first()
        if not film_cible or not film_cible.embeddings:
            return "Target movie not found or without embeddings."
        film_cible_embedding = pickle.loads(film_cible.embeddings)

        autres_films = self.db_session.query(Movies).filter(Movies.movie_id != id_film_cible).all()

        distances = []
        for film in autres_films:
            if film.embeddings:
                embedding = pickle.loads(film.embeddings)
                dist = self.distance_euclidienne(film_cible_embedding, embedding)
                distances.append((film.title, dist))

        # Sort movies by ascending distance
        distances.sort(key=lambda x: x[1])

        # Return the titles of the 10 closest movies
        return distances[:10]

# Example usage
if __name__ == "__main__":
    SessionLocal = sessionmaker(bind=engine)
    db_session = SessionLocal()

    recommender = MovieRecommender(db_session)
    id_film_cible = 19  # Assuming this is the target movie ID
    films_proches = recommender.similar_movies(id_film_cible)
    print(films_proches)

    # Don't forget to close the session after use
    db_session.close()