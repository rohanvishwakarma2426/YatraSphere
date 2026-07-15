import {
  FaThLarge,
  FaMountain,
  FaUmbrellaBeach,
  FaCity,
  FaPlaceOfWorship,
  FaWater,
  FaTree,
  FaCampground,
  FaTint,
  FaLandmark,
  FaShip,
} from "react-icons/fa"

// Category pills at the top + the "Browse by Category" grid both read from
// this single list, so counts/icons/labels stay in sync everywhere.
export const EXPLORE_CATEGORIES = [
  { key: null, label: "All", icon: FaThLarge },
  { key: "Mountains", label: "Mountains", icon: FaMountain, count: "120+ Places", bg: "bg-[#eaf1ff]", color: "text-[#2563eb]" },
  { key: "Beaches", label: "Beaches", icon: FaUmbrellaBeach, count: "85+ Places", bg: "bg-[#e9f9ef]", color: "text-[#16a34a]" },
  { key: "Cities", label: "Cities", icon: FaCity, count: "150+ Places", bg: "bg-[#eaf1ff]", color: "text-[#1d4ed8]" },
  { key: "Temples", label: "Temples", icon: FaPlaceOfWorship, count: "95+ Places", bg: "bg-[#fff4e6]", color: "text-[#d97706]" },
  { key: "Lakes", label: "Lakes", icon: FaWater, count: "60+ Places", bg: "bg-[#eaf6fd]", color: "text-[#0891b2]" },
  { key: "Forests", label: "Forests", icon: FaTree, count: "70+ Places", bg: "bg-[#e9f9ef]", color: "text-[#16a34a]" },
  { key: "Adventure", label: "Adventure", icon: FaCampground, count: "110+ Places", bg: "bg-[#fff0e9]", color: "text-[#ea580c]" },
  { key: "Waterfalls", label: "Waterfalls", icon: FaTint, count: "45+ Places", bg: "bg-[#eaf6fd]", color: "text-[#0891b2]" },
  { key: "Heritage", label: "Heritage", icon: FaLandmark, count: "80+ Places", bg: "bg-[#f4ece0]", color: "text-[#92400e]" },
  { key: "Islands", label: "Islands", icon: FaShip, count: "30+ Places", bg: "bg-[#e9f9ef]", color: "text-[#0d9488]" },
]

export const EXPLORE_SORT_OPTIONS = [
  { key: "recommended", label: "Recommended" },
  { key: "rating", label: "Highest Rated" },
  { key: "name", label: "Name: A - Z" },
]

// Single source of truth for turning (destinations + search + category +
// sort) into the final list shown in the Popular Destinations row.
export function filterAndSortDestinations(destinations, { search = "", category = null, sortBy = "recommended" }) {
  const q = search.trim().toLowerCase()

  let result = destinations.filter((d) => {
    const matchesSearch =
      !q ||
      d.name.toLowerCase().includes(q) ||
      d.region.toLowerCase().includes(q)

    const matchesCategory = !category || d.category === category

    return matchesSearch && matchesCategory
  })

  if (sortBy === "rating") result = [...result].sort((a, b) => b.rating - a.rating)
  if (sortBy === "name") result = [...result].sort((a, b) => a.name.localeCompare(b.name))

  return result
}