import { FaSearch, FaStar } from "react-icons/fa"
import { DESTINATIONS, TRIP_DURATIONS, TRAVEL_THEMES } from "../../utils/packageHelpers"

const RATINGS = [
  { value: 5, label: "5 Stars" },
  { value: 4, label: "4 & above" },
  { value: 3, label: "3 & above" },
  { value: 2, label: "2 & above" },
]

function PackagesFilterSidebar({ filters, setFilters, onApply, onClear }) {

  // Small helper so every input just patches the one shared filters object.
  const update = (patch) => setFilters((prev) => ({ ...prev, ...patch }))

  const toggleTheme = (theme) => {
    setFilters((prev) => ({
      ...prev,
      themes: prev.themes.includes(theme)
        ? prev.themes.filter((t) => t !== theme)
        : [...prev.themes, theme],
    }))
  }

  return (

    <div className="w-[260px] shrink-0 min-h-screen px-4 py-4">

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#ececec] sticky top-4">

        {/* HEADER */}

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[14px] font-bold text-[#111827]">Filters</h2>
          <button onClick={onClear} className="text-[#2563eb] text-[12px] font-semibold">
            Reset
          </button>
        </div>

        {/* SEARCH */}

        <div className="mb-4">
          <p className="text-[12px] font-semibold text-[#374151] mb-2">Search Packages</p>
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[11px] text-[#9ca3af]" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => update({ search: e.target.value })}
              placeholder="Search packages..."
              className="w-full h-[38px] border border-[#ececec] rounded-xl pl-8 pr-3 outline-none text-[12px]"
            />
          </div>
        </div>

        {/* DESTINATION */}

        <div className="mb-4">
          <p className="text-[12px] font-semibold text-[#374151] mb-2">Destination</p>
          <select
            value={filters.destination}
            onChange={(e) => update({ destination: e.target.value })}
            className="w-full h-[38px] border border-[#ececec] rounded-xl px-3 outline-none text-[12px]"
          >
            {DESTINATIONS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* BUDGET RANGE */}

        <div className="mb-4">
          <p className="text-[12px] font-semibold text-[#374151] mb-2">Budget Range</p>
          <input
            type="range"
            min={1000}
            max={100000}
            step={1000}
            value={filters.maxBudget}
            onChange={(e) => update({ maxBudget: Number(e.target.value) })}
            className="w-full accent-[#2563eb]"
          />
          <div className="flex items-center justify-between text-[11px] text-[#6b7280] mt-1">
            <span>₹1,000</span>
            <span>₹{filters.maxBudget.toLocaleString("en-IN")}+</span>
          </div>
        </div>

        {/* TRIP DURATION */}

        <div className="mb-4">
          <p className="text-[12px] font-semibold text-[#374151] mb-2">Trip Duration</p>
          <div className="flex flex-wrap gap-2">
            {TRIP_DURATIONS.map((d) => (
              <button
                key={d.key}
                onClick={() => update({ duration: d.key })}
                className={`px-3 h-[30px] rounded-lg text-[11.5px] font-medium border transition ${
                  filters.duration === d.key
                    ? "bg-[#eef4ff] border-[#2563eb] text-[#2563eb]"
                    : "border-[#ececec] text-[#4b5563] hover:bg-[#f5f7fb]"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* TRAVEL THEME */}

        <div className="mb-4">
          <p className="text-[12px] font-semibold text-[#374151] mb-2">Travel Theme</p>
          <div className="space-y-1.5">
            {TRAVEL_THEMES.map((theme) => (
              <label key={theme} className="flex items-center gap-2.5 text-[12px] text-[#374151] cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.themes.includes(theme)}
                  onChange={() => toggleTheme(theme)}
                  className="accent-[#2563eb] w-[14px] h-[14px]"
                />
                {theme}
              </label>
            ))}
          </div>
        </div>

        {/* RATING */}

        <div className="mb-5">
          <p className="text-[12px] font-semibold text-[#374151] mb-2">Rating</p>
          <div className="space-y-1.5">
            {RATINGS.map((r) => (
              <label key={r.value} className="flex items-center gap-2.5 text-[12px] text-[#374151] cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.minRating === r.value}
                  onChange={() => update({ minRating: r.value })}
                  className="accent-[#2563eb] w-[14px] h-[14px]"
                />
                <span className="flex items-center gap-1">
                  {Array.from({ length: r.value === 5 ? 5 : r.value }).map((_, i) => (
                    <FaStar key={i} className="text-[#f59e0b] text-[10px]" />
                  ))}
                  {r.label !== "5 Stars" && <span className="ml-0.5">{r.label}</span>}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* ACTIONS */}

        <button
          onClick={onApply}
          className="w-full h-[42px] bg-[#2563eb] hover:bg-[#1d4ed8] transition text-white rounded-xl text-[13px] font-semibold"
        >
          Apply Filters
        </button>

        <button
          onClick={onClear}
          className="w-full h-[42px] mt-2 border border-[#ececec] text-[#374151] rounded-xl text-[13px] font-semibold hover:bg-[#f5f7fb] transition"
        >
          Clear All
        </button>

      </div>

    </div>

  )
}

export default PackagesFilterSidebar