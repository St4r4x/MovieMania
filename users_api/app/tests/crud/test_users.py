# crud/test_users.py
from fastapi.encoders import jsonable_encoder

from app.tests.conftest import conftest
from app import crud
from app.core.security import verify_password
from app.models import User, UserCreate, UserUpdate
from app.tests.utils import random_lower_string, random_email

client = conftest.configure_test_app()


def test_create_user():
    email = random_email()
    password = random_lower_string()
    genres = [1, 2, 3]
    user_in = UserCreate(email=email, password=password, genres=genres)
    user = crud.create_user(session=conftest.TestingSessionLocal(), user_create=user_in)
    assert user.email == email
    assert hasattr(user, "password")


def test_authenticate_user():
    email = random_email()
    password = random_lower_string()
    genres = [1, 2, 3]
    user_in = UserCreate(email=email, password=password, genres=genres)
    user = crud.create_user(session=conftest.TestingSessionLocal(), user_create=user_in)
    authenticated_user = crud.authenticate(
        session=conftest.TestingSessionLocal(), email=email, password=password
    )
    assert authenticated_user
    assert user.email == authenticated_user.email


def test_not_authenticate_user():
    email = random_email()
    password = random_lower_string()
    user = crud.authenticate(
        session=conftest.TestingSessionLocal(), email=email, password=password
    )
    assert user is None


def test_if_user_is_active():
    email = random_email()
    password = random_lower_string()
    genres = [1, 2, 3]
    user_in = UserCreate(email=email, password=password, genres=genres)
    user = crud.create_user(session=conftest.TestingSessionLocal(), user_create=user_in)
    assert user.is_active is True


def test_check_if_user_is_active_inactive():
    email = random_email()
    password = random_lower_string()
    genres = [1, 2, 3]
    user_in = UserCreate(email=email, password=password, genres=genres, disabled=True)
    user = crud.create_user(session=conftest.TestingSessionLocal(), user_create=user_in)
    assert user.is_active


def test_check_if_user_is_superuser():
    email = random_email()
    password = random_lower_string()
    genres = [1, 2, 3]
    user_in = UserCreate(
        email=email, password=password, genres=genres, is_superuser=True
    )
    user = crud.create_user(session=conftest.TestingSessionLocal(), user_create=user_in)
    assert user.is_superuser is True


def test_check_if_user_is_superuser_normal_user():
    email = random_email()
    password = random_lower_string()
    genres = [1, 2, 3]
    user_in = UserCreate(
        email=email, password=password, genres=genres, is_superuser=False
    )
    user = crud.create_user(session=conftest.TestingSessionLocal(), user_create=user_in)
    assert user.is_superuser is False


def test_get_user():
    email = random_email()
    password = random_lower_string()
    genres = [1, 2, 3]
    user_in = UserCreate(
        email=email, password=password, genres=genres, is_superuser=True
    )

    with conftest.TestingSessionLocal() as db:
        user = crud.create_user(session=db, user_create=user_in)
        user_2 = db.get(User, user.user_id)
        assert user_2
        assert user.email == user_2.email
        assert jsonable_encoder(user) == jsonable_encoder(user_2)


def test_update_user():
    email = random_email()
    password = random_lower_string()
    genres = [1, 2, 3]
    user_in = UserCreate(
        email=email, password=password, genres=genres, is_superuser=True
    )

    with conftest.TestingSessionLocal() as db:
        user = crud.create_user(session=db, user_create=user_in)
        new_password = random_lower_string()
        user_update = UserUpdate(password=new_password)
        if user.user_id is not None:
            user_updated = crud.update_user(
                session=db, db_user=user, user_in=user_update
            )
        assert user_updated
        assert user.email == user_updated.email
        assert verify_password(new_password, user_updated.password)
