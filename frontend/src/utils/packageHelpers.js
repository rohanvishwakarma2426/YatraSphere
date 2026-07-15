import {
  FaThLarge,
  FaMountain,
  FaUmbrellaBeach,
  FaHeart,
  FaUsers,
  FaCrown,
  FaPlaceOfWorship,
  FaSuitcase,
} from "react-icons/fa"

// Category tabs shown at the top of the Packages page.
// "key: null" means "All Packages" (no theme filter applied).
export const PACKAGE_CATEGORIES = [
  { key: null, label: "All Packages", icon: FaThLarge },
  { key: "Adventure", label: "Adventure", icon: FaMountain },
  { key: "Beach", label: "Beach", icon: FaUmbrellaBeach },
  { key: "Honeymoon", label: "Honeymoon", icon: FaHeart },
  { key: "Family", label: "Family", icon: FaUsers },
  { key: "Luxury", label: "Luxury", icon: FaCrown },
  { key: "Spiritual", label: "Spiritual", icon: FaPlaceOfWorship },
  { key: "Weekend Getaway", label: "Weekend Getaway", icon: FaSuitcase },
]

// Left filter sidebar "Travel Theme" checkbox list (has 1 extra vs the tabs).
export const TRAVEL_THEMES = [
  "Adventure",
  "Beach",
  "Honeymoon",
  "Family",
  "Luxury",
  "Spiritual",
  "Weekend Getaway",
  "Backpacking",
]

export const DESTINATIONS = [
  "All Destinations",
  "Ladakh",
  "Goa",
  "Himachal Pradesh",
  "Kerala",
  "Rajasthan",
  "Uttarakhand",
  "Bali",
]

export const TRIP_DURATIONS = [
  { key: "any", label: "Any" },
  { key: "1-3", label: "1-3 Days" },
  { key: "4-6", label: "4-6 Days" },
  { key: "7+", label: "7+ Days" },
]

export const SORT_OPTIONS = [
  { key: "recommended", label: "Recommended" },
  { key: "price-low", label: "Price: Low to High" },
  { key: "price-high", label: "Price: High to Low" },
  { key: "rating", label: "Highest Rated" },
]

// ₹14,999 style Indian-format price string.
export function formatINR(amount) {
  return `₹${Number(amount).toLocaleString("en-IN")}`
}

// Whole trip falls in duration bucket ("1-3" / "4-6" / "7+") based on days count.
function matchesDuration(days, durationKey) {
  if (durationKey === "any") return true
  if (durationKey === "1-3") return days >= 1 && days <= 3
  if (durationKey === "4-6") return days >= 4 && days <= 6
  if (durationKey === "7+") return days >= 7
  return true
}

// Single source of truth for turning (packages + all active filters) into
// the final list shown in the grid. Keeping this out of the component means
// PackagesFilterSidebar, category tabs, search box etc. can all update the
// same "filters" object and the page just re-derives the result.
export function filterAndSortPackages(packages, filters) {
  const {
    search = "",
    category = null,
    destination = "All Destinations",
    maxBudget = 100000,
    duration = "any",
    themes = [],
    minRating = 0,
    sortBy = "recommended",
  } = filters

  let result = packages.filter((pkg) => {
    const matchesSearch =
      !search.trim() ||
      pkg.title.toLowerCase().includes(search.trim().toLowerCase()) ||
      pkg.location.toLowerCase().includes(search.trim().toLowerCase())

    const matchesDestination =
      destination === "All Destinations" || pkg.destination === destination

    const matchesBudget = pkg.price <= maxBudget

    const matchesDur = matchesDuration(pkg.days, duration)

    // Category tab filter (single value) OR Travel Theme checkboxes (multi)
    const matchesCategory = !category || pkg.theme === category
    const matchesThemes = themes.length === 0 || themes.includes(pkg.theme)

    const matchesRating = pkg.rating >= minRating

    return (
      matchesSearch &&
      matchesDestination &&
      matchesBudget &&
      matchesDur &&
      matchesCategory &&
      matchesThemes &&
      matchesRating
    )
  })

  if (sortBy === "price-low") result = [...result].sort((a, b) => a.price - b.price)
  if (sortBy === "price-high") result = [...result].sort((a, b) => b.price - a.price)
  if (sortBy === "rating") result = [...result].sort((a, b) => b.rating - a.rating)

  return result
}

// Badge (top-left of card) color per label — keeps every PackageCard in sync.
export const BADGE_STYLES = {
  "Best Seller": "bg-[#f97316]",
  Popular: "bg-[#16a34a]",
  Trending: "bg-[#7c3aed]",
  New: "bg-[#2563eb]",
}