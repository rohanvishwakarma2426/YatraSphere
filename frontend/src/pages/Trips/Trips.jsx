import { useState, useMemo } from "react"
import {
  FaRobot, FaBoxOpen, FaMoneyBillWave, FaFileAlt, FaMapMarkedAlt, FaHeadset,
} from "react-icons/fa"

import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import TripCard from "../../components/trips/TripCard"
import TripPlannerForm from "../../components/trips/TripPlannerForm"
import BudgetCalculatorBox from "../../components/trips/BudgetCalculatorBox"
import TripsSidebar from "../../components/trips/TripsSidebar"
import { getTripStatus } from "../../utils/tripHelpers"

const INITIAL_TRIPS = [
  {
    id: 1,
    name: "Leh Ladakh Trip",
    location: "Leh, Ladakh",
    startDate: "2026-07-10",
    endDate: "2026-07-18",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=600&auto=format&fit=crop",
    travelers: [
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=200&auto=format&fit=crop",
    ],
  },
  {
    id: 2,
    name: "Spiti Valley Road Trip",
    location: "Spiti, Himachal Pradesh",
    startDate: "2026-08-02",
    endDate: "2026-08-10",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600&auto=format&fit=crop",
    travelers: [
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    ],
  },
  {
    id: 3,
    name: "Goa Beach Holiday",
    location: "Goa",
    startDate: "2026-05-08",
    endDate: "2026-05-12",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
    travelers: [
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=200&auto=format&fit=crop",
    ],
  },
  {
    id: 4,
    name: "Kedarnath Yatra",
    location: "Kedarnath, Uttarakhand",
    startDate: "2026-09-21",
    endDate: "2026-09-25",
    image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=600&auto=format&fit=crop",
    travelers: [
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&auto=format&fit=crop",
    ],
  },
]

const INITIAL_WISHLIST = [
  {
    id: 101,
    name: "Andaman Islands",
    image: "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 102,
    name: "Rishikesh River Rafting",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=600&auto=format&fit=crop",
  },
]

const INITIAL_BUDGET = {
  total: 45000,
  spent: 12800,
  categories: { Transport: 5000, Stay: 4500, Food: 2300, Activities: 1000 },
}

const QUICK_ACCESS = [
  { icon: FaFileAlt, label: "Itinerary", desc: "View or edit your plan", bg: "bg-[#eaf1ff]", color: "text-[#2563eb]" },
  { icon: FaMoneyBillWave, label: "Expense Tracker", desc: "Track your expenses", bg: "bg-[#e9f9ef]", color: "text-[#16a34a]" },
  { icon: FaBoxOpen, label: "Packing List", desc: "Manage your checklist", bg: "bg-[#fff4e6]", color: "text-[#d97706]" },
  { icon: FaFileAlt, label: "Travel Documents", desc: "View your documents", bg: "bg-[#eaf1ff]", color: "text-[#2563eb]" },
  { icon: FaMapMarkedAlt, label: "Route Map", desc: "See your route", bg: "bg-[#f2edfd]", color: "text-[#7c3aed]" },
  { icon: FaHeadset, label: "AI Assistant", desc: "Ask travel related questions", bg: "bg-[#fdeaea]", color: "text-[#dc2626]" },
]

