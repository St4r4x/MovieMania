from typing import Any

from sqlmodel import Session, select

from app.core.security import get_password_hash, verify_password
from app.models import MovieUser, MovieUserCreate, User, UserCreate, UserUpdate, GenreUser, GenreUserCreate, Genres


def create_user(*, session: Session, user_create: UserCreate) -> User:
    # Crée l'utilisateur avec le mot de passe hashé
    db_obj_user = User.model_validate(
        user_create, update={"password": get_password_hash(user_create.password)}
    )
    session.add(db_obj_user)
    session.commit()
    
    # Récupère tous les genres d'un seul coup
    genres = session.query(Genres).filter(Genres.genre_id.in_(user_create.genres)).all()
    
    # Crée et ajoute les entrées GenreUser pour chaque genre valide
    genre_users = []
    for genre in genres:
        genre_user = GenreUser.model_validate(
            {"genre_id": genre.genre_id, "user_id": db_obj_user.user_id}
        )
        session.add(genre_user)
        genre_users.append(genre_user)
    
    # Effectue un seul commit pour toutes les opérations
    session.commit()

    # Rafraîchit l'état des objets ajoutés
    session.refresh(db_obj_user)
    for genre_user in genre_users:
        session.refresh(genre_user)

    return db_obj_user


def update_user(*, session: Session, db_user: User, user_in: UserUpdate) -> Any:
    user_data = user_in.model_dump(exclude_unset=True)
    extra_data = {}
    if "password" in user_data:
        password = user_data["password"]
        hashed_password = get_password_hash(password)
        extra_data["password"] = hashed_password
    db_user.sqlmodel_update(user_data, update=extra_data)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


def get_user_by_email(*, session: Session, email: str) -> User | None:
    statement = select(User).where(User.email == email)
    session_user = session.execute(statement).scalars().first()
    return session_user


def get_user_by_id(*, session: Session, id: str) -> User | None:
    statement = select(User).where(User.user_id == id)
    session_user = session.execute(statement).scalars().first()
    return session_user


def authenticate(*, session: Session, email: str, password: str) -> User | None:
    db_user = get_user_by_email(session=session, email=email)
    if not db_user:
        return None
    if not verify_password(password, db_user.password):
        return None
    return db_user


def create_movieuser(
    *, session: Session, movieuser_in: MovieUserCreate, user_id: int
) -> MovieUser:
    db_item = MovieUser.model_validate(movieuser_in, update={"user_id": user_id})
    session.add(db_item)
    session.commit()
    session.refresh(db_item)
    return db_item

def create_genreuser(
    *, session: Session, genreuser_in: GenreUserCreate, user_id: int
) -> GenreUser:
    db_item = GenreUser.model_validate(genreuser_in, update={"user_id": user_id})
    session.add(db_item)
    session.commit()
    session.refresh(db_item)
    return db_item
