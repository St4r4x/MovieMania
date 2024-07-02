from typing import Dict, List
from sqlalchemy.orm import Session
from .base import RecommendationFetcher
from .. import models, schemas

class GenreBasedRecommendationFetcher(RecommendationFetcher):
    """Fetches recommendations based on user's preferred genres."""

    def fetch(self, db: Session, user_id: int) -> Dict[str, List[schemas.Movie]]:
        # Fetch the preferred genres of the user
        preferred_genres = db.query(models.Genres.name).join(
            models.UserGenre).filter(models.UserGenre.user_id == user_id).all()
        preferred_genres = [genre[0] for genre in preferred_genres]

        recommendations = {}
        for genre in preferred_genres:
            # Fetch the top 10 movies that belong to the preferred genre, sorted by vote_average
            movies = db.query(models.Movies).join(
                models.MovieGenres, models.Movies.movie_id == models.MovieGenres.movie_id
            ).join(
                models.Genres, models.MovieGenres.genre_id == models.Genres.genre_id
            ).filter(
                models.Genres.name == genre
            ).order_by(
                models.Movies.vote_average.desc()
            ).limit(10).all()
            
            recommendations[f'genre_{genre}'] = [
                schemas.Movie.from_orm(movie) for movie in movies
            ]

        return recommendations
