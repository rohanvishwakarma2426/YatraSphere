import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { FaCompass, FaHeart, FaMapMarkerAlt, FaSpinner } from "react-icons/fa"

import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import { searchExperiences } from "../../utils/experienceSearch"

function Experiences() {

  const [params] = useSearchParams()
  const query = params.get("q") || ""

  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    if (!query.trim()) {
      setResults([])
      return
    }

    let cancelled = false
    setLoading(true)

    searchExperiences(query, 20).then((data) => {
      if (!cancelled) {
        setResults(data)
        setLoading(false)
      }
    })

    return () => { cancelled = true }

  }, [query])

  return (

    <div>

      <Navbar />

      <div className="flex">

        <Sidebar />

        <div className="flex-1 min-w-0 p-4">

          <div className="flex items-center gap-2 mb-4">
            <FaCompass className="text-[18px] text-[#2563eb]" />
            <h1 className="text-[20px] font-bold text-[#111827]">
              {query ? `Experiences for "${query}"` : "Experiences"}
            </h1>
          </div>

          {loading ? (

            <div className="flex items-center gap-2 text-[#6b7280] text-[13px] py-10 justify-center">
              <FaSpinner className="animate-spin" /> Searching experiences...
            </div>

          ) : !query.trim() ? (

            <div className="bg-white rounded-2xl border border-[#ececec] p-8 text-center text-[#6b7280] text-[13px]">
              Search for an experience like "Camping", "Trekking" or "Nightlife" from the home page.
            </div>

          ) : results.length === 0 ? (

            <div className="bg-white rounded-2xl border border-[#ececec] p-8 text-center text-[#6b7280] text-[13px]">
              No experiences found for "{query}" yet.
            </div>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

              {results.map((item) => (

                <div key={item.id} className="bg-white rounded-2xl border border-[#ececec] shadow-sm p-5">

                  <div className="flex items-center gap-2 mb-2">
                    <FaMapMarkerAlt className="text-[11px] text-[#2563eb]" />
                    <span className="text-[11.5px] text-[#9ca3af]">
                      {item.fullAddress}
                    </span>
                  </div>

                  <h3 className="text-[15px] font-bold text-[#111827] leading-5">
                    {item.name}
                  </h3>

                  <p className="text-[12.5px] text-[#6b7280] mt-2 leading-4.5">
                    {item.description}
                  </p>

                  <div className="mt-3 pt-3 border-t border-[#f0f1f3] flex items-center gap-1.5 text-[12px] text-[#dc2626]">
                    <FaHeart className="text-[11px]" />
                    {item.likes} likes
                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>

  )

}

export default Experiences