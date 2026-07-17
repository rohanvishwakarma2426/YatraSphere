from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.services.search.destination_service import search_destinations
from app.services.search.experience_service import search_experiences
from app.services.search.guide_service import search_guides
from app.schemas.search_schema import DestinationOut, ExperienceOut, GuideOut
from typing import List
from app.schemas.search_schema import DestinationOut, ExperienceOut, GuideOut, ExperienceCreate
from app.services.search.experience_service import search_experiences, create_experience
router = APIRouter()


@router.get("/api/search", response_model=List[DestinationOut])
async def destination_search(
    q: str = Query(..., min_length=1),
    type: str = Query("destination"),
    db: Session = Depends(get_db),
):
    results = await search_destinations(db, q)
    return results


@router.get("/api/experience/search", response_model=List[ExperienceOut])
async def experience_search(
    q: str = Query(..., min_length=1),
    db: Session = Depends(get_db),
):
    results = await search_experiences(db, q)
    return results


@router.get("/api/guides/search", response_model=List[GuideOut])
async def guide_search(
    q: str = Query(..., min_length=1),
    db: Session = Depends(get_db),
):
    results = await search_guides(db, q)
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