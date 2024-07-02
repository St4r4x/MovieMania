from typing import Dict, List
from sqlalchemy.orm import Session
from .base import RecommendationFetcher
from .. import models, schemas

class GenreBasedRecommendationFetcher(RecommendationFetcher):
    """Fetches recommendations based on user's preferred genres."""

    def fetch(self, db: Session, user_id: int) -> Dict[str, List[dict]]:
        # Fetch the preferred genres of the user
        preferred_genres = db.query(models.Genres.name).join(
            models.UserGenre).filter(models.UserGenre.user_id == user_id).all()
        preferred_genres = [genre[0] for genre in preferred_genres]

        recommendations = {}
        for genre in preferred_genres:
            # Fetch movies that belong to the preferred genre
            movies = db.query(models.Movies).join(
                models.MovieGenres, models.Movies.movie_id == models.MovieGenres.movie_id
            ).join(
                models.Genres, models.MovieGenres.genre_id == models.Genres.genre_id
            ).filter(
                models.Genres.name == genre
            ).all()
            recommendations[f"{genre}_carousel"] = [
                schemas.Movie.model_validate(movie) for movie in movies]


        return recommendations
