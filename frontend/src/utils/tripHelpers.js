// Converts a trip's start/end dates into a live status against today's date.
// No manual "status" field needed — everything is derived.

export function getTripBadge(trip) {
  const today = new Date()
  const start = new Date(trip.startDate)
  const end = new Date(trip.endDate)

  if (end < today) return { text: "Completed", color: "bg-[#6b7280]" }

  if (start > today) {
    const diffDays = Math.ceil((start - today) / 86400000)
    return { text: `In ${diffDays} Day${diffDays !== 1 ? "s" : ""}`, color: "bg-[#16a34a]" }
  }

  return { text: "Ongoing", color: "bg-[#2563eb]" }
}

export function getTripStatus(trip) {
  const today = new Date()
  const end = new Date(trip.endDate)
  return end < today ? "past" : "upcoming"
}

export function getTripProgress(trip) {
  const today = new Date()
  const start = new Date(trip.startDate)
  const end = new Date(trip.endDate)

  const totalDays = Math.round((end - start) / 86400000) + 1

  let completedDays = 0
  if (today > end) completedDays = totalDays
  else if (today >= start) completedDays = Math.round((today - start) / 86400000) + 1

  return {
    totalDays,
    completedDays: Math.max(0, Math.min(completedDays, totalDays)),
  }
}

export function formatDateRange(startDate, endDate) {
  const opts = { day: "2-digit", month: "short", year: "numeric" }
  const start = new Date(startDate).toLocaleDateString("en-GB", opts)
  const end = new Date(endDate).toLocaleDateString("en-GB", opts)
  return `${start} - ${end}`
}

// Rough per-day cost estimate by travel style, split across common categories.
const STYLE_RATES = {
  "Budget Travel": 1200,
  "Mid-Range": 2800,
  "Luxury": 6000,
}

const CATEGORY_SPLIT = {
  Transport: 0.3,
  Stay: 0.35,
  Food: 0.2,
  Activities: 0.15,
}

export function estimateBudget(days, style) {
  const perDay = STYLE_RATES[style] || STYLE_RATES["Budget Travel"]
  const total = perDay * days

  const categories = {}
  Object.entries(CATEGORY_SPLIT).forEach(([key, pct]) => {
    categories[key] = Math.round((total * pct) / 50) * 50
  })

  return { total, categories }
}