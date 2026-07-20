from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List

from app.database.connection import get_db
from app.services.search.destination_service import search_destinations
from app.schemas.search_schema import DestinationOut

router = APIRouter()


# ================= DESTINATION SEARCH =================
# The only search left in this file — real-world places via Nominatim +
# PostgreSQL cache. Experience and Guide search now live in post_routes.py
# (they're just Post categories, not separate tables).

@router.get("/api/search", response_model=List[DestinationOut])
async def destination_search(
    q: str = Query(..., min_length=1),
    type: str = Query("destination"),
    db: Session = Depends(get_db),
):
    results = await search_destinations(db, q)
    return results