import { FaArrowRight } from "react-icons/fa"

const STATS = [
  { value: "1000+", label: "Packages" },
  { value: "50+", label: "Destinations" },
  { value: "10K+", label: "Happy Travelers" },
  { value: "4.8★", label: "Average Rating" },
]

function PackagesHero() {

  return (

    <div className="relative rounded-2xl overflow-hidden h-[280px] flex flex-col justify-between">

      {/* BACKGROUND IMAGE */}

      <img
        src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop"
        alt="Mountain adventure"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* TEXT */}

      <div className="relative z-10 p-8 max-w-[420px]">

        <h1 className="text-white text-[28px] font-bold leading-9">
          Your Next Adventure Starts Here!
        </h1>

        <p className="text-white/85 text-[13.5px] mt-3 leading-5">
          Discover curated packages and create memories for a lifetime.
        </p>

        <button className="mt-5 bg-white text-[#111827] text-[13px] font-semibold px-5 h-[42px] rounded-xl flex items-center gap-2 hover:scale-[1.02] transition">
          Explore Now
          <FaArrowRight className="text-[11px]" />
        </button>

      </div>

      {/* STATS STRIP */}

      <div className="relative z-10 mx-6 mb-6 bg-black/40 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between">

        {STATS.map((stat) => (
          <div key={stat.label} className="text-center px-2">
            <h3 className="text-white text-[16px] font-bold">{stat.value}</h3>
            <p className="text-white/75 text-[10.5px] mt-0.5 whitespace-nowrap">{stat.label}</p>
          </div>
        ))}

      </div>

    </div>

  )
}

export default PackagesHero