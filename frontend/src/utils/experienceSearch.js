const API_BASE = "http://127.0.0.1:8000"

export async function searchExperiences(query, limit = 6) {

  const q = query.trim()
  if (!q) return []

  const url = `${API_BASE}/api/experience/search?q=${encodeURIComponent(q)}`

  try {

    const res = await fetch(url)
    if (!res.ok) return []

    const data = await res.json()

    return data.slice(0, limit).map((exp) => ({
      id: exp.id,
      name: exp.title,
      fullAddress: [exp.category, exp.destination].filter(Boolean).join(" · "),
      description: exp.description,
      likes: exp.likes,
    }))

  } catch (err) {
    console.error("Experience search failed:", err)
    return []
  }

}
export async function createExperience({ title, destination, category, description, author }) {

  const url = `${API_BASE}/api/experience/create`

  try {

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, destination, category, description, author }),
    })

    if (!res.ok) {
      const errorBody = await res.json().catch(() => null)
      throw new Error(errorBody?.detail || "Failed to publish experience.")
    }

    return await res.json()

  } catch (err) {
    console.error("Create experience failed:", err)
    throw err
  }

}