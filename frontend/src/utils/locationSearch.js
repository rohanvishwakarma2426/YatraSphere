// Free, keyless location search + geocoding via OpenStreetMap's Nominatim.
// Usage policy: max ~1 request/second, and it's polite to identify your app.
// https://operations.osmfoundation.org/policies/nominatim/

const NOMINATIM_BASE = "https://nominatim.openstreetmap.org"

export async function searchLocations(query, limit = 6) {

  const q = query.trim()
  if (!q) return []

  const url = `${NOMINATIM_BASE}/search?q=${encodeURIComponent(q)}&format=jsonv2&addressdetails=1&limit=${limit}`

  const res = await fetch(url, {
    headers: {
      // Nominatim asks apps to identify themselves — replace with your own domain/email if you have one.
      "Accept-Language": "en",
    },
  })

  if (!res.ok) return []

  const data = await res.json()

  return data.map((place) => ({
    id: place.place_id,
    name: place.display_name.split(",")[0],
    fullAddress: place.display_name,
    lat: place.lat,
    lon: place.lon,
    type: place.type,
  }))

}

// Pulls a real photo + short description for a place from Wikipedia's free
// summary API. Falls back gracefully if the place has no Wikipedia page.
export async function getLocationSummary(name) {

  try {

    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`
    const res = await fetch(url)

    if (!res.ok) return null

    const data = await res.json()

    return {
      title: data.title,
      description: data.extract,
      image: data.thumbnail?.source || data.originalimage?.source || null,
    }

  } catch {
    return null
  }

}