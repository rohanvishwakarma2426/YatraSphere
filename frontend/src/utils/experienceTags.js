// Matches the `category` field on the backend's Experience table
// (see backend/app/models/experience_model.py). Picking one of these on
// Share Experience saves a row to that table via /api/experience/create,
// which is exactly what powers the "Experiences" search tab on the Hero
// section (and /experiences?q=... page) — search there checks Postgres
// first and only these saved rows show up, no external API involved,
// since there isn't a reliable free API for curated experience tags.
export const EXPERIENCE_TAGS = [
  "Camping",
  "Trekking",
  "Nightlife",
  "Cafes",
  "River Rafting",
  "Solo Trips",
  "Hidden Gems",
]