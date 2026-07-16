import { useState, useMemo } from "react"
import { FaSearch, FaCheckDouble, FaTimes } from "react-icons/fa"

import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import AlertCard from "../../components/alerts/AlertCard"
import AlertsSidebar from "../../components/alerts/AlertsSidebar"
import { CATEGORIES, CATEGORY_META, groupAlertsByDay } from "../../utils/alertHelpers"

const now = Date.now()

export const INITIAL_ALERTS = [
  {
    id: 1,
    category: "safety",
    title: "Heavy Rainfall Alert in Manali",
    description: "Heavy rainfall expected in Manali over the next 24 hours. Carry rain gear and avoid rivers and vulnerable areas.",
    location: "Manali, Himachal Pradesh",
    time: "10:30 AM",
    timestamp: now - 10 * 60 * 1000,
    read: false,
    image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: 2,
    category: "weather",
    title: "Rain Expected in Udaipur Tomorrow",
    description: "Light to moderate rain expected in Udaipur. Temperature range 24° / 18°.",
    location: "Udaipur, Rajasthan",
    time: "1:20 PM",
    timestamp: now - 60 * 60 * 1000,
    read: false,
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: 3,
    category: "booking",
    title: "Hotel Booking Confirmed",
    description: "Your hotel booking in Leh on 12 Jul - 18 Jul, 2025 is confirmed.",
    location: "Leh, Ladakh",
    time: "2:15 PM",
    timestamp: now - 2 * 60 * 60 * 1000,
    read: false,
    ctaLabel: "View Booking",
  },
  {
    id: 4,
    category: "safety",
    title: "Ghat Overcrowding Alert in Varanasi",
    description: "Dashashwamedh Ghat is experiencing heavy crowding ahead of the evening aarti. Plan for extra travel time.",
    location: "Varanasi, Uttar Pradesh",
    time: "3:40 PM",
    timestamp: now - 3 * 60 * 60 * 1000,
    read: false,
  },
  {
    id: 5,
    category: "weather",
    title: "Fog Advisory for Varanasi Mornings",
    description: "Dense fog expected between 5 AM - 8 AM this week. Flight and train delays are likely.",
    location: "Varanasi, Uttar Pradesh",
    time: "6:00 AM",
    timestamp: now - 5 * 60 * 60 * 1000,
    read: true,
  },
  {
    id: 6,
    category: "offers",
    title: "Special Offer Just for You!",
    description: "Get up to 30% OFF on your next trip to Bali. Offer valid for a limited time.",
    location: "Bali, Indonesia",
    time: "Yesterday, 11:30 AM",
    timestamp: now - 26 * 60 * 60 * 1000,
    read: false,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: 7,
    category: "community",
    title: "Rahul liked your post",
    description: "Rahul liked your photo from Kedarnath Trip.",
    location: "Community Activity",
    time: "Yesterday, 09:15 AM",
    timestamp: now - 28 * 60 * 60 * 1000,
    read: false,
    image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: 8,
    category: "booking",
    title: "Boat Ride Booking Confirmed",
    description: "Your sunrise Ganga boat ride in Varanasi on 20 Jul, 2026 is confirmed.",
    location: "Varanasi, Uttar Pradesh",
    time: "Yesterday, 08:05 PM",
    timestamp: now - 30 * 60 * 60 * 1000,
    read: true,
    ctaLabel: "View Booking",
  },
]

