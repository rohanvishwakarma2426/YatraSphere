import { useRef } from "react"
import { FaStar, FaChevronRight, FaChevronLeft } from "react-icons/fa"

const destinations = [
  {
    name: "Manali",
    region: "Himachal Pradesh",
    rating: "4.6 (1.2K)",
    tag: "Budget Friendly",
    tagColor: "bg-[#2563eb]",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Kasol",
    region: "Himachal Pradesh",
    rating: "4.7 (890)",
    tag: "Hidden Gem",
    tagColor: "bg-[#7c3aed]",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Goa",
    region: "Goa",
    rating: "4.5 (2.3K)",
    tag: "Beach Paradise",
    tagColor: "bg-[#0891b2]",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Leh Ladakh",
    region: "Jammu & Kashmir",
    rating: "4.8 (1.1K)",
    tag: "Adventure",
    tagColor: "bg-[#ea580c]",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Varanasi",
    region: "Uttar Pradesh",
    rating: "4.7 (760)",
    tag: "Spiritual",
    tagColor: "bg-[#16a34a]",
    image:
      "https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=600&auto=format&fit=crop",
  },
]

function PopularDestinations() {

  const scrollRef = useRef(null)

  const scroll = (dir) => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir * 210, behavior: "smooth" })
  }

  return (

    <div>

      <div className="flex items-center justify-between mb-3">

        <h2 className="text-[18px] font-bold text-[#111827]">
          Popular Destinations 🔥
        </h2>

        <span className="text-[#2563eb] text-[13px] font-semibold cursor-pointer">
          View All
        </span>

      </div>

      <div className="relative">

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-2 [&::-webkit-scrollbar]:hidden"
        >

          {destinations.map((d) => (

            <div
              key={d.name}
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
                  <span>{d.rating}</span>
                </div>

              </div>

            </div>

          ))}

        </div>

        {/* SCROLL BUTTONS */}

        <button
          onClick={() => scroll(-1)}
          className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 w-[32px] h-[32px] bg-white rounded-full shadow-md items-center justify-center text-[#4b5563] hover:bg-[#f5f7fb]"
        >
          <FaChevronLeft className="text-[12px]" />
        </button>

        <button
          onClick={() => scroll(1)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-[32px] h-[32px] bg-white rounded-full shadow-md flex items-center justify-center text-[#4b5563] hover:bg-[#f5f7fb]"
        >
          <FaChevronRight className="text-[12px]" />
        </button>

      </div>

    </div>

  )
}

export default PopularDestinations
