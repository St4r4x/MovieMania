from typing import Any, Dict, List, Optional
from fastapi import Depends, FastAPI, HTTPException, Request,Query
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

def movie_to_dict(movie: models.Movies) -> Dict[str, Any]:
    return {
        "movie_id": movie.movie_id,
        "title": movie.title,
        "overview": movie.overview,
        "poster_path": movie.poster_path,
        "backdrop_path": movie.backdrop_path,
        "release_date": movie.release_date,
        "budget": movie.budget,
        "revenue": movie.revenue,
        "runtime": movie.runtime,
        "vote_average": movie.vote_average,
        "vote_count": movie.vote_count,
        "tagline": movie.tagline,
        "genres": [genre.genre.name for genre in movie.genres],
        "credits": [{"person_name": credit.person_name, "role": credit.role} for credit in movie.credits]
    }

class TokenData(BaseModel):
    user_id: int

async def get_current_user(request: Request) -> TokenData:
    """
    Retrieves the current user based on the provided request.

    Args:
        request (Request): The incoming request object.

    Returns:
        TokenData: The user's token data.

    Raises:
        HTTPException: If the user is not authenticated.
    """
    token = request.headers.get("Authorization")
    if not token:
        raise HTTPException(status_code=403, detail="Not authenticated")
    token = token.split(" ")[1]
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
    """
    Get movie recommendations for the current user.

    Args:
        current_user (TokenData): The current user's token data.
        db (Session): The database session.

    Returns:
        Dict[str, Any]: A dictionary containing movie recommendations.
    """
    user_id = current_user.user_id
    recommendations = {}

    not_seen_movie_ids = db.query(models.UserMovieRatings.movie_id).filter(models.UserMovieRatings.user_id != user_id).all()
    not_seen_movie_ids = [movie_id[0] for movie_id in not_seen_movie_ids]
    genre_fetcher = GenreBasedRecommendationFetcher()
    genre_recommendations = genre_fetcher.fetch(db, user_id, not_seen_movie_ids)
    trending_fetcher = TrendingRecommendationFetcher()
    trending_recommendations = trending_fetcher.fetch(db, not_seen_movie_ids)
    movie_fetcher = MovieBasedRecommendationFetcher()

    loved_movie_ids = db.query(models.UserMovieRatings.movie_id).filter(models.UserMovieRatings.user_id == user_id, models.UserMovieRatings.note >= 4).all()
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

@app.get("/movies/{movie_id}", response_model=Dict[str, Any])
async def get_movie_details(movie_id: int, db: Session = Depends(database.get_db)):
    """
    Retrieve details of a movie by its ID.

    Args:
        movie_id (int): The ID of the movie to retrieve.
        db (Session, optional): The database session. Defaults to Depends(database.get_db).

    Returns:
        Dict[str, Any]: A dictionary containing the details of the movie.

    Raises:
        HTTPException: If the movie with the specified ID is not found.
    """
    movie = db.query(models.Movies).filter(models.Movies.movie_id == movie_id).first()
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    return movie_to_dict(movie)

@app.get("/genres/", response_model=List[Dict[str, Any]])
async def get_all_genres(db: Session = Depends(database.get_db)):
    """
    Retrieve all genres from the database.

    Args:
        db (Session, optional): The database session. Defaults to Depends(database.get_db).

    Returns:
        List[Dict[str, Any]]: A list of dictionaries containing the details of each genre.
    """
    genres = db.query(models.Genre).all()
    return [{"id": genre.id, "name": genre.name} for genre in genres]

@app.get("/movies/search/", response_model=List[Dict[str, Any]])
async def search_movies(title: Optional[str] = Query(None, min_length=1), db: Session = Depends(database.get_db)):
    """
    Search for movies by title.

    Args:
        title (str, optional): The title of the movie to search for. Defaults to None.
        db (Session, optional): The database session. Defaults to Depends(database.get_db).

    Returns:
        List[Dict[str, Any]]: A list of dictionaries containing the details of each matching movie.
    """
    if not title:
        raise HTTPException(status_code=400, detail="Title parameter is required")
    
    movies = db.query(models.Movies).filter(models.Movies.title.ilike(f"%{title}%")).all()
    if not movies:
        raise HTTPException(status_code=404, detail="No movies found with the given title")
    
    return [
        movie_to_dict(movie)
        for movie in movies
    ]