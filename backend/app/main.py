from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.connection import engine
from app.database.base import Base

from app.models import user_model, post_model

from app.routes.auth_routes import router as auth_router
from app.routes.post_routes import router as post_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ROUTES

app.include_router(auth_router)
app.include_router(post_router)


@app.get("/")
def home():
    return {
        "message": "YatraSphere Backend Running 🚀"
    }