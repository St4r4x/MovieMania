# conftest.py

from re import A
from urllib import response
from wsgiref import headers
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from fastapi.testclient import TestClient
from alembic import command
from alembic.config import Config
from app.core.security import get_password_hash

from app.main import app
from app.api.deps import get_db

# Configuration de la base de données pour les tests
SQLALCHEMY_DATABASE_URL = "sqlite:///./app/tests/data/test.db"
ENGINE_OPTIONS = {"connect_args": {"check_same_thread": False}}

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def setup_database():
    engine = create_engine(SQLALCHEMY_DATABASE_URL, **ENGINE_OPTIONS)
    TestingSessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
    return TestingSessionLocal

def apply_migrations():
    alembic_cfg = Config("alembic.ini")
    alembic_cfg.set_main_option("sqlalchemy.url", SQLALCHEMY_DATABASE_URL)
    command.upgrade(alembic_cfg, "head")
    print("Migrations applied")

def override_get_db(TestingSessionLocal):
    def _get_db_override():
        db = TestingSessionLocal()
        try:
            yield db
            db.flush()
        finally:
            db.rollback()
            db.close()
    return _get_db_override

def configure_test_app():
    TestingSessionLocal = setup_database()
    apply_migrations()
    cleanup_database()
    create_user_in_db(True, True, "admin")
    create_user_in_db(False, False, "inactiveuser")
    app.dependency_overrides[get_db] = override_get_db(TestingSessionLocal)
    return TestClient(app)

def cleanup_database():
    session = TestingSessionLocal()
    session.execute(text("DELETE FROM MovieUsers"))
    session.execute(text("DELETE FROM Users"))
    session.execute(text("DELETE FROM UserGenre"))
    session.commit()
    session.close()

def create_user_in_db(isAdmin, isActive, name):
    session = TestingSessionLocal()
    password = get_password_hash("password")
    session.execute(
        text(
            "INSERT INTO Users (email, is_active, is_superuser, nom, prenom, password) VALUES (:email, :is_active, :is_superuser, :nom, :prenom, :password)"
        ),
        {"email": f"{name}@example.com", "is_active": isActive, "is_superuser": isAdmin, "nom": name, "prenom": name, "password": password},
    )
    print("User created")
    session.commit()

client = configure_test_app()

def test_create_user_open():
    user_data = {"email": "newuser@example.com", "password": "newpassword"}
    response = client.post("/api/v1/users/open", json=user_data)
    assert response.status_code == 200
    assert response.json()["email"] == "newuser@example.com"

def test_create_user_with_perms():
    user_admin = {"username": "admin@example.com", "password": "password"}
    response = client.post("/api/v1/login/access-token", data=user_admin)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    user_data = {"email": "newuser2@example.com", "password": "newpassword"}
    response = client.post("/api/v1/users/", json=user_data, headers=headers)
    assert response.status_code == 200
    assert response.json()["email"] == "newuser2@example.com"

def test_create_user_if_already_exist():
    user_data = {"email": "newuser@example.com", "password": "newpassword"}
    response = client.post("/api/v1/users/open", json=user_data)
    assert response.status_code == 400
    assert response.json()["detail"] == "The user with this email already exists in the system"

