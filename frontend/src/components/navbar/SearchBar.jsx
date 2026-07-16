import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaSearch } from "react-icons/fa"
import { searchIndex } from "../../utils/searchIndex"

function SearchBar() {

  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  const results = searchIndex(query)

  useEffect(() => {
    setActiveIndex(-1)
  }, [query])

  const goToResult = (item) => {
    if (!item) return
    navigate(item.path)
    setQuery("")
    setOpen(false)
    inputRef.current?.blur()
  }

  const handleKeyDown = (e) => {

    if (!open || results.length === 0) return

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex((prev) => (prev + 1) % results.length)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((prev) => (prev - 1 + results.length) % results.length)
    } else if (e.key === "Enter") {
      e.preventDefault()
      goToResult(results[activeIndex] ?? results[0])
    } else if (e.key === "Escape") {
      setOpen(false)
      inputRef.current?.blur()
    }

  }

  // Groups the flat results into { category: [items] } for section headers.
  const grouped = results.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || []
    acc[item.category].push(item)
    return acc
  }, {})

  return (

    <div className="hidden lg:block relative ml-6 shrink-0">

      <div className="w-[220px] h-[36px] bg-[#d6d9e0] border border-[#edf0f5] rounded-[12px] px-3 flex items-center gap-2">

        <FaSearch className="text-[#6b7280] text-[11px] shrink-0" />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={handleKeyDown}
          placeholder="Search places, experiences..."
          className="bg-transparent outline-none w-full text-[13px] text-[#374151] placeholder:text-[#6b7280]"
        />

      </div>

      {open && query.trim() && (

        <div className="absolute top-[42px] left-0 w-[320px] max-h-[380px] overflow-y-auto bg-white rounded-2xl border border-[#ececec] shadow-lg z-40 py-2">

          {results.length === 0 ? (

            <p className="px-4 py-6 text-center text-[12.5px] text-[#9ca3af]">
              No results for "{query}"
            </p>

          ) : (

            Object.entries(grouped).map(([category, items]) => (

              <div key={category} className="mb-1">

                <p className="px-4 pt-2 pb-1 text-[10.5px] font-semibold text-[#9ca3af] uppercase tracking-wide">
                  {category}
                </p>

                {items.map((item) => {

                  const globalIndex = results.indexOf(item)
                  const isActive = globalIndex === activeIndex

                  return (

                    <button
                      key={item.id}
                      onMouseDown={() => goToResult(item)}
                      onMouseEnter={() => setActiveIndex(globalIndex)}
                      className={`w-full flex items-center gap-3 px-4 py-2 text-left transition ${
                        isActive ? "bg-[#eef4ff]" : "hover:bg-[#f5f7fb]"
                      }`}
                    >

                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-[32px] h-[32px] rounded-lg object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-[32px] h-[32px] rounded-lg bg-[#eef4ff] flex items-center justify-center shrink-0">
                          <FaSearch className="text-[#2563eb] text-[11px]" />
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="text-[12.5px] font-medium text-[#111827] truncate">
                          {item.title}
                        </p>
                        {item.subtitle && (
                          <p className="text-[11px] text-[#9ca3af] truncate">
                            {item.subtitle}
                          </p>
                        )}
                      </div>

                    </button>

                  )

                })}

              </div>

            ))

          )}

        </div>

      )}

    </div>

  )
}

export default SearchBar