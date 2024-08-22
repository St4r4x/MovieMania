# test_usersmovie.py
from app.tests.conftest import conftest

client = conftest.configure_test_app()


def test_create_movieuser():
    user_data = {"username": "newuser2@example.com", "password": "newpassword"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    movieuser_data = {"movie_id": "1", "note": "5"}
    response = client.post("/api/v1/movieusers/", json=movieuser_data, headers=headers)
    assert response.status_code == 200
    assert response.json()["movie_id"] == 1


def test_get_movieusers():
    user_data = {"username": "newuser2@example.com", "password": "newpassword"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    response = client.get("/api/v1/movieusers/", headers=headers)
    assert response.status_code == 200
    assert len(response.json()["data"]) == 1


def test_update_movieuser():
    user_data = {"username": "newuser2@example.com", "password": "newpassword"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}

    # Créer un MovieUser pour l'utilisateur
    movieuser_data = {"movie_id": "2", "note": "5"}
    response = client.post("/api/v1/movieusers/", json=movieuser_data, headers=headers)
    assert response.status_code == 200

    # Mettre à jour le MovieUser
    update_data = {"movie_id": "2", "note": "4", "saved": True}
    response = client.put("/api/v1/movieusers/", json=update_data, headers=headers)
    assert response.status_code == 200
    assert response.json()["message"] == "movieuser updated successfully"

    # Vérifier que la note a été mise à jour
    response = client.get("/api/v1/movieusers/2", headers=headers)
    assert response.status_code == 200
    assert response.json()["note"] == 4
    assert response.json()["saved"] == True

    # Tester la mise à jour avec des permissions insuffisantes
    user_data = {"username": "deleteuser@example.com", "password": "password"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}

    # Essayer de mettre à jour le MovieUser de l'autre utilisateur
    update_data = {"movie_id": "2", "note": "3", "saved": False}
    response = client.put("/api/v1/movieusers/", json=update_data, headers=headers)
    assert response.status_code == 400
    assert response.json()["detail"] == "Not enough permissions"
