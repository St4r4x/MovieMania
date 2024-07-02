from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from typing import Any, Dict
from movie_recommendations_api import models, schemas, database
from movie_recommendations_api.recommendations import GenreBasedRecommendationFetcher, TrendingRecommendationFetcher, MovieBasedRecommendationFetcher

app = FastAPI()

models.Base.metadata.create_all(bind=database.engine)
@app.get("/recommendations/{user_id}", response_model=Dict[str, Any])
async def get_recommendations(user_id: int, db: Session = Depends(database.get_db)):
    recommendations = {}
    genre_fetcher = GenreBasedRecommendationFetcher()

    genre_recommendations = genre_fetcher.fetch(db, user_id)
    for key, value in genre_recommendations.items():
        recommendations[key] = value
    
    return recommendations