from datetime import datetime
from unittest.mock import Mock

from sqlalchemy.orm import Session

from .. import models, schemas
from ..recommendations.genre_based import GenreBasedRecommendationFetcher


def test_fetch_with_preferred_genres():
    # Create a mock database session
    db = Mock(spec=Session)

    # Create a mock user ID
    user_id = 1

    # Create a mock list of preferred genres
    preferred_genres = ["Action", "Adventure"]

    # Create a mock list of movies
    movies = [
        models.Movies(
            movie_id=1,
            title="Movie 1",
            release_date=datetime.now(),
            vote_average=7.5,
            revenue=1000000,
            vote_count=1000,
            genres=[models.Genres(genre_id=1, name="Action")]
        ),
        models.Movies(
            movie_id=2,
            title="Movie 2",
            release_date=datetime.now(),
            vote_average=8.0,
            revenue=2000000,
            vote_count=2000,
            genres=[models.Genres(genre_id=2, name="Adventure")]
        )
    ]

    # Mock the database query and return the mock list of movies
    db.query.return_value.join.return_value.filter.return_value.order_by.return_value.limit.return_value.all.return_value = movies

    # Create an instance of the GenreBasedRecommendationFetcher class
    recommendation_fetcher = GenreBasedRecommendationFetcher()

    # Call the fetch method
    result = recommendation_fetcher.fetch(db, user_id)

    # Assert that the result is as expected
    assert result == {
        "genre_Action": [schemas.Movie.from_orm(movies[0])],
        "genre_Adventure": [schemas.Movie.from_orm(movies[1])]
    }
