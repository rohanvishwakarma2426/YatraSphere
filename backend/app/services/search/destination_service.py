from sqlalchemy.orm import Session
from app.models.destination_model import Destination
from app.services.search.external_apis import (
    fetch_destination_from_nominatim,
    fetch_wikipedia_summary,
)


async def search_destinations(db: Session, query: str):

    # 1. Check the PostgreSQL cache first — case-insensitive match on the
    #    exact query someone searched before.
    cached = (
        db.query(Destination)
        .filter(Destination.query.ilike(query))
        .all()
    )

    if cached:
        return cached

    # 2. Cache miss — call the free external API.
    raw_results = await fetch_destination_from_nominatim(query)

    if not raw_results:
        return []

    # 3. Enrich the first (best) match with a real photo + description
    #    from Wikipedia — keeps us from hammering Wikipedia for every result.
    best_name = raw_results[0]["display_name"].split(",")[0]
    wiki = await fetch_wikipedia_summary(best_name)

    saved_rows = []

    for place in raw_results:
        address = place.get("address", {})

        row = Destination(
            query=query,
            city=place["display_name"].split(",")[0],
            state=address.get("state"),
            country=address.get("country"),
            latitude=float(place["lat"]) if place.get("lat") else None,
            longitude=float(place["lon"]) if place.get("lon") else None,
            image=wiki["image"] if wiki else None,
            description=wiki["description"] if wiki else None,
            rating=None,
        )

        db.add(row)
        saved_rows.append(row)

    # 4. Save to PostgreSQL so the next search for this query is instant.
    db.commit()

    for row in saved_rows:
        db.refresh(row)

    return saved_rows