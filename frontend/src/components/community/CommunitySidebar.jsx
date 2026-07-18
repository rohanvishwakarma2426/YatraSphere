import { useState, useEffect, useRef, useMemo } from "react"
import { Link } from "react-router-dom"
import { FaExclamationTriangle, FaSearch, FaSpinner, FaMapMarkerAlt } from "react-icons/fa"
import { searchLocations } from "../../utils/locationSearch"

function CommunitySidebar({
  allLocations,
  followedLocations,
  onToggleFollow,
  onFollowLocation,
  posts,
  scamAlerts,
  currentUserId,
}) {

  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [searching, setSearching] = useState(false)
  const [open, setOpen] = useState(false)
  const debounceRef = useRef(null)

  // People whose "Follow" you've clicked in this session (client-side only
  // — there's no user-follow table on the backend yet, so this doesn't
  // persist across a refresh. It just makes the button actually respond).
  const [followedPeople, setFollowedPeople] = useState(() => new Set())

  const togglePersonFollow = (id) => {
    setFollowedPeople((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  // Search-to-follow — hits the same real /api/search location API used
  // on Share Experience, debounced so we don't fire on every keystroke.
  useEffect(() => {

    clearTimeout(debounceRef.current)

    if (!query.trim()) {
      setSuggestions([])
      return
    }

    setSearching(true)

    debounceRef.current = setTimeout(async () => {
      const results = await searchLocations(query)
      setSuggestions(results)
      setSearching(false)
    }, 400)

    return () => clearTimeout(debounceRef.current)

  }, [query])

  const handlePick = (place) => {
    onFollowLocation(place.name)
    setQuery("")
    setSuggestions([])
    setOpen(false)
  }

  // PEOPLE YOU MAY KNOW — real travelers who've actually posted, excluding
  // yourself, ranked by how many posts they've shared.
  const people = useMemo(() => {
    const byAuthor = new Map()
    for (const p of posts || []) {
      if (!p.authorId || p.authorId === currentUserId) continue
      const existing = byAuthor.get(p.authorId)
      if (existing) existing.count += 1
      else byAuthor.set(p.authorId, { id: p.authorId, name: p.author, count: 1 })
    }
    return Array.from(byAuthor.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
  }, [posts, currentUserId])

  return (

    <div className="w-full xl:w-[300px] xl:shrink-0 flex flex-col gap-4">

      {/* SCAM ALERTS — only for locations you follow */}

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#ececec]">

        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[14px] font-bold text-[#111827] flex items-center gap-1.5">
            <FaExclamationTriangle className="text-[#dc2626] text-[13px]" />
            Scam Alerts
          </h2>
          {scamAlerts && scamAlerts.length > 0 && (
            <span className="text-[10.5px] font-semibold bg-[#fdeaea] text-[#dc2626] px-2 py-0.5 rounded-full">
              {scamAlerts.length}
            </span>
          )}
        </div>

        {followedLocations.length === 0 ? (

          <p className="text-[12px] text-[#9ca3af]">
            Follow a location below to see scam alerts reported there.
          </p>

        ) : scamAlerts && scamAlerts.length > 0 ? (

          <div className="space-y-3">
            {scamAlerts.slice(0, 5).map((alert) => (
              <Link
                key={alert.id}
                to={`/location/${encodeURIComponent(alert.location)}`}
                className="block hover:bg-[#fdeaea] -mx-1.5 px-1.5 py-1 rounded-lg transition"
              >
                <h3 className="text-[12.5px] font-medium text-[#111827] leading-4.5">
                  {alert.title}
                </h3>
                <p className="text-[11px] text-[#dc2626] mt-0.5 flex items-center gap-1">
                  <FaMapMarkerAlt className="text-[9px]" /> {alert.location} · {alert.timeAgo}
                </p>
              </Link>
            ))}
          </div>

        ) : (
          <p className="text-[12px] text-[#9ca3af]">No scam alerts for your followed locations right now.</p>
        )}

      </div>

      {/* LOCATIONS TO FOLLOW */}

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#ececec]">

        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[14px] font-bold text-[#111827]">
            Locations
          </h2>
          <span className="text-[11px] text-[#9ca3af]">
            {followedLocations.length} followed
          </span>
        </div>

        {/* SEARCH A LOCATION TO FOLLOW — real API, not a hardcoded list */}

        <div className="relative mb-3.5">

          <div className="flex items-center gap-2 bg-[#f5f7fb] rounded-lg px-3 h-[36px]">
            <FaSearch className="text-[#9ca3af] text-[11px]" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
              onFocus={() => setOpen(true)}
              onBlur={() => setTimeout(() => setOpen(false), 150)}
              placeholder="Search a location to follow"
              className="flex-1 bg-transparent outline-none text-[12px] text-[#111827] placeholder:text-[#9ca3af]"
            />
          </div>

          {open && query.trim() && (

            <div className="absolute top-[40px] left-0 w-full bg-white rounded-xl border border-[#ececec] shadow-lg z-30 max-h-[220px] overflow-y-auto py-1">

              {searching ? (
                <div className="flex items-center gap-2 px-3 py-2.5 text-[12px] text-[#9ca3af]">
                  <FaSpinner className="animate-spin text-[11px]" /> Searching...
                </div>
              ) : suggestions.length > 0 ? (
                suggestions.map((place) => (
                  <button
                    key={place.id}
                    onMouseDown={() => handlePick(place)}
                    className="w-full flex items-start gap-2 px-3 py-2 text-left hover:bg-[#f5f7fb] transition"
                  >
                    <FaMapMarkerAlt className="text-[#2563eb] text-[11px] mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[12px] font-medium text-[#111827] truncate">{place.name}</p>
                      <p className="text-[10.5px] text-[#9ca3af] truncate">{place.fullAddress}</p>
                    </div>
                  </button>
                ))
              ) : (
                <p className="px-3 py-2.5 text-[12px] text-[#9ca3af]">No locations found for "{query}"</p>
              )}

            </div>

          )}

        </div>

        {/* This list is ONLY what you've personally followed via the
            search above — not every location that shows up in the feed. */}

        {allLocations.length > 0 ? (

          <div className="space-y-3">

            {allLocations.map((loc) => {

              const isFollowing = followedLocations.includes(loc)

              return (

                <div key={loc} className="flex items-center justify-between gap-2">

                  <Link
                    to={`/location/${encodeURIComponent(loc)}`}
                    className="text-[12.5px] text-[#111827] truncate hover:text-[#2563eb] hover:underline transition"
                  >
                    {loc}
                  </Link>

                  <button
                    onClick={() => onToggleFollow(loc)}
                    className={`shrink-0 text-[11px] font-semibold px-3 h-[26px] rounded-lg transition ${
                      isFollowing
                        ? "bg-[#f3f4f6] text-[#4b5563] hover:bg-[#e5e7eb]"
                        : "bg-[#2563eb] text-white hover:bg-[#1d4ed8]"
                    }`}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </button>

                </div>

              )

            })}

          </div>

        ) : (
          <p className="text-[12px] text-[#9ca3af]">No locations yet — search above to follow one.</p>
        )}

      </div>

      {/* PEOPLE */}

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#ececec]">

        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[14px] font-bold text-[#111827]">
            People You May Know
          </h2>
        </div>

        {people.length > 0 ? (

          <div className="space-y-3">

            {people.map((person) => {

              const isFollowing = followedPeople.has(person.id)

              return (

                <div key={person.id} className="flex items-center justify-between gap-2">

                  <div className="flex items-center gap-2.5 min-w-0">

                    <div className="w-[32px] h-[32px] rounded-full bg-[#eef4ff] flex items-center justify-center text-[#2563eb] text-[12px] font-bold shrink-0">
                      {person.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-[12px] font-semibold text-[#111827] truncate">
                        {person.name}
                      </h3>
                      <p className="text-[10.5px] text-[#9ca3af] truncate">
                        {person.count} post{person.count === 1 ? "" : "s"}
                      </p>
                    </div>

                  </div>

                  <button
                    onClick={() => togglePersonFollow(person.id)}
                    className={`shrink-0 text-[11px] font-semibold px-3 h-[26px] rounded-lg border transition ${
                      isFollowing
                        ? "bg-[#f3f4f6] border-[#ececec] text-[#4b5563] hover:bg-[#e5e7eb]"
                        : "border-[#ececec] text-[#2563eb] hover:bg-[#eef4ff]"
                    }`}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </button>

                </div>

              )

            })}

          </div>

        ) : (
          <p className="text-[12px] text-[#9ca3af]">No other travelers have posted yet.</p>
        )}

      </div>

    </div>

  )
}

export default CommunitySidebar