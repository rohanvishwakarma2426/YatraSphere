from fastapi import FastAPI
from app.routes.auth_routes import router as auth_router
from app.routes.search_routes import router as search_router
from fastapi.middleware.cors import CORSMiddleware

from app.database.connection import engine
from app.database.base import Base

from app.models import user_model
from app.models import destination_model
from app.models import experience_model
from app.models import guide_model

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
app.include_router(search_router)


@app.get("/")

def home():

    return {
        "message": "YatraSphere Backend Running 🚀"
    }