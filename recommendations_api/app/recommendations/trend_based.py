from typing import Dict, List

from sqlalchemy.orm import Session

from . import models, schemas

from .base import RecommendationFetcher
from .config import CARROUSSEL_LENGTH


class TrendingRecommendationFetcher(RecommendationFetcher):
    """Fetches trending recommendations."""

    def fetch(
        self, db: Session, not_seen_movie_ids: List
    ) -> Dict[str, List[schemas.MovieSchema]]:
        """
        Recommends trending movies based on release date, number of votes, and average vote.

        This method fetches movies from the database that are trending based on their
        release date, vote count, and average vote.

        Args:
            user_id (int): The ID of the user for whom recommendations are being made.

        Returns:
            Dict[str, Any]: A dictionary containing recommended trending movies.
            If no recommendations are found, returns a message indicating no recommendations are available.
            If an error occurs, returns a message with the error description.
        """
        try:
            trending_movies = (
                db.query(models.Movies)
                .filter(models.Movies.movie_id.in_(not_seen_movie_ids))
                .order_by(
                    models.Movies.release_date.desc(),
                    models.Movies.vote_count.desc(),
                    models.Movies.vote_average.desc(),
                )
                .limit(CARROUSSEL_LENGTH)
                .all()
            )

            if not trending_movies:
                return {"message": "No trending movies available."}

            recommendations = {
                "trending_carousel": [
                    schemas.RecommendationSchema.from_orm(movie) for movie in trending_movies
                ]
            }

            return recommendations

        except Exception as e:
            return {"message": f"An error occurred: {str(e)}"}
