# conftest.py

from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from fastapi.testclient import TestClient
from alembic import command
from alembic.config import Config

from app.core.security import get_password_hash
from app.core.config import settings
from app.main import app
from app.api.deps import get_db

# Configuration de la base de données pour les tests
ENGINE_OPTIONS = {"connect_args": {"check_same_thread": False}}


class ConfTest:

    def __init__(self):
        self.TestingSessionLocal = None

    def setup_database(self):
        engine = create_engine(settings.SQLITE_DATABASE_URI, **ENGINE_OPTIONS)
        self.TestingSessionLocal = sessionmaker(
            bind=engine, autocommit=False, autoflush=False
        )

    def apply_migrations(self):
        alembic_cfg = Config("alembic.ini")
        alembic_cfg.set_main_option("sqlalchemy.url", settings.SQLITE_DATABASE_URI)
        command.upgrade(alembic_cfg, "head")
        print("Migrations applied")

    def override_get_db(self):
        def _get_db_override():
            db = self.TestingSessionLocal()
            try:
                yield db
                db.flush()
            finally:
                db.rollback()
                db.close()

        return _get_db_override

    def configure_test_app(self):
        self.setup_database()
        self.apply_migrations()
        self.cleanup_database()
        self.create_user_in_db(True, True, "admin")
        self.create_user_in_db(False, False, "inactiveuser")
        self.create_user_in_db(False, True, "deleteuser")
        app.dependency_overrides[get_db] = self.override_get_db()
        return TestClient(app)

    def cleanup_database(self):
        session = self.TestingSessionLocal()
        session.execute(text("DELETE FROM MovieUsers"))
        session.execute(text("DELETE FROM Users"))
        session.execute(text("DELETE FROM UserGenre"))
        session.commit()
        session.close()

    def create_user_in_db(self, isAdmin, isActive, name):
        session = self.TestingSessionLocal()
        password = get_password_hash("password")
        session.execute(
            text(
                "INSERT INTO Users (email, is_active, is_superuser, nom, prenom, password) VALUES (:email, :is_active, :is_superuser, :nom, :prenom, :password)"
            ),
            {
                "email": f"{name}@example.com",
                "is_active": isActive,
                "is_superuser": isAdmin,
                "nom": name,
                "prenom": name,
                "password": password,
            },
        )
        print("User created")
        session.commit()


conftest = ConfTest()