def test_access_token():
    user_data = {"username": "newuser@example.com", "password": "newpassword"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_login_access_token_incorrect_credentials():
    # Préparer les données utilisateur incorrectes
    user_data = {"username": "newuser@example.com", "password": "wrongpassword"}
    # Appeler l'endpoint de connexion
    response = client.post("/api/v1/login/access-token", data=user_data)
    # Vérifier que la connexion échoue avec un message d'erreur approprié
    assert response.status_code == 400
    assert response.json()["detail"] == "Incorrect email or password"

def test_login_access_token_inactive_user():
    # Préparer les données d'un utilisateur inactif
    user_data = {"username": "inactiveuser@example.com", "password": "password"}
    # Appeler l'endpoint de connexion
    response = client.post("/api/v1/login/access-token", data=user_data)
    # Vérifier que la connexion échoue avec un message d'erreur approprié
    assert response.status_code == 400
    assert response.json()["detail"] == "Inactive user"

def test_read_users_with_role_user():
    user_data = {"username": "newuser@example.com", "password": "newpassword"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    response = client.get("/api/v1/users/", headers=headers)
    assert response.status_code == 400
    assert response.json()["detail"] == "The user doesn't have enough privileges"

def test_read_users_with_role_admin():
    user_data = {"username": "admin@example.com", "password": "password"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    response = client.get("/api/v1/users/", headers=headers)
    assert response.status_code == 200
    assert len(response.json()["data"]) == 4
    assert response.json()["data"][0]["email"] == "admin@example.com"

def test_read_own_user():
    user_data = {"username": "newuser@example.com", "password": "newpassword"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    response = client.get("/api/v1/users/me", headers=headers)
    assert response.status_code == 200
    assert response.json()["email"] == "newuser@example.com"

def test_get_user_by_id():
    user_data = {"username": "admin@example.com", "password": "password"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    response = client.get("/api/v1/users/3", headers=headers)
    assert response.status_code == 200
    assert response.json()["email"] == "newuser@example.com"

def test_update_own_user():
    user_data = {"username": "newuser@example.com", "password": "newpassword"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    new_data = {"nom": "newuser3"}
    response = client.patch("/api/v1/users/me", json=new_data, headers=headers)
    assert response.status_code == 200
    assert response.json()["nom"] == "newuser3@example.com"

def test_update_user_by_id_with_role_admin():
    user_data = {"username": "admin@example.com", "password": "password"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    new_data = {"email": "newuser1@example.com"}
    response = client.patch("/api/v1/users/3", json=new_data, headers=headers)
    assert response.status_code == 200
    assert response.json()["email"] == "newuser1@example.com"

def test_update_user_by_id_with_role_user():
    user_data = {"username": "newuser1@example.com", "password": "newpassword"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    new_data = {"email": "newuser3@example.com", "is_active": "true", "is_superuser": "false", "full_name": "newuser3"}
    response = client.patch("/api/v1/users/4", json=new_data, headers=headers)
    assert response.status_code == 400
    assert response.json()["detail"] == "The user doesn't have enough privileges"

def test_update_user_by_id_with_role_admin_not_found():
    user_data = {"username": "admin@example.com", "password": "password"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    new_data = {"email": "newuser1@example.com"}
    response = client.patch("/api/v1/users/99", json=new_data, headers=headers)
    assert response.status_code == 404
    assert response.json()["detail"] == "The user with this id does not exist in the system"

def test_update_user_by_id_with_role_admin_email_already_exists():
    user_data = {"username": "admin@example.com", "password": "password"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    new_data = {"email": "admin@example.com"}
    response = client.patch("/api/v1/users/3", json=new_data, headers=headers)
    assert response.status_code == 409
    assert response.json()["detail"] == "User with this email already exists"

def test_delete_user_by_id_with_role_admin():
    user_data = {"username": "admin@example.com", "password": "password"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    response = client.delete("/api/v1/users/3", headers=headers)
    assert response.status_code == 200
    assert response.json()["message"] == "User deleted successfully"
    response = client.get("/api/v1/users/3", headers=headers)
    assert response.status_code == 404
    assert response.json()["detail"] == "The user with this id does not exist in the system"

def test_delete_user_by_id_with_role_user():
    user_data = {"username": "newuser2@example.com", "password": "newpassword"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    response = client.delete("/api/v1/users/2", headers=headers)
    assert response.status_code == 403
    assert response.json()["detail"] == "The user doesn't have enough privileges"

def test_delete_user_by_id_with_role_admin_not_found():
    user_data = {"username": "admin@example.com", "password": "password"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    response = client.delete("/api/v1/users/99", headers=headers)
    assert response.status_code == 404
    assert response.json()["detail"] == "User not found"

def test_delete_user_by_id_with_role_admin_cannot_delete_self():
    user_data = {"username": "admin@example.com", "password": "password"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    response = client.delete("/api/v1/users/1", headers=headers)
    assert response.status_code == 403
    assert response.json()["detail"] == "Super users are not allowed to delete themselves"

def test_update_own_password():
    user_data = {"username": "newuser2@example.com", "password": "newpassword"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    new_data = {"current_password": "newpassword", "new_password": "newpassword2"}
    response = client.patch("/api/v1/users/me/password/", json=new_data, headers=headers)
    assert response.status_code == 200
    assert response.json()["message"] == "Password updated successfully"

def test_update_own_password_wrong_password():
    user_data = {"username": "newuser2@example.com", "password": "newpassword2"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    new_data = {"current_password": "newpassword", "new_password": "newpassword3"}
    response = client.patch("/api/v1/users/me/password/", json=new_data, headers=headers)
    assert response.status_code == 400
    assert response.json()["detail"] == "Incorrect password"

def test_update_own_password_same_password():
    user_data = {"username": "newuser2@example.com", "password": "newpassword2"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    new_data = {"current_password": "newpassword2", "new_password": "newpassword2"}
    response = client.patch("/api/v1/users/me/password/", json=new_data, headers=headers)
    assert response.status_code == 400
    assert response.json()["detail"] == "New password cannot be the same as the current one"

def test_password_recovery():
    response = client.post(f"/api/v1/password-recovery/newuser2@example.com")
    assert response.status_code == 200
    assert response.json()["message"] == "Password recovery email sent"

def test_password_recovery_user_not_found():
    response = client.post(f"/api/v1/password-recovery/john@example.com")
    assert response.status_code == 404
    assert response.json()["detail"] == "The user with this email does not exist in the system."

def test_reset_password():
    user_data = {"username": "newuser2@example.com", "password": "newpassword2"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    new_data = {"token": token, "new_password": "newpassword3"}
    response = client.post("/api/v1/reset-password/", json=new_data)
    assert response.status_code == 200
    assert response.json()["message"] == "Password updated successfully"

def test_reset_password_invalid_token():
    new_data = {"token": "invalidtoken", "new_password": "newpassword3"}
    response = client.post("/api/v1/reset-password/", json=new_data)
    assert response.status_code == 400
    assert response.json()["detail"] == "Invalid token"

def test_create_movieuser():
    user_data = {"username": "newuser2@example.com", "password": "newpassword3"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    movieuser_data = {"movie_id": "1", "note": "5"}
    response = client.post("/api/v1/movieusers/", json=movieuser_data, headers=headers)
    assert response.status_code == 200
    assert response.json()["movie_id"] == "1"

def test_get_movieusers():
    user_data = {"username": "newuser2@example.com", "password": "newpassword3"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    print(headers)
    response = client.get("/api/v1/movieusers/", headers=headers)
    assert response.status_code == 200
    assert len(response.json()["data"]) == "1"