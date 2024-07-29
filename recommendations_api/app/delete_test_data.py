from database import SessionLocal
from recommendations.models import Movies, Genres, Castings, Crews, Users, MovieGenres, MovieUsers, UserGenre

def delete_test_data():
    db = SessionLocal()
    
    try:
        # Supprimer les associations entre utilisateurs et films
        db.query(MovieUsers).delete()
        db.commit()

        # Supprimer les associations entre films et genres
        db.query(MovieGenres).delete()
        db.commit()

        # Supprimer les castings et crews
        db.query(Castings).delete()
        db.query(Crews).delete()
        db.commit()

        # Supprimer les films
        db.query(Movies).delete()
        db.commit()

        # Supprimer les associations entre utilisateurs et genres
        db.query(UserGenre).delete()
        db.commit()

        # Supprimer les utilisateurs
        db.query(Users).delete()
        db.commit()

        # Supprimer les genres
        db.query(Genres).delete()
        db.commit()

        print("Test data deleted successfully.")
    except Exception as e:
        db.rollback()
        print(f"An error occurred: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    delete_test_data()
