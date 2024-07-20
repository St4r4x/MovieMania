from typing import Dict, List
from sqlalchemy.orm import Session
from .base import RecommendationFetcher
from .. import models, schemas

class MovieBasedRecommendationFetcher(RecommendationFetcher):
    """Fetches recommendations based on movies similar to those the user likes."""

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
