import {
  FaCampground,
  FaHiking,
  FaMoon,
  FaCoffee,
  FaWater,
  FaUserAlt,
  FaGem,
} from "react-icons/fa"

// Single source of truth for the 7 "experience" categories. A post tagged
// with one of these keys automatically becomes searchable via Experience
// Search (backend: GET /api/experience/search) — it's just a normal
// community post under the hood, this list only drives the UI.
export const EXPERIENCE_CATEGORIES = [
  { key: "camping", label: "Camping", desc: "Campsites & outdoor stays", icon: FaCampground, bg: "bg-[#e9f9ef]", color: "text-[#16a34a]" },
  { key: "trekking", label: "Trekking", desc: "Trails, treks & hikes", icon: FaHiking, bg: "bg-[#eaf1ff]", color: "text-[#2563eb]" },
  { key: "nightlife", label: "Nightlife", desc: "Clubs, bars & night scenes", icon: FaMoon, bg: "bg-[#f2edfd]", color: "text-[#7c3aed]" },
  { key: "cafes", label: "Cafes", desc: "Cafes & cozy hangout spots", icon: FaCoffee, bg: "bg-[#fff4e6]", color: "text-[#d97706]" },
  { key: "river_rafting", label: "River Rafting", desc: "Rafting & water adventures", icon: FaWater, bg: "bg-[#eaf6fd]", color: "text-[#0891b2]" },
  { key: "solo_trips", label: "Solo Trips", desc: "Solo travel experiences", icon: FaUserAlt, bg: "bg-[#fdeaea]", color: "text-[#dc2626]" },
  { key: "hidden_gems", label: "Hidden Gems", desc: "Offbeat & lesser-known spots", icon: FaGem, bg: "bg-[#f3f4f6]", color: "text-[#6b7280]" },
]

export const EXPERIENCE_CATEGORY_KEYS = EXPERIENCE_CATEGORIES.map((c) => c.key)

export function getExperienceCategoryMeta(key) {
  return EXPERIENCE_CATEGORIES.find((c) => c.key === key) || null
}