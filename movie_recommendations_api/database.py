import os
import time
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
from sqlalchemy.exc import OperationalError

load_dotenv()

SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

def wait_for_db(engine):
    while True:
        try:
            # Tentative de connexion à la base de données
            connection = engine.connect()
            connection.close()
            break
        except OperationalError:
            print("Base de données non disponible, nouvelle tentative dans 5 secondes...")
            time.sleep(5)

engine = create_engine(SQLALCHEMY_DATABASE_URL)
wait_for_db(engine)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
