const API_BASE = "http://127.0.0.1:8000"

// Backend PostOut only has: title, content, location, category, created_at
// (no "destination"/"reading_time" fields) — so we derive fullAddress from
// location and estimate reading time from content length ourselves.
function estimateReadingTime(content) {
  const words = (content || "").trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200)) + " min read"
}

export async function searchGuides(query, limit = 6, category = null) {

  const q = (query || "").trim()
  if (!q && !category) return []

  const params = new URLSearchParams()
  if (q) params.set("q", q)
  if (category) params.set("category", category)

  const url = `${API_BASE}/api/guides/search?${params.toString()}`

  try {

    const res = await fetch(url)
    if (!res.ok) return []

    const data = await res.json()

    return data.slice(0, limit).map((guide) => ({
      id: guide.id,
      name: guide.title,
      category: guide.category,
      location: guide.location,
      fullAddress: guide.location || "",
      description: guide.content,
      readingTime: estimateReadingTime(guide.content),
      createdAt: guide.created_at,
      author: guide.author?.name || "Traveler",
    }))

  } catch (err) {
    console.error("Guide search failed:", err)
    return []
  }

}