function Alerts() {

  const [alerts, setAlerts] = useState(INITIAL_ALERTS)
  const [activeCategory, setActiveCategory] = useState("all")
  const [locationQuery, setLocationQuery] = useState("")

  const locationFiltered = useMemo(() => {
    const q = locationQuery.trim().toLowerCase()
    if (!q) return alerts
    return alerts.filter((a) => a.location.toLowerCase().includes(q))
  }, [alerts, locationQuery])

  const categoryCounts = useMemo(() => {
    const counts = { all: 0 }
    CATEGORIES.forEach((c) => { counts[c] = 0 })
    locationFiltered.forEach((a) => {
      if (!a.read) {
        counts.all += 1
        counts[a.category] += 1
      }
    })
    return counts
  }, [locationFiltered])

  const visibleAlerts = useMemo(() => {
    if (activeCategory === "all") return locationFiltered
    return locationFiltered.filter((a) => a.category === activeCategory)
  }, [locationFiltered, activeCategory])

  const grouped = useMemo(() => groupAlertsByDay(visibleAlerts), [visibleAlerts])

  const handleToggleRead = (id) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, read: !a.read } : a)))
  }

  const handleDismiss = (id) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id))
  }

  const handleMarkAllRead = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, read: true })))
  }

  return (

    <div>

      <Navbar />

      <div className="flex">

        <Sidebar />

        <div className="flex-1 min-w-0 p-4 flex flex-col xl:flex-row gap-4 items-start">

          {/* MAIN COLUMN */}

          <div className="flex-1 min-w-0 flex flex-col gap-4">

            {/* HEADER */}

            <div className="flex items-center justify-between flex-wrap gap-3">

              <div>
                <h1 className="text-[20px] font-bold text-[#111827]">
                  Alerts
                </h1>
                <p className="text-[12.5px] text-[#6b7280] mt-0.5">
                  Stay updated with important information for your travels.
                </p>
              </div>

              <button
                onClick={handleMarkAllRead}
                className="h-[36px] px-4 border border-[#ececec] rounded-lg text-[12.5px] font-semibold text-[#374151] flex items-center gap-1.5 hover:bg-[#f7f8fb] transition"
              >
                <FaCheckDouble className="text-[11px]" />
                Mark all as read
              </button>

            </div>

            {/* LOCATION SEARCH */}

            <div className="relative">

              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[12px] text-[#9ca3af]" />

              <input
                type="text"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder="Filter by location, e.g. Varanasi..."
                className="w-full h-[42px] bg-white border border-[#ececec] rounded-xl pl-9 pr-9 outline-none text-[12.5px] shadow-sm"
              />

              {locationQuery && (
                <button
                  onClick={() => setLocationQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#111827] transition"
                >
                  <FaTimes className="text-[12px]" />
                </button>
              )}

            </div>

            {/* CATEGORY TABS */}

            <div className="bg-white rounded-2xl border border-[#ececec] shadow-sm p-1.5 flex items-center gap-1.5 w-fit flex-wrap">

              <button
                onClick={() => setActiveCategory("all")}
                className={`h-[32px] px-4 rounded-xl text-[12.5px] font-semibold flex items-center gap-1.5 transition ${
                  activeCategory === "all"
                    ? "bg-[#eef4ff] text-[#2563eb]"
                    : "text-[#4b5563] hover:bg-[#f5f7fb]"
                }`}
              >
                All
                <span className="bg-[#2563eb] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {categoryCounts.all}
                </span>
              </button>

              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`h-[32px] px-4 rounded-xl text-[12.5px] font-semibold flex items-center gap-1.5 transition ${
                    activeCategory === cat
                      ? "bg-[#eef4ff] text-[#2563eb]"
                      : "text-[#4b5563] hover:bg-[#f5f7fb]"
                  }`}
                >
                  {CATEGORY_META[cat].label}
                  {categoryCounts[cat] > 0 && (
                    <span
                      className="text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{ backgroundColor: CATEGORY_META[cat].dot }}
                    >
                      {categoryCounts[cat]}
                    </span>
                  )}
                </button>
              ))}

            </div>

            {/* ALERT LIST */}

            {Object.keys(grouped).length > 0 ? (

              <div className="flex flex-col gap-5">

                {Object.entries(grouped).map(([day, dayAlerts]) => (

                  <div key={day}>

                    <h2 className="text-[12px] font-semibold text-[#9ca3af] uppercase tracking-wide mb-2">
                      {day}
                    </h2>

                    <div className="flex flex-col gap-2.5">
                      {dayAlerts.map((alert) => (
                        <AlertCard
                          key={alert.id}
                          alert={alert}
                          onToggleRead={handleToggleRead}
                          onDismiss={handleDismiss}
                        />
                      ))}
                    </div>

                  </div>

                ))}

              </div>

            ) : (

              <div className="bg-white rounded-2xl border border-[#ececec] p-10 text-center text-[#6b7280] text-[13px]">
                {locationQuery
                  ? `No alerts found for "${locationQuery}".`
                  : "No alerts in this category."}
              </div>

            )}

          </div>

          {/* RIGHT SIDEBAR */}

          <AlertsSidebar unreadCounts={categoryCounts} unreadTotal={categoryCounts.all} />

        </div>

      </div>

    </div>

  )
}

export default Alerts