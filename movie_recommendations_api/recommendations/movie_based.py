from typing import Dict, List
from sqlalchemy.orm import Session
from .base import RecommendationFetcher
from .. import models, schemas
<<<<<<< HEAD
=======
from .config import CARROUSSEL_LENGTH
import numpy as np
import pickle
from sqlalchemy.exc import NoResultFound

>>>>>>> origin/datacrawler

class MovieBasedRecommendationFetcher(RecommendationFetcher):
    """Fetches recommendations based on movies similar to those the user likes."""

<<<<<<< HEAD
    def fetch(self, db: Session, user_id: int) -> Dict[str, List[dict]]:
        preferred_genres = db.query(models.Type.name).join(
            models.PrefType).filter(models.PrefType.id_users == user_id).all()
        preferred_genres = [genre[0] for genre in preferred_genres]

        recommendations = {}
        for genre in preferred_genres:
            movies = db.query(models.Movie).join(
                models.Type).filter(models.Type.name == genre).all()
            for movie in movies:
                similar_movies = db.query(models.Movie).join(models.Type).filter(
                    models.Type.name == genre, models.Movie.id != movie.id).all()
                recommendations[f"You like {movie.title}, you must like these movies"] = [
                    schemas.Movie.model_validate(similar_movie) for similar_movie in similar_movies]

        return recommendations
=======
    def fetch(self, id_movie: int, db: Session, not_seen_movie_ids: List) -> Dict[str, List[dict]]:
            """
            Fetches movie recommendations based on a target movie.

            Args:
                id_movie (int): The ID of the target movie.
                db (Session): The database session.
                not_seen_movie_ids (List): A list of movie IDs that the user has not seen.

            Returns:
                Dict[str, List[dict]]: A dictionary containing the movie recommendations. The keys are the title of the target movie and the values are lists of recommended movies.

            Raises:
                NoResultFound: If the target movie is not found in the database.
                Exception: If any other error occurs during the recommendation process.
            """
            try:
                target_movie = db.query(models.Movies).filter(models.Movies.movie_id == id_movie).first()
                if not target_movie or not target_movie.embeddings:
                    return {"message": "Target movie not found or without embeddings."}
                target_movie_embedding = pickle.loads(target_movie.embeddings)

                movie_distances = []
                for movie in db.query(models.Movies).filter(models.Movies.movie_id.in_(not_seen_movie_ids)).all():
                    if movie.embeddings:
                        embedding = pickle.loads(movie.embeddings)
                        dist = self.distance_euclidean(target_movie_embedding, embedding)
                        movie_distances.append((movie, dist))

                # Sort by distance and limit to the first CARROUSSEL_LENGTH movies
                movie_distances.sort(key=lambda x: x[1])
                limited_movies = movie_distances[:CARROUSSEL_LENGTH]

                recommendations = {}
                if limited_movies:
                    recommendations[f'movie_{target_movie.title}'] = [
                        schemas.Movie.from_orm(movie[0]) for movie in limited_movies
                    ]
                    return recommendations
                else:
                    return {"message": "No recommendations available."}

            except NoResultFound:
                return {"message": "User not found."}
            except Exception as e:
                return {"message": f"An error occurred: {str(e)}"}

    def distance_euclidean(self, vector1: np.ndarray, vector2: np.ndarray) -> float:
        """Calculates the Euclidean distance between two vectors.

        Args:
            vector1 (np.ndarray): The first vector.
            vector2 (np.ndarray): The second vector.

        Returns:
            float: The Euclidean distance between vector1 and vector2.
        """
        return np.linalg.norm(vector1 - vector2)
>>>>>>> origin/datacrawler
