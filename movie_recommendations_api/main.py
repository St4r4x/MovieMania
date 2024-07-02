from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict
from movie_recommendations_api import models, schemas, database
from movie_recommendations_api.recommendations import GenreBasedRecommendationFetcher, TrendingRecommendationFetcher, MovieBasedRecommendationFetcher

app = FastAPI()

models.Base.metadata.create_all(bind=database.engine)
@app.get("/recommendations/{user_id}", response_model=Dict[str, List[schemas.Movie]])
async def get_recommendations(user_id: int, db: Session = Depends(database.get_db)):
    user = db.query(models.Users).filter(models.Users.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    print(f"Fetching recommendations for user {user_id}")
    # Fetch recommendations
    genre_fetcher = GenreBasedRecommendationFetcher()
    trending_fetcher = TrendingRecommendationFetcher()
    movie_based_fetcher = MovieBasedRecommendationFetcher()

    recommendations = {}
    recommendations.update(genre_fetcher.fetch(db, user_id))
    #recommendations.update(trending_fetcher.fetch(db, user_id))
    #recommendations.update(movie_based_fetcher.fetch(db, user_id))

    return recommendations