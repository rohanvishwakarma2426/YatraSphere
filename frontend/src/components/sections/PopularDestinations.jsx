import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { FaStar, FaChevronRight, FaChevronLeft, FaSpinner } from "react-icons/fa"

const DESTINATION_LOOKS = {
  manali: { region: "Himachal Pradesh", tag: "Budget Friendly", tagColor: "bg-[#2563eb]", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600&auto=format&fit=crop" },
  kasol: { region: "Himachal Pradesh", tag: "Hidden Gem", tagColor: "bg-[#7c3aed]", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=600&auto=format&fit=crop" },
  goa: { region: "Goa", tag: "Beach Paradise", tagColor: "bg-[#0891b2]", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop" },
  "leh ladakh": { region: "Jammu & Kashmir", tag: "Adventure", tagColor: "bg-[#ea580c]", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=600&auto=format&fit=crop" },
  ladakh: { region: "Jammu & Kashmir", tag: "Adventure", tagColor: "bg-[#ea580c]", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=600&auto=format&fit=crop" },
  varanasi: { region: "Uttar Pradesh", tag: "Spiritual", tagColor: "bg-[#16a34a]", image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=600&auto=format&fit=crop" },
  jaipur: { region: "Rajasthan", tag: "Heritage", tagColor: "bg-[#ca8a04]", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=600&auto=format&fit=crop" },
  udaipur: { region: "Rajasthan", tag: "Heritage", tagColor: "bg-[#ca8a04]", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=600&auto=format&fit=crop" },
  nainital: { region: "Uttarakhand", tag: "Lakes", tagColor: "bg-[#0891b2]", image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=600&auto=format&fit=crop" },
  munnar: { region: "Kerala", tag: "Hidden Gem", tagColor: "bg-[#7c3aed]", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=600&auto=format&fit=crop" },
  rishikesh: { region: "Uttarakhand", tag: "Adventure", tagColor: "bg-[#ea580c]", image: "https://images.unsplash.com/photo-1591018871816-a13f5a2e9f9d?q=80&w=600&auto=format&fit=crop" },
}

const DEFAULT_LOOK = { region: "India", tag: "Trending", tagColor: "bg-[#111827]", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=600&auto=format&fit=crop" }

function PopularDestinations() {

  const scrollRef = useRef(null)
  const navigate = useNavigate()

  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    let cancelled = false

    axios.get("http://127.0.0.1:8000/posts")
      .then((res) => {
        if (cancelled) return

        const counts = {}

        for (const p of res.data) {
          const loc = (p.location || "").trim()
          if (!loc) continue
          const key = loc.toLowerCase()
          if (!counts[key]) counts[key] = { name: loc, count: 0 }
          counts[key].count += 1
        }

        const ranked = Object.values(counts)
          .sort((a, b) => b.count - a.count)
          .slice(0, 10)
          .map((d) => {
            const look = DESTINATION_LOOKS[d.name.toLowerCase()] || DEFAULT_LOOK
            return { ...d, ...look }
          })

        setDestinations(ranked)
      })
      .catch((err) => console.error("Failed to load popular destinations:", err))
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }

  }, [])

  const scroll = (dir) => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir * 210, behavior: "smooth" })
  }

  return (

    <div>

      <div className="flex items-center justify-between mb-3">

        <h2 className="text-[18px] font-bold text-[#111827] dark:text-gray-100">
          Popular Destinations 🔥
        </h2>

        <span
          onClick={() => navigate("/explore")}
          className="text-[#2563eb] dark:text-blue-400 text-[13px] font-semibold cursor-pointer hover:underline"
        >
          View All
        </span>

      </div>

      {loading ? (

        <div className="flex items-center gap-2 text-[#6b7280] dark:text-gray-400 text-[13px] py-8 justify-center">
          <FaSpinner className="animate-spin" /> Loading destinations...
        </div>

      ) : destinations.length === 0 ? (

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-[#ececec] dark:border-gray-800 p-8 text-center text-[#6b7280] dark:text-gray-400 text-[13px]">
          No destinations yet — posts tagged with a location will show up here.
        </div>

      ) : (

        <div className="relative">

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-2 [&::-webkit-scrollbar]:hidden"
          >

            {destinations.map((d) => (

              <div
                key={d.name}
                onClick={() => navigate(`/location/${encodeURIComponent(d.name)}`)}
                className="relative shrink-0 w-[190px] h-[220px] rounded-2xl overflow-hidden cursor-pointer group"
              >

                <img
                  src={d.image}
                  alt={d.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                <span
                  className={`absolute top-3 left-3 ${d.tagColor} text-white text-[10px] font-semibold px-2.5 py-1 rounded-full`}
                >
                  {d.tag}
                </span>

                <div className="absolute bottom-3 left-3 right-3 text-white">

                  <h3 className="text-[16px] font-bold">
                    {d.name}
                  </h3>

                  <p className="text-[11px] text-white/85 mt-0.5">
                    {d.region}
                  </p>

                  <div className="flex items-center gap-1 mt-1.5 text-[11px]">
                    <FaStar className="text-yellow-400" />
                    <span>{d.count} post{d.count === 1 ? "" : "s"}</span>
                  </div>

                </div>

              </div>

            ))}

          </div>

          <button
            onClick={() => scroll(-1)}
            className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 w-[32px] h-[32px] bg-white dark:bg-gray-800 rounded-full shadow-md items-center justify-center text-[#4b5563] dark:text-gray-300 hover:bg-[#f5f7fb] dark:hover:bg-gray-700"
          >
            <FaChevronLeft className="text-[12px]" />
          </button>

          <button
            onClick={() => scroll(1)}
            className="absolute -right-3 top-1/2 -translate-y-1/2 w-[32px] h-[32px] bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center text-[#4b5563] dark:text-gray-300 hover:bg-[#f5f7fb] dark:hover:bg-gray-700"
          >
            <FaChevronRight className="text-[12px]" />
          </button>

        </div>

      )}

    </div>

  )
}

export default PopularDestinations