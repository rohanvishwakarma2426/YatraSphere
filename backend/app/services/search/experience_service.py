from sqlalchemy.orm import Session
from app.models.experience_model import Experience
from app.database.connection import SessionLocal

async def search_experiences(db: Session, query: str):

    results = (
        db.query(Experience)
        .filter(
            (Experience.title.ilike(f"%{query}%"))
            | (Experience.category.ilike(f"%{query}%"))
            | (Experience.destination.ilike(f"%{query}%"))
        )
        .all()
    )

    return results


def create_experience(db: Session, title: str, destination: str, category: str, description: str, author: str):

    new_experience = Experience(
        query=title.lower(),
        title=title,
        destination=destination,
        category=category,
        description=description,
        author=author,
        likes=0,
    )

    db.add(new_experience)
    db.commit()
    db.refresh(new_experience)

    return new_experience