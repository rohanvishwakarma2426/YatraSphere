import { useMemo, useRef, useState } from "react"
import { FaSearch, FaFilter, FaChevronLeft, FaChevronRight, FaCompass } from "react-icons/fa"

import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import PlaceCard from "../../components/explore/PlaceCard"
import ExperienceCard from "../../components/explore/ExperienceCard"
import CategoryGrid from "../../components/explore/CategoryGrid"
import { DESTINATIONS, TRENDING_EXPERIENCES } from "../../components/explore/exploreData"
import { EXPLORE_CATEGORIES, EXPLORE_SORT_OPTIONS, filterAndSortDestinations } from "../../utils/exploreHelpers"

function Explore() {

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState(null)
  const [sortBy, setSortBy] = useState("recommended")
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [wishlist, setWishlist] = useState(new Set())

  const destScrollRef = useRef(null)
  const expScrollRef = useRef(null)
  const pillScrollRef = useRef(null)

  const visibleDestinations = useMemo(
    () => filterAndSortDestinations(DESTINATIONS, { search, category, sortBy }),
    [search, category, sortBy]
  )

  const handleToggleWishlist = (id) => {
    setWishlist((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const scrollRow = (ref, dir) => {
    ref.current?.scrollBy({ left: dir * 230, behavior: "smooth" })
  }

  return (

    <div>

      <Navbar />

      <div className="flex">

        <Sidebar />

        <div className="flex-1 min-w-0 p-4 flex flex-col gap-6">

          {/* HEADER */}

          <div className="relative bg-gradient-to-r from-[#eef4ff] to-[#f5f8ff] rounded-2xl p-6 overflow-hidden">

            <FaCompass className="absolute -right-4 -bottom-6 text-[130px] text-[#2563eb]/10 rotate-12" />

            <h1 className="text-[22px] font-bold text-[#111827] relative">
              Explore Places
            </h1>

            <p className="text-[13px] text-[#6b7280] mt-1 relative">
              Discover amazing places around the world
            </p>

          </div>

          {/* SEARCH + FILTERS */}

          <div className="relative flex items-center gap-2">

            <div className="relative flex-1">

              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[12px] text-[#9ca3af]" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search places, destinations, attractions..."
                className="w-full h-[44px] bg-white border border-[#ececec] rounded-xl pl-9 pr-3 outline-none text-[13px] shadow-sm"
              />

            </div>

            <button
              onClick={() => setFiltersOpen((v) => !v)}
              className="h-[44px] px-4 bg-white border border-[#ececec] rounded-xl shadow-sm text-[12.5px] font-semibold text-[#374151] flex items-center gap-2 shrink-0 hover:bg-[#f7f8fb] transition"
            >
              <FaFilter className="text-[11px]" />
              Filters
            </button>

            {filtersOpen && (

              <div className="absolute right-0 top-[52px] w-[220px] bg-white rounded-xl border border-[#ececec] shadow-lg p-3 z-10">

                <p className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-wide mb-2">
                  Sort by
                </p>

                <div className="space-y-1">
                  {EXPLORE_SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => { setSortBy(opt.key); setFiltersOpen(false) }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[12.5px] transition ${
                        sortBy === opt.key
                          ? "bg-[#eef4ff] text-[#2563eb] font-semibold"
                          : "text-[#374151] hover:bg-[#f5f7fb]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

              </div>

            )}

          </div>

          {/* CATEGORY PILLS */}

          <div className="relative">

            <div
              ref={pillScrollRef}
              className="flex items-center gap-2 overflow-x-auto pr-9 scroll-smooth [&::-webkit-scrollbar]:hidden"
            >

              {EXPLORE_CATEGORIES.map(({ key, label }) => (
                <button
                  key={label}
                  onClick={() => setCategory(key)}
                  className={`shrink-0 h-[36px] px-4 rounded-xl text-[12.5px] font-semibold transition ${
                    category === key
                      ? "bg-[#2563eb] text-white"
                      : "bg-white text-[#4b5563] border border-[#ececec] hover:bg-[#f5f7fb]"
                  }`}
                >
                  {label}
                </button>
              ))}

            </div>

            <button
              onClick={() => scrollRow(pillScrollRef, 1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-[28px] h-[28px] rounded-full bg-white border border-[#ececec] shadow-sm flex items-center justify-center text-[#4b5563] hover:text-[#2563eb] transition"
            >
              <FaChevronRight className="text-[10px]" />
            </button>

          </div>

          {/* POPULAR DESTINATIONS */}

          <div>

            <div className="flex items-center justify-between mb-3">

              <h2 className="text-[18px] font-bold text-[#111827]">
                Popular Destinations
              </h2>

              <span className="text-[#2563eb] text-[13px] font-semibold cursor-pointer">
                View All
              </span>

            </div>

            {visibleDestinations.length > 0 ? (

              <div className="relative">

                <div
                  ref={destScrollRef}
                  className="flex gap-4 overflow-x-auto scroll-smooth pb-2 [&::-webkit-scrollbar]:hidden"
                >
                  {visibleDestinations.map((place) => (
                    <PlaceCard
                      key={place.id}
                      place={place}
                      wishlisted={wishlist.has(place.id)}
                      onToggleWishlist={handleToggleWishlist}
                    />
                  ))}
                </div>

                <button
                  onClick={() => scrollRow(destScrollRef, -1)}
                  className="hidden md:flex absolute -left-3 top-[65px] w-[32px] h-[32px] bg-white rounded-full shadow-md items-center justify-center text-[#4b5563] hover:bg-[#f5f7fb]"
                >
                  <FaChevronLeft className="text-[12px]" />
                </button>

                <button
                  onClick={() => scrollRow(destScrollRef, 1)}
                  className="absolute -right-3 top-[65px] w-[32px] h-[32px] bg-white rounded-full shadow-md flex items-center justify-center text-[#4b5563] hover:bg-[#f5f7fb]"
                >
                  <FaChevronRight className="text-[12px]" />
                </button>

              </div>

            ) : (

              <div className="bg-white rounded-2xl border border-[#ececec] p-8 text-center text-[#6b7280] text-[13px]">
                No places found. Try a different search or category.
              </div>

            )}

          </div>

          {/* BROWSE BY CATEGORY */}

          <CategoryGrid onSelect={setCategory} />

          {/* TRENDING EXPERIENCES */}

          <div>

            <div className="flex items-center justify-between mb-3">

              <h2 className="text-[18px] font-bold text-[#111827]">
                Trending Experiences
              </h2>

              <span className="text-[#2563eb] text-[13px] font-semibold cursor-pointer">
                View All
              </span>

            </div>

            <div className="relative">

              <div
                ref={expScrollRef}
                className="flex gap-4 overflow-x-auto scroll-smooth pb-2 [&::-webkit-scrollbar]:hidden"
              >
                {TRENDING_EXPERIENCES.map((exp) => (
                  <ExperienceCard key={exp.id} experience={exp} />
                ))}
              </div>

              <button
                onClick={() => scrollRow(expScrollRef, 1)}
                className="absolute -right-3 top-1/2 -translate-y-1/2 w-[32px] h-[32px] bg-white rounded-full shadow-md flex items-center justify-center text-[#4b5563] hover:bg-[#f5f7fb]"
              >
                <FaChevronRight className="text-[12px]" />
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  )
}

export default Explore