from typing import Any, List

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import GenreUser, GenreUserCreate, GenreUserOut, GenreUsersOut, GenreUserOut, Message, GenreUserUpdate

router = APIRouter()


@router.get("/", response_model=GenreUsersOut)
def read_genreusers(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve genreusers.
    """

    if current_user.is_superuser:
        count_statement = select(func.count()).select_from(GenreUser)
        count = session.execute(count_statement).scalar()
        statement = select(GenreUser).offset(skip).limit(limit)
        genreusers = session.execute(statement).scalars().all()
    else:
        count_statement = (
            select(func.count())
            .select_from(GenreUser)
            .where(GenreUser.user_id == current_user.user_id)
        )
        count = session.execute(count_statement).scalar()
        statement = (
            select(GenreUser)
            .where(GenreUser.user_id == current_user.user_id)
            .offset(skip)
            .limit(limit)
        )
        genreusers = session.execute(statement).scalars().all()

    return GenreUsersOut(data=genreusers, count=count)

# Not needed for now
# @router.get("/{id}", response_model=GenreUserOut)
# def read_genreuser(session: SessionDep, current_user: CurrentUser, id: int) -> Any:
#     """
#     Get genreuser by ID.
#     """
#     genreuser = session.get(GenreUser, id)
#     if not genreuser:
#         raise HTTPException(status_code=404, detail="genreuser not found")
#     if not current_user.is_superuser and (genreuser.user_id != current_user.user_id):
#         raise HTTPException(status_code=400, detail="Not enough permissions")
#     return genreuser


@router.post("/", response_model=List[GenreUserOut])
def create_genreuser(
    *, session: SessionDep, current_user: CurrentUser, genreuser_in: GenreUserCreate
) -> Any:
    """
    Create new genreuser.
    """
    tab_genres_user = []
    for genre_id in genreuser_in.genre_id:
        genre_user = GenreUser.model_validate(
            {"genre_id": genre_id, "user_id": current_user.user_id}
        )
        session.add(genre_user)
        tab_genres_user.append(genre_user)
    
    session.commit()
    for genre in tab_genres_user:
        session.refresh(genre)

    return tab_genres_user


@router.patch("/", response_model=List[GenreUserOut])
def update_genreuser(
    genreuser_in: GenreUserUpdate,
    session: SessionDep,
    current_user: CurrentUser
) -> Any:
    """
    Update an existing genreuser.
    """
    existing_genreusers = session.query(GenreUser).filter_by(user_id=current_user.user_id).all()
    existing_genre_ids = {genreuser.genre_id for genreuser in existing_genreusers}
    input_genre_ids = set(genreuser_in.genre_ids)

    # IDs to add
    ids_to_add = input_genre_ids - existing_genre_ids
    # IDs to remove
    ids_to_remove = existing_genre_ids - input_genre_ids

    # Add new genreuser entries
    for genre_id in ids_to_add:
        new_genreuser = GenreUser(genre_id=genre_id, user_id=current_user.user_id)
        session.add(new_genreuser)

    # Remove genreuser entries
    for genreuser in existing_genreusers:
        if genreuser.genre_id in ids_to_remove:
            session.delete(genreuser)

    session.commit()

    # Refresh and return updated genreuser list
    updated_genreusers = session.query(GenreUser).filter_by(user_id=current_user.user_id).all()
    return updated_genreusers

# Not needed for now
# @router.delete("/{id}")
# def delete_genreuser(
#     session: SessionDep, current_user: CurrentUser, id: int
# ) -> Message:
#     """
#     Delete an genreuser.
#     """
#     genreuser = session.get(GenreUser, id)
#     if not genreuser:
#         raise HTTPException(status_code=404, detail="genreuser not found")
#     if genreuser.user_id != current_user.user_id:
#         raise HTTPException(status_code=400, detail="Not enough permissions")
#     session.delete(genreuser)
#     session.commit()
#     return Message(message="genreuser deleted successfully")
