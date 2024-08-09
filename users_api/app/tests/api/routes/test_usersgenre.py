from app.tests.conftest import conftest

client = conftest.configure_test_app()


def test_create_genresuser():
    user_data = {"username": "newuser2@example.com", "password": "newpassword"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    genresuser_data = {"genre_ids": [1, 2, 3]}
    response = client.post(
        "/api/v1/genreusers/", json=genresuser_data, headers=headers
    )
    genreusers = response.json()
    assert response.status_code == 200
    genre_ids = {genreuser["genre_id"] for genreuser in genreusers}
    assert genre_ids == {1, 2, 3}


def test_get_genresusers():
    user_data = {"username": "newuser2@example.com", "password": "newpassword"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    response = client.get("/api/v1/genreusers/", headers=headers)
    assert response.status_code == 200
    assert len(response.json()["data"]) == 3


def test_update_genresuser():
    user_data = {"username": "newuser2@example.com", "password": "newpassword"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    genresuser_data = {"genre_ids": [1, 2, 3]}
    response = client.post(
        "/api/v1/genreusers/", json=genresuser_data, headers=headers
    )
    genreusers = response.json()
    assert response.status_code == 200
    genre_ids = {genreuser["genre_id"] for genreuser in genreusers}
    assert genre_ids == {1, 2, 3}

    # Mettre à jour les GenreUser
    update_data = {"genre_ids": [2, 3, 4]}
    response = client.put("/api/v1/genreusers/", json=update_data, headers=headers)
    assert response.status_code == 200
    updated_genreusers = response.json()
    updated_genre_ids = {genreuser["genre_id"] for genreuser in updated_genreusers}
    assert updated_genre_ids == {2, 3, 4}

    # Tester la mise à jour avec des genres inexistants
    update_data = {"genre_ids": [5, 6]}
    response = client.put("/api/v1/genreusers/", json=update_data, headers=headers)
    assert response.status_code == 200
    updated_genreusers = response.json()
    updated_genre_ids = {genreuser["genre_id"] for genreuser in updated_genreusers}
    assert updated_genre_ids == {5, 6}

    # Tester la suppression de tous les genres
    update_data = {"genre_ids": []}
    response = client.put("/api/v1/genreusers/", json=update_data, headers=headers)
    assert response.status_code == 200
    updated_genreusers = response.json()
    assert len(updated_genreusers) == 0
