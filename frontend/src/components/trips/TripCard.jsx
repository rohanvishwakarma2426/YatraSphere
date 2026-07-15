import { useState } from "react"
import { FaMapMarkerAlt, FaEllipsisH } from "react-icons/fa"
import { getTripBadge, getTripProgress, formatDateRange } from "../../utils/tripHelpers"

function TripCard({ trip, onMoveToWishlist, onDelete }) {

  const [menuOpen, setMenuOpen] = useState(false)
  const badge = getTripBadge(trip)
  const { totalDays, completedDays } = getTripProgress(trip)
  const percent = totalDays ? Math.round((completedDays / totalDays) * 100) : 0

  return (

    <div className="bg-white rounded-2xl border border-[#ececec] shadow-sm overflow-hidden">

      {/* IMAGE */}

      <div className="relative h-[140px]">

        <img src={trip.image} alt={trip.name} className="w-full h-full object-cover" />

        <span className={`absolute top-3 left-3 ${badge.color} text-white text-[10px] font-semibold px-2.5 py-1 rounded-full`}>
          {badge.text}
        </span>

        <div className="absolute top-2.5 right-2.5">

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="w-[26px] h-[26px] rounded-full bg-white/90 flex items-center justify-center text-[#4b5563] hover:bg-white"
          >
            <FaEllipsisH className="text-[11px]" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-1 w-[160px] bg-white rounded-xl shadow-lg border border-[#ececec] py-1.5 z-10">

              <button
                onClick={() => { onMoveToWishlist(trip.id); setMenuOpen(false) }}
                className="w-full text-left px-3.5 py-2 text-[12px] text-[#374151] hover:bg-[#f5f7fb]"
              >
                Move to Wishlist
              </button>

              <button
                onClick={() => { onDelete(trip.id); setMenuOpen(false) }}
                className="w-full text-left px-3.5 py-2 text-[12px] text-[#dc2626] hover:bg-[#fdeaea]"
              >
                Delete Trip
              </button>

            </div>
          )}

        </div>

      </div>

      {/* CONTENT */}

      <div className="p-4">

        <h3 className="text-[15px] font-bold text-[#111827]">
          {trip.name}
        </h3>

        <p className="text-[11.5px] text-[#9ca3af] mt-1">
          {formatDateRange(trip.startDate, trip.endDate)} · {totalDays} Days
        </p>

        <div className="flex items-center gap-1.5 text-[11.5px] text-[#6b7280] mt-1.5">
          <FaMapMarkerAlt className="text-[10px]" />
          {trip.location}
        </div>

        {/* TRAVELERS */}

        <div className="flex items-center mt-3">

          {trip.travelers.slice(0, 3).map((avatar, i) => (
            <img
              key={i}
              src={avatar}
              alt="traveler"
              className="w-[24px] h-[24px] rounded-full object-cover border-2 border-white -ml-2 first:ml-0"
            />
          ))}

          {trip.travelers.length > 3 && (
            <div className="w-[24px] h-[24px] rounded-full bg-[#eef4ff] text-[#2563eb] text-[9px] font-bold flex items-center justify-center border-2 border-white -ml-2">
              +{trip.travelers.length - 3}
            </div>
          )}

        </div>

        {/* PROGRESS */}

        <p className="text-[10.5px] text-[#9ca3af] mt-3">
          {completedDays}/{totalDays} Days {badge.text === "Completed" ? "Completed" : "Elapsed"}
        </p>

        <div className="mt-1.5 h-[5px] bg-[#f0f1f3] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#2563eb] rounded-full transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>

      </div>

    </div>

  )
}

export default TripCard