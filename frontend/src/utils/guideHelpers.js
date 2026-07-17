import {
  FaWallet,
  FaShieldAlt,
  FaSuitcaseRolling,
  FaUtensils,
  FaRoute,
  FaCalendarAlt,
} from "react-icons/fa"

// Single source of truth for the 6 "guide" categories. A post tagged with
// one of these keys automatically becomes searchable via Guide Search
// (backend: GET /api/guides/search) — it's just a normal community post
// under the hood, this list only drives the UI (form + search filters).
export const GUIDE_CATEGORIES = [
  { key: "budget_guide", label: "Budget Guide", desc: "Cost breakdowns & money-saving tips", icon: FaWallet, bg: "bg-[#e9f9ef]", color: "text-[#16a34a]" },
  { key: "safety_guide", label: "Safety Guide", desc: "Stay safe, avoid scams & risks", icon: FaShieldAlt, bg: "bg-[#fdeaea]", color: "text-[#dc2626]" },
  { key: "packing_list", label: "Packing List", desc: "What to carry for the trip", icon: FaSuitcaseRolling, bg: "bg-[#eaf1ff]", color: "text-[#2563eb]" },
  { key: "food_guide", label: "Food Guide", desc: "Local food & where to eat", icon: FaUtensils, bg: "bg-[#fff4e6]", color: "text-[#d97706]" },
  { key: "itinerary", label: "Itinerary", desc: "Day-by-day trip plan", icon: FaRoute, bg: "bg-[#f2edfd]", color: "text-[#7c3aed]" },
  { key: "best_time", label: "Best Time to Visit", desc: "Seasons, weather & timing", icon: FaCalendarAlt, bg: "bg-[#eaf6fd]", color: "text-[#0891b2]" },
]

export const GUIDE_CATEGORY_KEYS = GUIDE_CATEGORIES.map((c) => c.key)

export function getGuideCategoryMeta(key) {
  return GUIDE_CATEGORIES.find((c) => c.key === key) || null
}