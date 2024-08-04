from FlagEmbedding import BGEM3FlagModel
from sqlalchemy.orm import Session
from models import Movies, Genres, Credits, Peoples, Jobs
from schemas import GenreSchema, CreditSchema, PeopleSchema, JobSchema
from database import engine
import pickle

class MovieEncoder:
    """Handles the encoding of movie information into embeddings using SentenceTransformer.

    Attributes:
        model (SentenceTransformer): The SentenceTransformer model used for encoding.
    """

    def __init__(self):
        """Initializes the MovieEncoder with a SentenceTransformer model."""
        self.model = BGEM3FlagModel('BAAI/bge-m3')

    def encode_and_update_movies(self, db: Session):
        """Encodes movie information and updates the database with the embeddings.

        Args:
            db_session (Session): The database session used to fetch and update movies.

        Retrieves movies without embeddings from the database, encodes their information
        using the SentenceTransformer model, and updates the database with the new embeddings.
        """
        movies_without_embeddings = db.query(Movies).filter(Movies.embeddings == None).all()
        print(f"Encoding embeddings for {len(movies_without_embeddings)} movies")

        for movie in movies_without_embeddings:
            # Collect genre details
            genres = []
            for genre in movie.genres:
                genre_details = db.query(Genres).filter(Genres.genre_id == genre.genre_id).first()
                if genre_details:
                    genres.append(GenreSchema(
                        genre_id=genre_details.genre_id,
                        name=genre_details.name
                    ))

            # Define a set of important job titles
            important_jobs = {'Director', 'Producer', 'Writer', 'Editor', "Original Music Composer", "Executive Producer", "Director of Photography"}

            # Collect all credits
            credits = []
            for credit in movie.credits:
                people = db.query(Peoples).filter(Peoples.people_id == credit.id_people).first()
                job = db.query(Jobs).filter(Jobs.job_id == credit.id_job).first()
                
                if people and job:
                    credits.append(CreditSchema(
                        credit_id=credit.credit_id,
                        id_movie=credit.id_movie,
                        id_people=credit.id_people,
                        id_job=credit.id_job,
                        job=JobSchema(job_id=job.job_id, title=job.title),
                        people=PeopleSchema(people_id=people.people_id, name=people.name, photo=people.photo),
                        character_name=credit.character_name,
                        cast_order=credit.cast_order
                    ))


            # Collect all credits
            credits = []
            for credit in movie.credits:
                people = db.query(Peoples).filter(Peoples.people_id == credit.id_people).first()
                job = db.query(Jobs).filter(Jobs.job_id == credit.id_job).first()
                
                if people and job:
                    credits.append({
                        'credit_id': credit.credit_id,
                        'id_movie': credit.id_movie,
                        'id_people': credit.id_people,
                        'id_job': credit.id_job,
                        'job': job.title,
                        'people': {
                            'people_id': people.people_id,
                            'name': people.name,
                            'photo': people.photo
                        },
                        'character_name': credit.character_name,
                        'cast_order': credit.cast_order
                    })

            # Separate credits into actors and important jobs
            actors = [credit for credit in credits if credit['job'] == 'Acting']
            important_credits = [credit for credit in credits if credit['job'] in important_jobs and credit['job'] != 'Acting']

            # Sort actors by cast_order and take the first 10
            top_actors = sorted(actors, key=lambda x: (x['cast_order'] or float('inf')))[:10]

            # Combine top actors and important credits, ensuring no duplicates
            combined_credits = {credit['credit_id']: credit for credit in top_actors + important_credits}.values()

            # Prepare movie details for encoding
            movie_details = {
                'movie_id': movie.movie_id,
                'title': movie.title,
                'release_date': movie.release_date.isoformat() if movie.release_date else None,
                'budget': movie.budget,
                'revenue': movie.revenue,
                'runtime': movie.runtime,
                'vote_average': movie.vote_average,
                'vote_count': movie.vote_count,
                'tagline': movie.tagline,
                'overview': movie.overview,
                'poster_path': movie.poster_path,
                'backdrop_path': movie.backdrop_path,
                'genres': genres,
                'credits': list(combined_credits)
            }
            # Convert the movie details to a string for encoding
            full_info_to_encode = str(movie_details)

            # Encode the combined information
            embeddings = self.model.encode(full_info_to_encode, batch_size=12, max_length=8192)['dense_vecs']

            # Update movie with embeddings
            movie.embeddings = pickle.dumps(embeddings)
            db.add(movie)
            print(f"Encoded embeddings for movie {movie.title}")
        
        # Commit changes to the database
        db.commit()

# Utiliser la classe pour encoder et mettre à jour les films
if __name__ == "__main__":
    encoder = MovieEncoder()
    with Session(engine) as session:
        encoder.encode_and_update_movies(session)