function Trips() {

  const [trips, setTrips] = useState(INITIAL_TRIPS)
  const [wishlist, setWishlist] = useState(INITIAL_WISHLIST)
  const [budget, setBudget] = useState(INITIAL_BUDGET)
  const [activeTab, setActiveTab] = useState("upcoming") // upcoming | past | wishlist
  const [wishInput, setWishInput] = useState("")

  const upcomingTrips = useMemo(
    () => trips.filter((t) => getTripStatus(t) === "upcoming"),
    [trips]
  )

  const pastTrips = useMemo(
    () => trips.filter((t) => getTripStatus(t) === "past"),
    [trips]
  )

  const handlePlanTrip = (newTrip) => {
    setTrips((prev) => [newTrip, ...prev])
    setActiveTab(getTripStatus(newTrip))
  }

  const handleMoveToWishlist = (id) => {
    const trip = trips.find((t) => t.id === id)
    if (!trip) return
    setWishlist((prev) => [{ id: trip.id, name: trip.location, image: trip.image }, ...prev])
    setTrips((prev) => prev.filter((t) => t.id !== id))
  }

  const handleDeleteTrip = (id) => {
    setTrips((prev) => prev.filter((t) => t.id !== id))
  }

  const handleAddToBudget = (estimate) => {
    setBudget((prev) => {
      const categories = { ...prev.categories }
      Object.entries(estimate.categories).forEach(([key, val]) => {
        categories[key] = (categories[key] || 0) + val
      })
      return { ...prev, total: prev.total + estimate.total, categories }
    })
  }

  const handleAddWish = () => {
    if (!wishInput.trim()) return
    setWishlist((prev) => [
      {
        id: Date.now(),
        name: wishInput.trim(),
        image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=600&auto=format&fit=crop",
      },
      ...prev,
    ])
    setWishInput("")
  }

  const handlePlanFromWishlist = (item) => {
    setWishlist((prev) => prev.filter((w) => w.id !== item.id))
    setActiveTab("upcoming")
    // Pre-fills nothing automatically here — the Trip Planner form below stays
    // ready for the user to pick real dates for this destination.
  }

  const visibleTrips = activeTab === "upcoming" ? upcomingTrips : activeTab === "past" ? pastTrips : []

  return (

    <div>

      <Navbar />

      <div className="flex">

        <Sidebar />

        <div className="flex-1 min-w-0 p-4 flex flex-col xl:flex-row gap-4 items-start">

          {/* MAIN COLUMN */}

          <div className="flex-1 min-w-0 flex flex-col gap-4">

            {/* HEADER + TABS */}

            <div>

              <h1 className="text-[20px] font-bold text-[#111827] mb-3">
                My Trips
              </h1>

              <div className="bg-white rounded-2xl border border-[#ececec] shadow-sm p-1.5 flex items-center gap-1.5 w-fit">

                {["upcoming", "past", "wishlist"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 h-[36px] rounded-xl text-[13px] font-semibold capitalize transition ${
                      activeTab === tab
                        ? "bg-[#2563eb] text-white"
                        : "text-[#4b5563] hover:bg-[#f5f7fb]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}

              </div>

            </div>

            {/* TRIP GRID */}

            {activeTab !== "wishlist" ? (

              visibleTrips.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {visibleTrips.map((trip) => (
                    <TripCard
                      key={trip.id}
                      trip={trip}
                      onMoveToWishlist={handleMoveToWishlist}
                      onDelete={handleDeleteTrip}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-[#ececec] p-8 text-center text-[#6b7280] text-[13px]">
                  No {activeTab} trips yet. Plan one below!
                </div>
              )

            ) : (

              <div className="bg-white rounded-2xl border border-[#ececec] shadow-sm p-5">

                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="text"
                    value={wishInput}
                    onChange={(e) => setWishInput(e.target.value)}
                    placeholder="Add a dream destination to your wishlist..."
                    className="flex-1 h-[40px] border border-[#ececec] rounded-lg px-3 outline-none text-[12.5px]"
                  />
                  <button
                    onClick={handleAddWish}
                    className="h-[40px] px-4 bg-[#2563eb] hover:bg-[#1d4ed8] transition text-white rounded-lg text-[12.5px] font-semibold"
                  >
                    Add
                  </button>
                </div>

                {wishlist.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {wishlist.map((item) => (
                      <div key={item.id} className="rounded-xl overflow-hidden border border-[#ececec]">
                        <img src={item.image} alt={item.name} className="w-full h-[100px] object-cover" />
                        <div className="p-3">
                          <h3 className="text-[12.5px] font-semibold text-[#111827] truncate">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => handlePlanFromWishlist(item)}
                            className="mt-2 w-full h-[30px] bg-[#eef4ff] text-[#2563eb] rounded-lg text-[11px] font-semibold hover:bg-[#dbe7ff] transition"
                          >
                            Plan This Trip
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[12.5px] text-[#9ca3af] text-center py-6">
                    Your wishlist is empty. Add a destination above.
                  </p>
                )}

              </div>

            )}

            {/* AI ITINERARY BANNER */}

            <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 flex items-center justify-between overflow-hidden">

              <div>
                <h2 className="text-white text-[16px] font-bold">
                  Not sure where to go next?
                </h2>
                <p className="text-white/70 text-[12.5px] mt-1 max-w-[280px]">
                  Let our AI build the perfect itinerary for you.
                </p>
                <button className="mt-3 bg-white text-[#111827] text-[12.5px] font-semibold px-4 h-[36px] rounded-lg flex items-center gap-2">
                  <FaRobot className="text-[13px]" />
                  Generate Itinerary
                </button>
              </div>

              <FaRobot className="hidden sm:block text-white/10 text-[90px]" />

            </div>

            {/* TRIP PLANNER */}

            <TripPlannerForm onPlanTrip={handlePlanTrip} />

            {/* BUDGET CALCULATOR */}

            <BudgetCalculatorBox onAddToBudget={handleAddToBudget} />

            {/* QUICK ACCESS */}

            <div>

              <h2 className="text-[15px] font-bold text-[#111827] mb-3">
                Quick Access
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">

                {QUICK_ACCESS.map(({ icon: Icon, label, desc, bg, color }) => (
                  <div
                    key={label}
                    className="bg-white rounded-xl border border-[#ececec] shadow-sm p-3.5 cursor-pointer hover:shadow-md transition"
                  >
                    <div className={`w-[34px] h-[34px] rounded-lg flex items-center justify-center ${bg}`}>
                      <Icon className={`text-[14px] ${color}`} />
                    </div>
                    <h3 className="mt-2.5 text-[12.5px] font-semibold text-[#111827]">
                      {label}
                    </h3>
                    <p className="mt-0.5 text-[10.5px] text-[#6b7280] leading-4">
                      {desc}
                    </p>
                  </div>
                ))}

              </div>

            </div>

          </div>

          {/* RIGHT SIDEBAR */}

          <TripsSidebar budget={budget} />

        </div>

      </div>

    </div>

  )
}

export default Trips