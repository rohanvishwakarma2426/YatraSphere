from sqlalchemy.orm import Session
from app.models.guide_model import Guide


async def search_guides(db: Session, query: str):

    results = (
        db.query(Guide)
        .filter(
            (Guide.title.ilike(f"%{query}%"))
            | (Guide.category.ilike(f"%{query}%"))
            | (Guide.destination.ilike(f"%{query}%"))
        )
        .all()
    )

    return results