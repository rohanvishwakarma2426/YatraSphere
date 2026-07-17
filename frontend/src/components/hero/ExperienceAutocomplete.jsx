import { useState, useEffect, useRef } from "react"
import { FaCompass, FaSpinner } from "react-icons/fa"
import { searchExperiences } from "../../utils/experienceSearch"

function ExperienceAutocomplete({ value, onChange, onSelect, placeholder }) {

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
      const results = await searchExperiences(value)
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
                <FaCompass className="text-[#2563eb] text-[12px] mt-0.5 shrink-0" />
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
              No experiences found for "{value}"
            </p>

          )}

        </div>

      )}

    </div>

  )

}

export default ExperienceAutocomplete