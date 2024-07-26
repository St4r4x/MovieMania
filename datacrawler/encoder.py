from sentence_transformers import SentenceTransformer
from sqlalchemy.orm import Session
from models import Movies
from database import engine
import pickle

class MovieEncoder:
    """Handles the encoding of movie information into embeddings using SentenceTransformer.

    Attributes:
        model (SentenceTransformer): The SentenceTransformer model used for encoding.
    """

    def __init__(self):
        """Initializes the MovieEncoder with a SentenceTransformer model."""
        self.model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

    def encode_and_update_movies(self, db_session: Session):
        """Encodes movie information and updates the database with the embeddings.

        Args:
            db_session (Session): The database session used to fetch and update movies.

        Retrieves movies without embeddings from the database, encodes their information
        using the SentenceTransformer model, and updates the database with the new embeddings.
        """
        movies_without_embeddings = db_session.query(Movies).filter(Movies.embeddings == None).all()
        print(f"Encoding embeddings for {len(movies_without_embeddings)} movies")

        for movie in movies_without_embeddings:
            info_to_encode = f"Titre du film : {movie.title}, Résumé du film : {movie.overview}, Date de sortie : {movie.release_date}, Budget du film : {movie.budget}"

            # Ajouter les noms des membres du casting
            cast_names = ' '.join([casting.actor_name for casting in movie.castings])
            # Ajouter les noms des membres de l'équipe
            crew_names = ' '.join([crew.person_name for crew in movie.crews])
            
            # Combiner toutes les informations pour l'encodage
            full_info_to_encode = f"{info_to_encode}, Acteur dans le film :{cast_names}, Membres du staff : {crew_names}"

            embeddings = self.model.encode(full_info_to_encode)

            movie.embeddings = pickle.dumps(embeddings)
            
            db_session.add(movie)
            print(f"Encoded embeddings for movie {movie.title}")
        
        db_session.commit()

# Utiliser la classe pour encoder et mettre à jour les films
encoder = MovieEncoder()
with Session(engine) as session:
    encoder.encode_and_update_movies(session)