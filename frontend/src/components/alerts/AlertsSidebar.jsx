import { useState } from "react"
import { FaMapMarkedAlt, FaCog, FaChevronDown, FaChevronRight } from "react-icons/fa"
import { CATEGORY_META, CATEGORIES } from "../../utils/alertHelpers"

const WEATHER_OVERVIEW = [
  { location: "Manali", temp: "18°", condition: "Heavy Rain", icon: "🌧️" },
  { location: "Leh", temp: "12°", condition: "Partly Cloudy", icon: "⛅" },
  { location: "Udaipur", temp: "24°", condition: "Light Rain", icon: "🌦️" },
]

const MAP_PINS = [
  { top: "20%", left: "58%", type: "safety" },
  { top: "40%", left: "28%", type: "weather" },
  { top: "58%", left: "72%", type: "safety" },
  { top: "70%", left: "42%", type: "safety" },
]

function UnreadDonut({ counts, total }) {

  const radius = 40
  const circumference = 2 * Math.PI * radius
  let offset = 0

  return (

    <svg viewBox="0 0 100 100" className="w-[110px] h-[110px] -rotate-90">

      <circle cx="50" cy="50" r={radius} fill="none" stroke="#f0f1f3" strokeWidth="14" />

      {total > 0 && CATEGORIES.map((cat) => {
        const val = counts[cat] || 0
        if (!val) return null
        const fraction = val / total
        const dash = fraction * circumference
        const circle = (
          <circle
            key={cat}
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={CATEGORY_META[cat].dot}
            strokeWidth="14"
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeDashoffset={-offset}
            strokeLinecap="butt"
          />
        )
        offset += dash
        return circle
      })}

    </svg>

  )
}

function AlertsSidebar({ unreadCounts, unreadTotal }) {

  const [prefsOpen, setPrefsOpen] = useState(false)

  return (

    <div className="w-full xl:w-[300px] xl:shrink-0 flex flex-col gap-4">

      {/* MAP */}

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#ececec]">

        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[14px] font-bold text-[#111827]">
            Active Travel Alerts
          </h2>
          <span className="text-[#2563eb] text-[12px] font-semibold cursor-pointer flex items-center gap-1">
            <FaMapMarkedAlt className="text-[10px]" />
            View Map
          </span>
        </div>

        <div className="relative h-[150px] rounded-xl overflow-hidden bg-[#e8f0e4]">

          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop"
            alt="map"
            className="w-full h-full object-cover opacity-60"
          />

          {MAP_PINS.map((pin, i) => (
            <span
              key={i}
              className={`absolute w-[20px] h-[20px] rounded-full flex items-center justify-center text-white text-[9px] font-bold border-2 border-white shadow ${
                pin.type === "safety" ? "bg-[#dc2626]" : "bg-[#2563eb]"
              }`}
              style={{ top: pin.top, left: pin.left, transform: "translate(-50%, -50%)" }}
            >
              !
            </span>
          ))}

        </div>

      </div>

      {/* WEATHER */}

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#ececec]">

        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[14px] font-bold text-[#111827]">
            Weather Overview
          </h2>
          <span className="text-[#2563eb] text-[12px] font-semibold cursor-pointer">
            View Full Forecast
          </span>
        </div>

        <div className="space-y-2.5">

          {WEATHER_OVERVIEW.map((w) => (
            <div key={w.location} className="flex items-center justify-between text-[12px]">

              <span className="flex items-center gap-2 text-[#374151]">
                <span className="text-[15px]">{w.icon}</span>
                {w.location}
              </span>

              <span className="text-[#6b7280]">
                <span className="font-semibold text-[#111827]">{w.temp}</span> {w.condition}
              </span>

            </div>
          ))}

        </div>

      </div>

      {/* UNREAD DONUT */}

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#ececec]">

        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[14px] font-bold text-[#111827]">
            Unread Alerts
          </h2>
          <span className="text-[#2563eb] text-[12px] font-semibold cursor-pointer">
            View All
          </span>
        </div>

        <div className="flex items-center gap-4">

          <div className="relative shrink-0">

            <UnreadDonut counts={unreadCounts} total={unreadTotal} />

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[20px] font-bold text-[#111827]">{unreadTotal}</span>
              <span className="text-[9px] text-[#9ca3af]">Total</span>
            </div>

          </div>

          <div className="space-y-1.5">

            {CATEGORIES.map((cat) => (
              <div key={cat} className="flex items-center gap-2 text-[11px] text-[#374151]">
                <span className="w-[8px] h-[8px] rounded-full" style={{ backgroundColor: CATEGORY_META[cat].dot }} />
                {CATEGORY_META[cat].label}
                <span className="text-[#9ca3af]">{unreadCounts[cat] || 0}</span>
              </div>
            ))}

          </div>

        </div>

      </div>

      {/* PREFERENCES */}

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#ececec]">

        <div className="flex items-center gap-2 mb-1">
          <FaCog className="text-[12px] text-[#6b7280]" />
          <h2 className="text-[14px] font-bold text-[#111827]">
            Alert Preferences
          </h2>
        </div>

        <p className="text-[11.5px] text-[#6b7280] mb-3">
          Manage what alerts you want to receive.
        </p>

        <button
          onClick={() => setPrefsOpen((v) => !v)}
          className="w-full h-[38px] border border-[#ececec] rounded-lg text-[12px] font-semibold text-[#374151] flex items-center justify-between px-3.5 hover:bg-[#f7f8fb] transition"
        >
          Manage Preferences
          {prefsOpen ? <FaChevronDown className="text-[10px]" /> : <FaChevronRight className="text-[10px]" />}
        </button>

        {prefsOpen && (
          <div className="mt-3 space-y-2">
            {CATEGORIES.map((cat) => (
              <label key={cat} className="flex items-center justify-between text-[12px] text-[#374151]">
                {CATEGORY_META[cat].label}
                <input type="checkbox" defaultChecked className="accent-[#2563eb] w-[14px] h-[14px]" />
              </label>
            ))}
          </div>
        )}

      </div>

    </div>

  )
}

export default AlertsSidebar