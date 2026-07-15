import { useState } from "react"
import { FaArrowRight } from "react-icons/fa"

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=600&auto=format&fit=crop",
]

function TripPlannerForm({ onPlanTrip }) {

  const [destination, setDestination] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [travelers, setTravelers] = useState(1)
  const [error, setError] = useState("")

  const handleSubmit = () => {

    if (!destination.trim() || !startDate || !endDate) {
      setError("Please fill destination, start date and end date.")
      return
    }

    if (new Date(endDate) < new Date(startDate)) {
      setError("End date can't be before start date.")
      return
    }

    onPlanTrip({
      id: Date.now(),
      name: `${destination} Trip`,
      location: destination,
      startDate,
      endDate,
      travelers: Array.from({ length: Math.min(travelers, 4) }).map(
        () => "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop"
      ),
      image: FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)],
    })

    setDestination("")
    setStartDate("")
    setEndDate("")
    setTravelers(1)
    setError("")

  }

  return (

    <div className="bg-white rounded-2xl border border-[#ececec] shadow-sm p-5">

      <h2 className="text-[15px] font-bold text-[#111827]">
        Trip Planner
      </h2>

      <p className="text-[12px] text-[#6b7280] mt-0.5">
        Plan your next adventure in simple steps
      </p>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 items-end">

        <div>
          <label className="text-[11px] text-[#6b7280] block mb-1">Where to?</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g. Manali, Bali, Singapore"
            className="w-full h-[40px] border border-[#ececec] rounded-lg px-3 outline-none text-[12.5px]"
          />
        </div>

        <div>
          <label className="text-[11px] text-[#6b7280] block mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full h-[40px] border border-[#ececec] rounded-lg px-3 outline-none text-[12.5px]"
          />
        </div>

        <div>
          <label className="text-[11px] text-[#6b7280] block mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full h-[40px] border border-[#ececec] rounded-lg px-3 outline-none text-[12.5px]"
          />
        </div>

        <div className="flex gap-2">

          <div className="flex-1">
            <label className="text-[11px] text-[#6b7280] block mb-1">Travelers</label>
            <input
              type="number"
              min="1"
              max="10"
              value={travelers}
              onChange={(e) => setTravelers(Number(e.target.value))}
              className="w-full h-[40px] border border-[#ececec] rounded-lg px-3 outline-none text-[12.5px]"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="h-[40px] shrink-0 px-4 bg-[#2563eb] hover:bg-[#1d4ed8] transition text-white rounded-lg text-[12.5px] font-semibold flex items-center gap-1.5"
          >
            Plan My Trip
            <FaArrowRight className="text-[11px]" />
          </button>

        </div>

      </div>

      {error && (
        <p className="mt-3 text-[11.5px] text-[#dc2626]">
          {error}
        </p>
      )}

    </div>

  )
}

export default TripPlannerForm