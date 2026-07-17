from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List

from app.database.connection import get_db
from app.services.search.destination_service import search_destinations
from app.services.search.experience_service import search_experiences, create_experience
from app.schemas.search_schema import DestinationOut, ExperienceOut, ExperienceCreate

router = APIRouter()


# ================= DESTINATION SEARCH =================

@router.get("/api/search", response_model=List[DestinationOut])
async def destination_search(
    q: str = Query(..., min_length=1),
    type: str = Query("destination"),
    db: Session = Depends(get_db),
):
    results = await search_destinations(db, q)
    return results


# ================= EXPERIENCE SEARCH =================

@router.get("/api/experience/search", response_model=List[ExperienceOut])
async def experience_search(
    q: str = Query(..., min_length=1),
    db: Session = Depends(get_db),
):
    results = await search_experiences(db, q)
    return results


@router.post("/api/experience/create", response_model=ExperienceOut)
async def create_new_experience(
    payload: ExperienceCreate,
    db: Session = Depends(get_db),
):
    result = create_experience(
        db=db,
        title=payload.title,
        destination=payload.destination,
        category=payload.category,
        description=payload.description,
        author=payload.author,
    )
    return result

# NOTE: Guide search now lives entirely in app/routes/post_routes.py
# (GET /api/guides/search) — guides are just Posts with a guide-category,
# not a separate table. See guide_model.py deletion note in PROJECT_RULES.md.