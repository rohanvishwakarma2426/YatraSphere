const API_BASE = "http://127.0.0.1:8000"

export async function searchGuides(query, limit = 6) {

  const q = query.trim()
  if (!q) return []

  const url = `${API_BASE}/api/guides/search?q=${encodeURIComponent(q)}`

  try {

    const res = await fetch(url)
    if (!res.ok) return []

    const data = await res.json()

    return data.slice(0, limit).map((guide) => ({
      id: guide.id,
      name: guide.title,
      fullAddress: [guide.category, guide.destination].filter(Boolean).join(" · "),
      description: guide.content,
      readingTime: guide.reading_time,
    }))

  } catch (err) {
    console.error("Guide search failed:", err)
    return []
  }

}