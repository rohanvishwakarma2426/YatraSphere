// All the math for the Budget Calculator lives here, separate from the UI,
// so the form component and the result sidebar can both call the same
// computeBudget() and always agree on numbers.

export const TRIP_TYPES = ["Budget", "Standard", "Luxury"]
export const BUDGET_STYLES = ["Budget", "Balanced", "Luxury"]
export const TRAVELER_OPTIONS = [
  "1 Adult", "2 Adults", "3 Adults", "4 Adults", "2 Adults, 1 Child", "2 Adults, 2 Children",
]
export const DURATION_OPTIONS = [
  "2 Days / 1 Night",
  "3 Days / 2 Nights",
  "4 Days / 3 Nights",
  "5 Days / 4 Nights",
  "7 Days / 6 Nights",
  "10 Days / 9 Nights",
]

// Rough per-person-per-day rate depending on trip type (Budget/Standard/Luxury).
const DAILY_RATE = { Budget: 800, Standard: 1500, Luxury: 3000 }

// Budget "style" (Budget/Balanced/Luxury) nudges the rate up or down further —
// this is the second slider-like control seen in the design ("Balanced" etc).
const STYLE_MULTIPLIER = { Budget: 0.8, Balanced: 1, Luxury: 1.6 }

// Fixed category split — kept identical across every calculation so the
// donut chart / bars always read consistently.
export const CATEGORY_SPLIT = {
  Transport: 0.28,
  Stay: 0.37,
  Food: 0.2,
  Activities: 0.12,
  Others: 0.03,
}

export const CATEGORY_COLORS = {
  Transport: "#7c3aed",
  Stay: "#2563eb",
  Food: "#f97316",
  Activities: "#16a34a",
  Others: "#9ca3af",
}

// Pulls the traveler count out of a label like "2 Adults, 1 Child" -> 3
export function countTravelers(travelersLabel) {
  const matches = travelersLabel.match(/\d+/g)
  return matches ? matches.reduce((sum, n) => sum + Number(n), 0) : 1
}

// Pulls the day count out of a label like "5 Days / 4 Nights" -> 5
export function countDays(durationLabel) {
  const match = durationLabel.match(/(\d+)\s*Days?/)
  return match ? Number(match[1]) : 1
}

// The single function everything else calls.
export function computeBudget({ travelers, duration, tripType, budgetStyle }) {
  const travelerCount = countTravelers(travelers)
  const days = countDays(duration)

  const perPersonPerDay = (DAILY_RATE[tripType] || DAILY_RATE.Standard) * (STYLE_MULTIPLIER[budgetStyle] || 1)
  const total = Math.round((perPersonPerDay * travelerCount * days) / 50) * 50

  const categories = {}
  Object.entries(CATEGORY_SPLIT).forEach(([key, pct]) => {
    categories[key] = Math.round((total * pct) / 50) * 50
  })

  const perDay = Math.round(total / days / 10) * 10
  const dailyEstimate = Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    amount: perDay,
  }))

  return {
    total,
    perPerson: Math.round(total / travelerCount / 10) * 10,
    travelerCount,
    days,
    categories,
    dailyEstimate,
  }
}