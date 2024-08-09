# test_api.py
from unittest.mock import patch
from app.core.config import settings

from app.tests.conftest import conftest


client = conftest.configure_test_app()


def test_create_user_open():
    user_data = {
        "email": "newuser@example.com",
        "password": "newpassword",
        "nom": "newuser",
        "prenom": "newuser",
        "birthday": "1990-01-01",
        "sexe": "M",
    }
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
    assert (
        response.json()["detail"]
        == "The user with this email already exists in the system"
    )


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


def test_password_recovery():
    with (
        patch("app.core.config.settings.SMTP_HOST", "smtp.example.com"),
        patch("app.core.config.settings.SMTP_USER", "admin@example.com"),
    ):
        response = client.post(f"/api/v1/password-recovery/newuser2@example.com")
        assert response.status_code == 200
        assert response.json()["message"] == "Password recovery email sent"


def test_password_recovery_user_not_found():
    response = client.post(f"/api/v1/password-recovery/john@example.com")
    assert response.status_code == 404
    assert (
        response.json()["detail"]
        == "The user with this email does not exist in the system."
    )


def test_reset_password():
    user_data = {"username": "newuser@example.com", "password": "newpassword"}
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
