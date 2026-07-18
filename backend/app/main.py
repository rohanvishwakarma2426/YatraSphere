from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.database.connection import engine
from app.database.base import Base

from app.models import user_model, post_model, destination_model, experience_model

from app.routes.auth_routes import router as auth_router
from app.routes.post_routes import router as post_router
from app.routes.search_routes import router as search_router
from app.routes.upload_routes import router as upload_router

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

# Serves uploaded images at http://127.0.0.1:8000/uploads/<filename>

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# ROUTES

app.include_router(auth_router)
app.include_router(post_router)
app.include_router(search_router)
app.include_router(upload_router)


@app.get("/")
def home():
    return {
        "message": "YatraSphere Backend Running 🚀"
    }