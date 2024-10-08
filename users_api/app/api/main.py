from fastapi import APIRouter

from app.api.routes import genreusers, movieusers, login, users, utils

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(utils.router, prefix="/utils", tags=["utils"])
api_router.include_router(movieusers.router, prefix="/movieusers", tags=["movieusers"])
api_router.include_router(genreusers.router, prefix="/genreusers", tags=["genreusers"])
