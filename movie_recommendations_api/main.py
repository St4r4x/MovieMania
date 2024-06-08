# Initialize FastAPI app
from abc import ABC, abstractmethod
from typing import Dict, List

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from . import database, models, schemas

# Initialize FastAPI app
app = FastAPI()

# Create database tables
# models.Base.metadata.create_all(bind=database.engine)

# FastAPI endpoint for fetching recommendations


@app.get("/recommendations/{user_id}", response_model=Dict[str, List[schemas.Movie]])
async def get_recommendations(user_id: int, db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Fetch user preferences
    preferred_genres = db.query(models.Type.name).join(
        models.PrefType).filter(models.PrefType.id_users == user_id).all()
    preferred_genres = [genre[0] for genre in preferred_genres]

    # Fetch movie recommendations based on user preferences
    recommendations = {}
    for genre in preferred_genres:
        movies = db.query(models.Movie).join(
            models.Type).filter(models.Type.name == genre).all()
        recommendations[f"{genre}_carousel"] = [
            schemas.Movie.model_validate(movie) for movie in movies]

    # Fetch trending recommendations
    trending_movies = db.query(models.Movie).order_by(models.Movie.release_date.desc(
    ), models.Movie.people_notation.desc(), models.Movie.press_notation.desc()).limit(10).all()
    recommendations["trending_carousel"] = [
        schemas.Movie.model_validate(movie) for movie in trending_movies]

    # Fetch movie-based recommendations
    movie_based_recommendations = {}
    for genre in preferred_genres:
        movies = db.query(models.Movie).join(
            models.Type).filter(models.Type.name == genre).all()
        for movie in movies:
            similar_movies = db.query(models.Movie).join(models.Type).filter(
                models.Type.name == genre, models.Movie.id != movie.id).all()
            movie_based_recommendations[f"You like {movie.title}, you must like these movies"] = [
                schemas.Movie.model_validate(similar_movie) for similar_movie in similar_movies]

    recommendations.update(movie_based_recommendations)

    return recommendations

# Abstract base class for fetching recommendations


class RecommendationFetcher(ABC):
    """Abstract base class for fetching recommendations."""

    @abstractmethod
    def fetch(self, db: Session, user_id: int) -> Dict[str, List[dict]]:
        """Fetch recommendations.

        Args:
            db (Session): Database session.
            user_id (int): User ID.

        Returns:
            Dict[str, List[dict]]: Recommendations.
        """
        pass

# Fetches recommendations based on user's preferred genres


class GenreBasedRecommendationFetcher(RecommendationFetcher):
    """Fetches recommendations based on user's preferred genres."""

    def fetch(self, db: Session, user_id: int) -> Dict[str, List[dict]]:
        """Fetch recommendations based on user's preferred genres.

        Args:
            db (Session): Database session.
            user_id (int): User ID.

        Returns:
            Dict[str, List[dict]]: Recommendations.
        """
        preferred_genres = db.query(models.Type.name).join(
            models.PrefType).filter(models.PrefType.id_users == user_id).all()
        preferred_genres = [genre[0] for genre in preferred_genres]

        recommendations = {}
        for genre in preferred_genres:
            movies = db.query(models.Movie).join(
                models.Type).filter(models.Type.name == genre).all()
            recommendations[f"{genre}_carousel"] = [
                schemas.Movie.model_validate(movie) for movie in movies]

        return recommendations

# Fetches trending recommendations


class TrendingRecommendationFetcher(RecommendationFetcher):
    """Fetches trending recommendations."""

    def fetch(self, db: Session, user_id: int) -> Dict[str, List[dict]]:
        """Fetch trending recommendations.

        Args:
            db (Session): Database session.
            user_id (int): User ID.

        Returns:
            Dict[str, List[dict]]: Recommendations.
        """
        trending_movies = db.query(models.Movie).order_by(models.Movie.release_date.desc(
        ), models.Movie.people_notation.desc(), models.Movie.press_notation.desc()).limit(10).all()
        recommendations = {"trending_carousel": [
            schemas.Movie.model_validate(movie) for movie in trending_movies]}

        return recommendations

# Fetches recommendations based on movies similar to those the user likes


class MovieBasedRecommendationFetcher(RecommendationFetcher):
    """Fetches recommendations based on movies similar to those the user likes."""

    def fetch(self, db: Session, user_id: int) -> Dict[str, List[dict]]:
        """Fetch recommendations based on movies similar to those the user likes.

        Args:
            db (Session): Database session.
            user_id (int): User ID.

        Returns:
            Dict[str, List[dict]]: Recommendations.
        """
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

# Function to fetch all types of recommendations


def fetch_recommendations(db: Session, user_id: int) -> Dict[str, List[dict]]:
    """Fetch all types of recommendations.

    Args:
        db (Session): Database session.
        user_id (int): User ID.

    Returns:
        Dict[str, List[dict]]: Recommendations.
    """
    fetchers = [GenreBasedRecommendationFetcher(
    ), TrendingRecommendationFetcher(), MovieBasedRecommendationFetcher()]
    recommendations = {}
    for fetcher in fetchers:
        recommendations.update(fetcher.fetch(db, user_id))

    return recommendations
