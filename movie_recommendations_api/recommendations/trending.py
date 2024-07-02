from typing import Dict, List
from sqlalchemy.orm import Session
from .base import RecommendationFetcher
from .. import models, schemas

class TrendingRecommendationFetcher(RecommendationFetcher):
    """Fetches trending recommendations."""

    def fetch(self, db: Session, user_id: int) -> Dict[str, List[dict]]:
        trending_movies = db.query(models.Movie).order_by(models.Movie.release_date.desc(
        ), models.Movie.people_notation.desc(), models.Movie.press_notation.desc()).limit(10).all()
        recommendations = {"trending_carousel": [
            schemas.Movie.model_validate(movie) for movie in trending_movies]}

        return recommendations
