from typing import Any, Dict

from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session
from .models import MovieUsers
from movie_recommendations_api import database, models
from movie_recommendations_api.recommendations import (
    GenreBasedRecommendationFetcher, MovieBasedRecommendationFetcher,
    TrendingRecommendationFetcher)

app = FastAPI()

models.Base.metadata.create_all(bind=database.engine)


@app.get("/recommendations/{user_id}", response_model=Dict[str, Any])
async def get_recommendations(user_id: int, db: Session = Depends(database.get_db)):
    recommendations = {}

    not_seen_movie_ids = db.query(models.MovieUsers.movie_id).filter(MovieUsers.user_id != user_id).all()
    not_seen_movie_ids = [movie_id[0] for movie_id in not_seen_movie_ids]
    genre_fetcher = GenreBasedRecommendationFetcher()
    genre_recommendations = genre_fetcher.fetch(db, user_id, not_seen_movie_ids)
    trending_fetcher = TrendingRecommendationFetcher()
    trending_recommendations = trending_fetcher.fetch(db,not_seen_movie_ids)
    movie_fetcher = MovieBasedRecommendationFetcher()

    loved_movie_ids = db.query(models.MovieUsers.movie_id).filter(MovieUsers.user_id == user_id, MovieUsers.note >= 4).all()
    loved_movie_ids = [movie_id[0] for movie_id in loved_movie_ids]
    for key, value in genre_recommendations.items():
        recommendations[key] = value
    for key, value in trending_recommendations.items():
        recommendations[key] = value
    for movie_id in loved_movie_ids:
        movie_recommendations = movie_fetcher.fetch(movie_id, db, not_seen_movie_ids)
        for key, value in movie_recommendations.items():
            recommendations[key] = value


    return recommendations
