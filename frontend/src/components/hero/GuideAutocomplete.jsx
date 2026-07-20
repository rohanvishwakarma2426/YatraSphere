import { useState, useEffect, useRef } from "react"
import { FaBookOpen, FaSpinner } from "react-icons/fa"
import { searchGuides } from "../../utils/guideSearch"
import { GUIDE_CATEGORIES } from "../../utils/guideHelpers"

function GuideAutocomplete({ value, onChange, onSelect, placeholder }) {

  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const debounceRef = useRef(null)

  useEffect(() => {

    clearTimeout(debounceRef.current)

    if (!value.trim()) {
      setSuggestions([])
      return
    }

    setLoading(true)

    debounceRef.current = setTimeout(async () => {
      const results = await searchGuides(value)
      setSuggestions(results)
      setLoading(false)
    }, 400)

    return () => clearTimeout(debounceRef.current)

  }, [value])

  const handleSelect = (item) => {
    onSelect(item)
    setOpen(false)
    setSuggestions([])
  }

  // Clicking a category chip fills the box with its label — the useEffect
  // above then runs the same debounced search automatically.
  const handleCategoryClick = (category) => {
    onChange(category.label)
  }

  return (

    <div className="relative flex-1">

      <input
        type="text"
        value={value}
        onChange={(e) => { onChange(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder={placeholder}
        className="w-full h-[42px] border border-[#ececec] rounded-xl px-4 outline-none focus:border-[#2563eb] text-[13px]"
      />

      {open && !value.trim() && (

        // Nothing typed yet — browse by guide category instead.

        <div className="absolute top-[46px] left-0 w-full bg-white rounded-xl border border-[#ececec] shadow-lg z-30 max-h-[300px] overflow-y-auto py-2">

          <p className="px-4 pb-1.5 text-[10.5px] font-semibold text-[#9ca3af] uppercase tracking-wide">
            Browse by guide type
          </p>

          {GUIDE_CATEGORIES.map((cat) => {
            const Icon = cat.icon
            return (
              <button
                key={cat.key}
                onMouseDown={() => handleCategoryClick(cat)}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-left hover:bg-[#f5f7fb] transition"
              >
                <div className={`w-[26px] h-[26px] rounded-lg flex items-center justify-center shrink-0 ${cat.bg}`}>
                  <Icon className={`text-[11px] ${cat.color}`} />
                </div>
                <span className="text-[12.5px] font-medium text-[#111827]">
                  {cat.label}
                </span>
              </button>
            )
          })}

        </div>

      )}

      {open && value.trim() && (

        <div className="absolute top-[46px] left-0 w-full bg-white rounded-xl border border-[#ececec] shadow-lg z-30 max-h-[260px] overflow-y-auto py-1">

          {loading ? (

            <div className="flex items-center gap-2 px-4 py-3 text-[12.5px] text-[#9ca3af]">
              <FaSpinner className="animate-spin text-[12px]" />
              Searching...
            </div>

          ) : suggestions.length > 0 ? (

            suggestions.map((item) => (
              <button
                key={item.id}
                onMouseDown={() => handleSelect(item)}
                className="w-full flex items-start gap-2.5 px-4 py-2.5 text-left hover:bg-[#f5f7fb] transition"
              >
                <FaBookOpen className="text-[#2563eb] text-[12px] mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[12.5px] font-medium text-[#111827] truncate">
                    {item.name}
                  </p>
                  <p className="text-[11px] text-[#9ca3af] truncate">
                    {item.fullAddress}
                  </p>
                </div>
              </button>
            ))

          ) : (

            <p className="px-4 py-3 text-[12.5px] text-[#9ca3af]">
              No guides found for "{value}"
            </p>

          )}

        </div>

      )}

    </div>

  )

}

export default GuideAutocomplete
