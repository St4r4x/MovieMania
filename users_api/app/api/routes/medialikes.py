from typing import Any, List

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import MediaLike, MediaLikeCreate, MediaLikeOut, MediaLikesOut, Message

router = APIRouter()


@router.get("/", response_model=MediaLikesOut)
def read_medialikes(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve medialikes.
    """

    if current_user.is_superuser:
        count_statement = select(func.count()).select_from(MediaLike)
        count = session.execute(count_statement).one()
        statement = select(MediaLike).offset(skip).limit(limit)
        medialikes = session.execute(statement).all()
    else:
        count_statement = (
            select(func.count())
            .select_from(MediaLike)
            .where(MediaLike.owner_id == current_user.id)
        )
        count = session.execute(count_statement).one()
        statement = (
            select(MediaLike)
            .where(MediaLike.owner_id == current_user.id)
            .offset(skip)
            .limit(limit)
        )
        medialikes_tuple = session.execute(statement).all()

        def convert_users_to_medialikesout(
            medialikes: List[tuple],
        ) -> List[MediaLikesOut]:
            return [
                MediaLikesOut(
                    id=medialike[0].id,
                    owner_id=medialike[0].owner_id,
                )
                for medialike in medialikes
            ]

        medialikes_out = convert_users_to_medialikesout(medialikes_tuple)
        print(count)

    return MediaLikesOut(data=medialikes_out, count=count)


@router.get("/{id}", response_model=MediaLikeOut)
def read_medialike(session: SessionDep, current_user: CurrentUser, id: int) -> Any:
    """
    Get medialike by ID.
    """
    medialike = session.get(MediaLike, id)
    if not medialike:
        raise HTTPException(status_code=404, detail="medialike not found")
    if not current_user.is_superuser and (medialike.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return medialike


@router.post("/", response_model=MediaLikeOut)
def create_medialike(
    *, session: SessionDep, current_user: CurrentUser, medialike_in: MediaLikeCreate
) -> Any:
    """
    Create new medialike.
    """
    medialike = MediaLike.model_validate(
        medialike_in, update={"owner_id": current_user.id}
    )
    session.add(medialike)
    session.commit()
    session.refresh(medialike)
    return medialike


@router.delete("/{id}")
def delete_medialike(
    session: SessionDep, current_user: CurrentUser, id: int
) -> Message:
    """
    Delete an medialike.
    """
    medialike = session.get(MediaLike, id)
    if not medialike:
        raise HTTPException(status_code=404, detail="medialike not found")
    if not current_user.is_superuser and (medialike.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    session.delete(medialike)
    session.commit()
    return Message(message="medialike deleted successfully")
