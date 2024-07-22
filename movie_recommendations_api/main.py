from typing import Any, Dict
from fastapi import Depends, FastAPI, HTTPException, Request
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from pydantic import BaseModel
from dotenv import load_dotenv
import os

from movie_recommendations_api import database, models
from movie_recommendations_api.recommendations import (
    GenreBasedRecommendationFetcher, MovieBasedRecommendationFetcher,
    TrendingRecommendationFetcher
)

load_dotenv() 
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

app = FastAPI()

models.Base.metadata.create_all(bind=database.engine)

class TokenData(BaseModel):
    user_id: int

async def get_current_user(request: Request) -> TokenData:
    token = request.headers.get("Authorization")
    if not token:
        raise HTTPException(status_code=403, detail="Not authenticated")
    token = token.split(" ")[1]  # Remove "Bearer" part
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=403, detail="Not authenticated")
        return TokenData(user_id=user_id)
    except JWTError:
        raise HTTPException(status_code=403, detail="Not authenticated")

@app.get("/recommendations/", response_model=Dict[str, Any])
async def get_recommendations(current_user: TokenData = Depends(get_current_user), db: Session = Depends(database.get_db)):
    user_id = current_user.user_id
    recommendations = {}

    not_seen_movie_ids = db.query(models.MovieUsers.movie_id).filter(models.MovieUsers.user_id != user_id).all()
    not_seen_movie_ids = [movie_id[0] for movie_id in not_seen_movie_ids]
    genre_fetcher = GenreBasedRecommendationFetcher()
    genre_recommendations = genre_fetcher.fetch(db, user_id, not_seen_movie_ids)
    trending_fetcher = TrendingRecommendationFetcher()
    trending_recommendations = trending_fetcher.fetch(db, not_seen_movie_ids)
    movie_fetcher = MovieBasedRecommendationFetcher()

    loved_movie_ids = db.query(models.MovieUsers.movie_id).filter(models.MovieUsers.user_id == user_id, models.MovieUsers.note >= 4).all()
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