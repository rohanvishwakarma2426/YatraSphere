const API_BASE = "http://127.0.0.1:8000"

// Experience search now queries the unified Post table (posts tagged with
// an experience category) instead of a separate Experience table — real
// user-published posts show up here, not just seed data.
export async function searchExperiences(query, limit = 6) {

  const q = query.trim()
  if (!q) return []

  const url = `${API_BASE}/api/experience/search?q=${encodeURIComponent(q)}`

  try {

    const res = await fetch(url)
    if (!res.ok) return []

    const data = await res.json()

    return data.slice(0, limit).map((post) => ({
      id: post.id,
      name: post.title,
      fullAddress: [post.category, post.location].filter(Boolean).join(" · "),
      description: post.content,
      likes: post.likes_count,
    }))

  } catch (err) {
    console.error("Experience search failed:", err)
    return []
  }

}