from typing import Any, List

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import MovieUser, MovieUserCreate, MovieUserOut, MovieUserOut, Message

router = APIRouter()


@router.get("/", response_model=MovieUserOut)
def read_movieusers(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve movieusers.
    """

    if current_user.is_superuser:
        count_statement = select(func.count()).select_from(MovieUser)
        count = session.execute(count_statement).one()
        statement = select(MovieUser).offset(skip).limit(limit)
        movieusers_tuple = session.execute(statement).all()
    else:
        count_statement = (
            select(func.count())
            .select_from(MovieUser)
            .where(MovieUser.user_id == current_user.user_id)
        )
        count = session.execute(count_statement).one()
        statement = (
            select(MovieUser)
            .where(MovieUser.user_id == current_user.user_id)
            .offset(skip)
            .limit(limit)
        )
        movieusers_tuple = session.execute(statement).all()

    def convert_users_to_medialikesout(
        movieusers: List[tuple],
    ) -> List[MovieUserOut]:
        return [
            MovieUserOut(
                movie_id=movieuser[0].movie_id,
                user_id=movieuser[0].user_id,
            )
            for movieuser in movieusers
        ]

    movieusers_out = convert_users_to_medialikesout(movieusers_tuple)
    print(count)

    return MovieUserOut(data=movieusers_out, count=count)


@router.get("/{id}", response_model=MovieUserCreate)
def read_movieuser(session: SessionDep, current_user: CurrentUser, id: int) -> Any:
    """
    Get movieuser by ID.
    """
    movieuser = session.get(MovieUser, id)
    if not movieuser:
        raise HTTPException(status_code=404, detail="movieuser not found")
    if not current_user.is_superuser and (movieuser.user_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return movieuser


@router.post("/", response_model=MovieUserOut)
def create_movieuser(
    *, session: SessionDep, current_user: CurrentUser, movieuser_in: MovieUserCreate
) -> Any:
    """
    Create new movieuser.
    """
    movieuser = MovieUser.model_validate(
        movieuser_in, update={"user_id": current_user.user_id}
    )
    session.add(movieuser)
    session.commit()
    session.refresh(movieuser)
    return movieuser


@router.delete("/{id}")
def delete_movieuser(
    session: SessionDep, current_user: CurrentUser, id: int
) -> Message:
    """
    Delete an movieuser.
    """
    movieuser = session.get(MovieUser, id)
    if not movieuser:
        raise HTTPException(status_code=404, detail="movieuser not found")
    if not current_user.is_superuser and (movieuser.user_id != current_user.user_id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    session.delete(movieuser)
    session.commit()
    return Message(message="movieuser deleted successfully")
