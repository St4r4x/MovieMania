import random
from datetime import date, datetime, timedelta

from database import SessionLocal
from faker import Faker
from models import (Castings, Crews, Genres, MovieGenres, Movies, MovieUsers,
                    UserGenre, Users)

fake = Faker()


def generate_test_data():
    db = SessionLocal()

    try:
        # Générer des genres
        genres = []
        for _ in range(5):
            genre = Genres(name=fake.word())
            db.add(genre)
            genres.append(genre)
        db.commit()

        # Générer des films
        movies = []
        for _ in range(10):
            movie = Movies(
                overview=fake.text(),
                title=fake.sentence(nb_words=3),
                release_date=fake.date(),
                budget=random.randint(100000, 10000000),
                revenue=random.randint(100000, 10000000),
                runtime=random.randint(80, 180),
                vote_average=random.uniform(1, 10),
                vote_count=random.randint(1, 1000),
                tagline=fake.sentence(nb_words=5)
            )
            db.add(movie)
            movies.append(movie)
        db.commit()

        # Associer des genres aux films
        for movie in movies:
            for genre in random.sample(genres, k=random.randint(1, 3)):
                movie_genre = MovieGenres(
                    movie_id=movie.movie_id, genre_id=genre.genre_id)
                db.add(movie_genre)
        db.commit()

        # Générer des castings et crews
        for movie in movies:
            for _ in range(3):
                casting = Castings(
                    actor_name=fake.name(),
                    character_name=fake.name(),
                    movie_id=movie.movie_id
                )
                db.add(casting)

                crew = Crews(
                    person_name=fake.name(),
                    role=fake.job(),
                    movie_id=movie.movie_id
                )
                db.add(crew)
        db.commit()

        # Générer des utilisateurs
        users = []
        for _ in range(5):
            user = Users(
                nom=fake.last_name(),
                prenom=fake.first_name(),
                birthday=fake.date(),
                sexe=random.choice(['M', 'F']),
                password=fake.password(),
                email=fake.email()
            )
            db.add(user)
            users.append(user)
        db.commit()

        # Associer des genres aux utilisateurs
        for user in users:
            for genre in random.sample(genres, k=random.randint(1, 3)):
                user_genre = UserGenre(
                    user_id=user.user_id, genre_id=genre.genre_id)
                db.add(user_genre)
        db.commit()

        # Associer des films aux utilisateurs
        for user in users:
            for movie in random.sample(movies, k=random.randint(1, 5)):
                movie_user = MovieUsers(
                    user_id=user.user_id, movie_id=movie.movie_id, note=random.randint(
                        1, 5))
                db.add(movie_user)
        db.commit()

        print("Test data generated successfully.")
    except Exception as e:
        db.rollback()
        print(f"An error occurred: {e}")
    finally:
        db.close()


if __name__ == "__main__":
    generate_test_data()