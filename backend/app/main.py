from fastapi import FastAPI
from app.routes.auth_routes import router as auth_router
from fastapi.middleware.cors import CORSMiddleware

from app.database.connection import engine
from app.database.base import Base

from app.models import user_model

from app.routes.auth_routes import router

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(auth_router)

# CORS

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],

)


# ROUTES

app.include_router(router)



@app.get("/")

def home():

    return {
        "message": "YatraSphere Backend Running 🚀"
    }