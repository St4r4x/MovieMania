import requests
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from models import Base, Movies, Genres, Job, People, Credits, MovieGenres
import os

# URL de la base de données MySQL
DATABASE_URL = 'mysql+pymysql://user:motsdepasse@ndd:port/database_name'

# Configuration de la base de données
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

# Remplacez par votre jeton d'accès
BEARER_TOKEN = 'api_key'

# Fichier pour l'historique des récupérations
HISTORY_FILE = 'tmdb_fetch_history.txt'

def fetch_movie_details(movie_id):
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?language=fr-FR"
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {BEARER_TOKEN}"
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to fetch movie details for ID {movie_id}: {response.status_code}")
        return None

def fetch_movie_credits(movie_id):
    url = f"https://api.themoviedb.org/3/movie/{movie_id}/credits?language=fr-FR"
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {BEARER_TOKEN}"
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to fetch movie credits for ID {movie_id}: {response.status_code}")
        return None

def get_or_create_job(session, title):
    job = session.query(Job).filter_by(title=title).first()
    if not job:
        job = Job(title=title)
        session.add(job)
        session.commit()
    return job

def get_or_create_person(session, name, photo=None):
    person = session.query(People).filter_by(name=name).first()
    if not person:
        person = People(name=name, photo=photo)
        session.add(person)
        session.commit()
    return person

def get_or_create_genre(session, name):
    genre = session.query(Genres).filter_by(name=name).first()
    if not genre:
        genre = Genres(name=name)
        session.add(genre)
        session.commit()
    return genre

def save_movie_to_db(movie_data):
    if movie_data is None:
        return False

    movie_id = movie_data.get('id')
    if not movie_id:
        print("Movie ID not found in the response.")
        return False
    
    # Vérifiez si le film existe déjà pour éviter les doublons
    movie = session.query(Movies).filter_by(movie_id=movie_id).first()
    if not movie:
        movie = Movies(
            movie_id=movie_id,
            title=movie_data.get('original_title', movie_data.get('title', '')),
            overview=movie_data.get('overview', ''),
            poster_path=movie_data.get('poster_path', ''),
            backdrop_path=movie_data.get('backdrop_path', ''),
            release_date=movie_data.get('release_date', None),
            budget=movie_data.get('budget', 0),
            revenue=movie_data.get('revenue', 0),
            runtime=movie_data.get('runtime', 0),
            tagline=movie_data.get('tagline', ''),
            vote_average=movie_data.get('vote_average', 0.0),
            vote_count=movie_data.get('vote_count', 0),
            adult=movie_data.get('adult', False)
        )
        session.add(movie)
        session.commit()
    
    # Enregistrer les genres associés au film
    for genre in movie_data.get('genres', []):
        genre_obj = get_or_create_genre(session, genre['name'])
        # Assurez-vous que l'association entre le film et le genre n'existe pas déjà
        movie_genre = session.query(MovieGenres).filter_by(movie_id=movie.movie_id, genre_id=genre_obj.genre_id).first()
        if not movie_genre:
            movie_genre = MovieGenres(
                movie_id=movie.movie_id,
                genre_id=genre_obj.genre_id
            )
            session.add(movie_genre)
    
    session.commit()
    return True

def save_movie_credits(movie_id, credits_data):
    if credits_data is None:
        return False

    # Traitement du cast (acteurs)
    for cast in credits_data.get('cast', []):
        person = get_or_create_person(session, cast['name'], cast.get('profile_path'))
        job = get_or_create_job(session, "Acting")
        existing_credit = session.query(Credits).filter_by(id_people=person.id, id_movie=movie_id, id_job=job.id).first()
        if not existing_credit:
            credit = Credits(
                id_people=person.id,
                id_job=job.id,
                id_movie=movie_id,
                character_name=cast.get('character', None),
                cast_order=cast.get('order', None)
            )
            session.add(credit)

    # Traitement du crew (équipe)
    for crew in credits_data.get('crew', []):
        person = get_or_create_person(session, crew['name'], crew.get('profile_path'))
        job = get_or_create_job(session, crew['job'])
        existing_credit = session.query(Credits).filter_by(id_people=person.id, id_movie=movie_id, id_job=job.id).first()
        if not existing_credit:
            credit = Credits(
                id_people=person.id,
                id_job=job.id,
                id_movie=movie_id
            )
            session.add(credit)

    session.commit()
    return True

def update_history(movie_id, status):
    with open(HISTORY_FILE, 'a') as f:
        f.write(f"{movie_id},{status}\n")

def get_last_processed_id():
    if not os.path.exists(HISTORY_FILE):
        return 0
    with open(HISTORY_FILE, 'r') as f:
        lines = f.readlines()
        if lines:
            last_line = lines[-1].strip()
            return int(last_line.split(',')[0])
    return 0

# Script principal pour balayer les films
def main():
    start_id = get_last_processed_id() + 1

    while True:
        print(f"Processing movie ID {start_id}")
        movie_data = fetch_movie_details(start_id)
        if movie_data:
            success = save_movie_to_db(movie_data)
            if success:
                credits_data = fetch_movie_credits(start_id)
                if credits_data:
                    save_movie_credits(start_id, credits_data)
            update_history(start_id, "True" if success else "False")
        else:
            update_history(start_id, "False")
        
        start_id += 1

if __name__ == "__main__":
    main()
