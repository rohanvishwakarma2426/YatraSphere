// Talks to our own FastAPI backend now (which handles Nominatim + Wikipedia
// + PostgreSQL caching internally) instead of calling external APIs directly
// from the browser.

const API_BASE = "http://127.0.0.1:8000"

export async function searchLocations(query, limit = 6) {

  const q = query.trim()
  if (!q) return []

  const url = `${API_BASE}/api/search?q=${encodeURIComponent(q)}&type=destination`

  try {

    const res = await fetch(url)
    if (!res.ok) return []

    const data = await res.json()

    return data.slice(0, limit).map((place) => ({
      id: place.id,
      name: place.city,
      fullAddress: [place.city, place.state, place.country].filter(Boolean).join(", "),
      lat: place.latitude,
      lon: place.longitude,
      image: place.image,
      description: place.description,
    }))

  } catch (err) {
    console.error("Location search failed:", err)
    return []
  }

}

export async function getLocationSummary(name) {

  const results = await searchLocations(name, 1)

  if (results.length === 0) return null

  const place = results[0]

  return {
    title: place.name,
    description: place.description,
    image: place.image,
  }

}