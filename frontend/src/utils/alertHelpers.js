import {
  FaExclamationTriangle,
  FaCloudRain,
  FaSuitcase,
  FaTag,
  FaUsers,
} from "react-icons/fa"

// Central place for category styling + icons so every alert component
// (list, tabs, donut chart) stays visually in sync.
export const CATEGORIES = ["safety", "weather", "booking", "offers", "community"]

export const CATEGORY_META = {
  safety: {
    label: "Safety",
    icon: FaExclamationTriangle,
    text: "text-[#dc2626]",
    bg: "bg-[#fdeaea]",
    dot: "#dc2626",
    pill: "bg-[#fdeaea] text-[#dc2626]",
  },
  weather: {
    label: "Weather",
    icon: FaCloudRain,
    text: "text-[#2563eb]",
    bg: "bg-[#eaf1ff]",
    dot: "#2563eb",
    pill: "bg-[#eaf1ff] text-[#2563eb]",
  },
  booking: {
    label: "Booking",
    icon: FaSuitcase,
    text: "text-[#16a34a]",
    bg: "bg-[#e9f9ef]",
    dot: "#16a34a",
    pill: "bg-[#e9f9ef] text-[#16a34a]",
  },
  offers: {
    label: "Offers",
    icon: FaTag,
    text: "text-[#d97706]",
    bg: "bg-[#fff4e6]",
    dot: "#d97706",
    pill: "bg-[#fff4e6] text-[#d97706]",
  },
  community: {
    label: "Community",
    icon: FaUsers,
    text: "text-[#7c3aed]",
    bg: "bg-[#f2edfd]",
    dot: "#7c3aed",
    pill: "bg-[#f2edfd] text-[#7c3aed]",
  },
}

// "10m ago" / "2h ago" / "Yesterday" / "3d ago" style relative labels.
export function getRelativeTime(timestamp) {
  const diffMs = Date.now() - new Date(timestamp).getTime()
  const diffMin = Math.round(diffMs / 60000)

  if (diffMin < 1) return "Just now"
  if (diffMin < 60) return `${diffMin}m ago`

  const diffHrs = Math.round(diffMin / 60)
  if (diffHrs < 24) return `${diffHrs}h ago`

  const diffDays = Math.round(diffHrs / 24)
  if (diffDays === 1) return "Yesterday"
  return `${diffDays}d ago`
}

// Groups alerts into "Today" / "Yesterday" / formatted-date buckets
// for the day-separated list, preserving the incoming (newest-first) order.
export function groupAlertsByDay(alerts) {
  const groups = {}
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)

  alerts.forEach((alert) => {
    const alertDate = new Date(alert.timestamp)

    let label
    if (alertDate.toDateString() === today.toDateString()) label = "Today"
    else if (alertDate.toDateString() === yesterday.toDateString()) label = "Yesterday"
    else label = alertDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })

    if (!groups[label]) groups[label] = []
    groups[label].push(alert)
  })

  return groups
}