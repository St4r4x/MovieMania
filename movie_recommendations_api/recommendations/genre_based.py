from datetime import datetime
from typing import Dict, List

<<<<<<< HEAD
from sqlalchemy import select
=======
>>>>>>> origin/datacrawler
from sqlalchemy.exc import NoResultFound
from sqlalchemy.orm import Session, joinedload

from movie_recommendations_api import models, schemas

from .base import RecommendationFetcher
from .config import (CARROUSSEL_LENGTH, WEIGHT_REVENUE, WEIGHT_VOTE_AVERAGE,
                     WEIGHT_VOTE_COUNT)


class GenreBasedRecommendationFetcher(RecommendationFetcher):
    """Fetches recommendations based on user's preferred genres."""

<<<<<<< HEAD
    def fetch(self, db: Session, user_id: int) -> Dict[str, List[schemas.Movie]]:
        """
        Recommends movies to a user based on their preferred genres.

        This method fetches movies from the database that match the user's preferred genres,
        are not yet released, and have not been seen by the user. It then ranks these movies
        based on a weighted score of their average votes, revenue, and vote count. The method
        aims to ensure diversity in the recommendations by selecting unique movies across
        different sub-genres if possible.

        Args:
            user_id (int): The ID of the user for whom recommendations are being made.
            genres (List[str]): A list of genre names based on which movies will be recommended.

        Returns:
            Dict[str, Any]: A dictionary containing recommended movies categorized by genre.
            If no recommendations are found, returns a message indicating no recommendations are available.
            If the user is not found, returns a message indicating the user is not found.
            If an error occurs, returns a message with the error description.
        """
        try:
            # Fetch the preferred genres of the user
            preferred_genres = db.query(models.Genres.name).join(
                models.UserGenre).filter(models.UserGenre.user_id == user_id).all()
            preferred_genres = [genre[0] for genre in preferred_genres]

            if not preferred_genres:
                return {"message": "No preferred genres found for this user."}

            recommendations = {}
            for genre in preferred_genres:
                movies = db.query(models.Movies).options(
                    joinedload(models.Movies.genres)
                ).join(
                    models.MovieGenres, models.Movies.movie_id == models.MovieGenres.movie_id
                ).join(
                    models.Genres, models.MovieGenres.genre_id == models.Genres.genre_id
                ).filter(
                    models.Genres.name == genre,
                    models.Movies.release_date <= datetime.now(),
                    ~models.Movies.movie_id.in_(
                        select(models.MovieUsers.movie_id).filter(
                            models.MovieUsers.user_id == user_id)
                    )
                ).order_by(
                    (models.Movies.vote_average * WEIGHT_VOTE_AVERAGE + models.Movies.revenue *
                     WEIGHT_REVENUE + models.Movies.vote_count * WEIGHT_VOTE_COUNT).desc()
                ).limit(CARROUSSEL_LENGTH).all()

                if movies:
                    # Ensure diversity by picking the top movie from each sub-category, if possible
                    # unique_movies = self.ensure_diversity(movies)
                    recommendations[f'genre_{genre}'] = [
                        schemas.Movie.from_orm(movie) for movie in movies
                    ]

            return recommendations if recommendations else {"message": "No recommendations available."}

        except NoResultFound:
            return {"message": "User not found."}
        except Exception as e:
            return {"message": f"An error occurred: {str(e)}"}

    def ensure_diversity(self, movies: List[models.Movies]) -> List[models.Movies]:
        """
        Ensures diversity in the recommended movies by selecting unique movies across different sub-genres.

        This method filters through a list of movies and selects a unique set of movies that do not share
        sub-genres with each other, aiming to provide a diverse set of recommendations to the user.

        Args:
            movies (List[models.Movies]): A list of movies from which to select a diverse set.

        Returns:
            List[models.Movies]: A list of movies selected to ensure diversity in sub-genres.
        """
        unique_movies = []
        seen_sub_genres = set()
        for movie in movies:
            sub_genres = set(genre.genre_id for genre in movie.genres)
            if not seen_sub_genres & sub_genres:
                unique_movies.append(movie)
                seen_sub_genres.update(sub_genres)
            if len(unique_movies) >= CARROUSSEL_LENGTH:
                break
        return unique_movies
=======
    def fetch(self, db: Session, user_id: int, not_seen_movie_ids:List) -> Dict[str, List[schemas.Movie]]:
            """
            Recommends movies to a user based on their preferred genres.

            This method fetches movies from the database that match the user's preferred genres,
            are not yet released, and have not been seen by the user. It then ranks these movies
            based on a weighted score of their average votes, revenue, and vote count. The method
            aims to ensure diversity in the recommendations by selecting unique movies across
            different sub-genres if possible.

            Args:
                db (Session): The database session object.
                user_id (int): The ID of the user for whom recommendations are being made.
                not_seen_movie_ids (List): A list of movie IDs that the user hasn't seen.

            Returns:
                Dict[str, List[schemas.Movie]]: A dictionary containing recommended movies categorized by genre.
                If no recommendations are found, returns a message indicating no recommendations are available.
                If the user is not found, returns a message indicating the user is not found.
                If an error occurs, returns a message with the error description.
            """
            try:
                # Fetch the preferred genres of the user
                preferred_genres = db.query(models.Genres.name).join(
                    models.UserGenre).filter(models.UserGenre.user_id == user_id).all()
                preferred_genres = [genre[0] for genre in preferred_genres]

                if not preferred_genres:
                    return {"message": "No preferred genres found for this user."}

                recommendations = {}
                for genre in preferred_genres:
                    movies = db.query(models.Movies).options(
                        joinedload(models.Movies.genres)
                    ).join(
                        models.MovieGenres, models.Movies.movie_id == models.MovieGenres.movie_id
                    ).join(
                        models.Genres, models.MovieGenres.genre_id == models.Genres.genre_id
                    ).filter(
                        models.Genres.name == genre,
                        models.Movies.release_date <= datetime.now(),
                        models.Movies.movie_id.in_(not_seen_movie_ids)
            
                    ).order_by(
                        (models.Movies.vote_average * WEIGHT_VOTE_AVERAGE + models.Movies.revenue *
                         WEIGHT_REVENUE + models.Movies.vote_count * WEIGHT_VOTE_COUNT).desc()
                    ).limit(CARROUSSEL_LENGTH).all()

                    if movies:
                        recommendations[f'genre_{genre}'] = [
                            schemas.Movie.from_orm(movie) for movie in movies
                        ]

                return recommendations if recommendations else {"message": "No recommendations available."}

            except NoResultFound:
                return {"message": "User not found."}
            except Exception as e:
                return {"message": f"An error occurred: {str(e)}"}
>>>>>>> origin/datacrawler
