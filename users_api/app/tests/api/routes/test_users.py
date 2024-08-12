# test_api.py
from app.tests.conftest import conftest

client = conftest.configure_test_app()


def test_read_users_with_role_user():
    user_data = {"username": "newuser@example.com", "password": "newpassword3"}
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
    assert len(response.json()["data"]) == 5
    assert response.json()["data"][0]["email"] == "admin@example.com"


def test_read_own_user():
    user_data = {"username": "newuser@example.com", "password": "newpassword3"}
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
    response = client.get("/api/v1/users/4", headers=headers)
    assert response.status_code == 200
    assert response.json()["email"] == "newuser@example.com"


def test_update_own_user():
    user_data = {"username": "newuser@example.com", "password": "newpassword3"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    new_data = {"nom": "newuser3"}
    response = client.put("/api/v1/users/me", json=new_data, headers=headers)
    assert response.status_code == 200
    assert response.json()["nom"] == "newuser3"


def test_update_user_by_id_with_role_admin():
    user_data = {"username": "admin@example.com", "password": "password"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    new_data = {"email": "newuser1@example.com"}
    response = client.put("/api/v1/users/4", json=new_data, headers=headers)
    assert response.status_code == 200
    assert response.json()["email"] == "newuser1@example.com"


def test_update_user_by_id_with_role_user():
    user_data = {"username": "newuser1@example.com", "password": "newpassword3"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    new_data = {
        "email": "newuser3@example.com",
        "is_active": "true",
        "is_superuser": "false",
        "full_name": "newuser3",
    }
    response = client.put("/api/v1/users/4", json=new_data, headers=headers)
    assert response.status_code == 400
    assert response.json()["detail"] == "The user doesn't have enough privileges"


def test_update_user_by_id_with_role_admin_not_found():
    user_data = {"username": "admin@example.com", "password": "password"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    new_data = {"email": "newuser1@example.com"}
    response = client.put("/api/v1/users/99", json=new_data, headers=headers)
    assert response.status_code == 404
    assert (
        response.json()["detail"]
        == "The user with this id does not exist in the system"
    )


def test_update_user_by_id_with_role_admin_email_already_exists():
    user_data = {"username": "admin@example.com", "password": "password"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    new_data = {"email": "admin@example.com"}
    response = client.put("/api/v1/users/3", json=new_data, headers=headers)
    assert response.status_code == 409
    assert response.json()["detail"] == "User with this email already exists"


def test_delete_user_by_id_with_role_admin():
    user_data = {"username": "admin@example.com", "password": "password"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    response = client.delete("/api/v1/users/2", headers=headers)
    assert response.status_code == 200
    assert response.json()["message"] == "User deleted successfully"
    response = client.get("/api/v1/users/2", headers=headers)
    assert response.status_code == 404
    assert (
        response.json()["detail"]
        == "The user with this id does not exist in the system"
    )


def test_delete_user_by_id_with_role_user():
    user_data = {"username": "deleteuser@example.com", "password": "password"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    response = client.delete("/api/v1/users/4", headers=headers)
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
    assert (
        response.json()["detail"] == "Super users are not allowed to delete themselves"
    )


def test_update_own_password():
    user_data = {"username": "newuser1@example.com", "password": "newpassword3"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    new_data = {"current_password": "newpassword3", "new_password": "newpassword2"}
    response = client.put("/api/v1/users/me/password/", json=new_data, headers=headers)
    assert response.status_code == 200
    assert response.json()["message"] == "Password updated successfully"


def test_update_own_password_wrong_password():
    user_data = {"username": "newuser1@example.com", "password": "newpassword2"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    new_data = {"current_password": "newpassword", "new_password": "newpassword3"}
    response = client.put("/api/v1/users/me/password/", json=new_data, headers=headers)
    assert response.status_code == 400
    assert response.json()["detail"] == "Incorrect password"


def test_update_own_password_same_password():
    user_data = {"username": "newuser1@example.com", "password": "newpassword2"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    new_data = {"current_password": "newpassword2", "new_password": "newpassword2"}
    response = client.put("/api/v1/users/me/password/", json=new_data, headers=headers)
    assert response.status_code == 400
    assert (
        response.json()["detail"]
        == "New password cannot be the same as the current one"
    )

def test_delete_user_me_with_role_user():
    user_data = {"username": "newuser1@example.com", "password": "newpassword2"}
    response = client.post("/api/v1/login/access-token", data=user_data)
    token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    response = client.delete("/api/v1/users/me", headers=headers)
    assert response.status_code == 200
    assert response.json()["message"] == "User deleted successfully"