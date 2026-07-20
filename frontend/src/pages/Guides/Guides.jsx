import { useState, useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { FaBookOpen, FaMapMarkerAlt, FaClock, FaSpinner, FaSearch, FaTimes } from "react-icons/fa"

import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import { searchGuides } from "../../utils/guideSearch"
import { GUIDE_CATEGORIES, getGuideCategoryMeta } from "../../utils/guideHelpers"

function Guides() {

  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()

  const query = params.get("q") || ""
  const category = params.get("category") || ""

  const [searchBox, setSearchBox] = useState(query)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  // Keep the search box in sync if the URL changes from elsewhere (e.g.
  // coming back from the Hero section with a new ?q=).
  useEffect(() => { setSearchBox(query) }, [query])

  useEffect(() => {

    if (!query.trim() && !category) {
      setResults([])
      return
    }

    let cancelled = false
    setLoading(true)

    searchGuides(query, 24, category || null).then((data) => {
      if (!cancelled) {
        setResults(data)
        setLoading(false)
      }
    })

    return () => { cancelled = true }

  }, [query, category])

  const runSearch = () => {
    const next = new URLSearchParams()
    if (searchBox.trim()) next.set("q", searchBox.trim())
    if (category) next.set("category", category)
    setParams(next)
  }

  const pickCategory = (key) => {
    const next = new URLSearchParams()
    if (query.trim()) next.set("q", query.trim())
    next.set("category", key)
    setParams(next)
  }

  const clearCategory = () => {
    const next = new URLSearchParams()
    if (query.trim()) next.set("q", query.trim())
    setParams(next)
  }

  const clearAll = () => {
    setSearchBox("")
    navigate("/guides")
  }

  const heading = query
    ? `Guides for "${query}"`
    : category
      ? getGuideCategoryMeta(category)?.label || "Guides"
      : "Travel Guides"

  const showingResults = query.trim() || category

  return (

    <div>

      <Navbar />

      <div className="flex">

        <Sidebar />

        <div className="flex-1 min-w-0 p-4">

          {/* HEADER */}

          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">

            <div className="flex items-center gap-2">
              <FaBookOpen className="text-[18px] text-[#2563eb]" />
              <h1 className="text-[20px] font-bold text-[#111827]">
                {heading}
              </h1>
            </div>

            {/* SEARCH BOX */}

            <div className="flex items-center gap-2 bg-white border border-[#ececec] rounded-xl px-3 h-[40px] w-full sm:w-[320px]">
              <FaSearch className="text-[#9ca3af] text-[12px] shrink-0" />
              <input
                value={searchBox}
                onChange={(e) => setSearchBox(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") runSearch() }}
                placeholder="Search guides..."
                className="flex-1 min-w-0 bg-transparent outline-none text-[13px]"
              />
              {searchBox && (
                <button onClick={clearAll} className="text-[#9ca3af] hover:text-[#111827] shrink-0">
                  <FaTimes className="text-[12px]" />
                </button>
              )}
            </div>

          </div>

          {/* CATEGORY CHIPS */}

          <div className="flex flex-wrap gap-2 mb-5">

            {GUIDE_CATEGORIES.map((cat) => {
              const Icon = cat.icon
              const active = category === cat.key
              return (
                <button
                  key={cat.key}
                  onClick={() => (active ? clearCategory() : pickCategory(cat.key))}
                  className={`flex items-center gap-1.5 px-3.5 h-[34px] rounded-full text-[12.5px] font-medium border transition ${
                    active
                      ? "bg-[#2563eb] border-[#2563eb] text-white"
                      : "bg-white border-[#ececec] text-[#4b5563] hover:bg-[#f5f7fb]"
                  }`}
                >
                  <Icon className={active ? "text-white text-[11px]" : `text-[11px] ${cat.color}`} />
                  {cat.label}
                </button>
              )
            })}

          </div>

          {/* RESULTS */}

          {loading ? (

            <div className="flex items-center gap-2 text-[#6b7280] text-[13px] py-10 justify-center">
              <FaSpinner className="animate-spin" /> Searching guides...
            </div>

          ) : !showingResults ? (

            <div className="bg-white rounded-2xl border border-[#ececec] p-8 text-center text-[#6b7280] text-[13px]">
              Search for a guide, or pick a category above — Budget, Safety, Packing, Food, Itinerary or Best Time to Visit.
            </div>

          ) : results.length === 0 ? (

            <div className="bg-white rounded-2xl border border-[#ececec] p-8 text-center text-[#6b7280] text-[13px]">
              No guides found{query ? ` for "${query}"` : ""} yet. Be the first to{" "}
              <a href="/share-experience" className="text-[#2563eb] underline font-semibold">share a guide</a>.
            </div>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

              {results.map((item) => {
                const meta = getGuideCategoryMeta(item.category)
                const Icon = meta?.icon
                return (
                  <div key={item.id} className="bg-white rounded-2xl border border-[#ececec] shadow-sm p-5">

                    <div className="flex items-center justify-between mb-2">

                      {meta && (
                        <span className={`flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${meta.bg} ${meta.color}`}>
                          {Icon && <Icon className="text-[10px]" />}
                          {meta.label}
                        </span>
                      )}

                      <span className="flex items-center gap-1 text-[11px] text-[#9ca3af]">
                        <FaClock className="text-[10px]" />
                        {item.readingTime}
                      </span>

                    </div>

                    <h3 className="text-[15px] font-bold text-[#111827] leading-5">
                      {item.name}
                    </h3>

                    {item.location && (
                      <div className="flex items-center gap-1.5 mt-1.5 text-[11.5px] text-[#9ca3af]">
                        <FaMapMarkerAlt className="text-[10px] text-[#2563eb]" />
                        {item.location}
                      </div>
                    )}

                    <p className="text-[12.5px] text-[#6b7280] mt-2 leading-4.5 line-clamp-4">
                      {item.description}
                    </p>

                    <div className="mt-3 pt-3 border-t border-[#f0f1f3] text-[11.5px] text-[#9ca3af]">
                      by <span className="text-[#374151] font-medium">{item.author}</span>
                    </div>

                  </div>
                )
              })}

            </div>

          )}

        </div>

      </div>

    </div>

  )

}

export default Guides
