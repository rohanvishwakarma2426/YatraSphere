import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { FaExclamationTriangle, FaMapMarkerAlt, FaPlus } from "react-icons/fa"

function CommunitySidebar({
  allLocations,
  suggestLocations,
  followedLocations,
  onToggleFollow,
  onFollowLocation,
  posts,
  allUsers,
  followedPeople,
  onTogglePersonFollow,
  scamAlerts,
  currentUserId,
}) {

  const [query, setQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Suggestions pulled straight from real posted locations in our own DB
  // (not an external geocoding API) — so typing "azm" surfaces "Azamgarh".
  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return (suggestLocations || [])
      .filter((loc) => loc.toLowerCase().includes(q) && !followedLocations.includes(loc))
      .slice(0, 6)
  }, [query, suggestLocations, followedLocations])

  const pickSuggestion = (loc) => {
    onFollowLocation(loc)
    setQuery("")
    setShowSuggestions(false)
  }

  // Enter / the + button follows exactly what's typed, in case it isn't
  // in the suggestions (e.g. a brand new location nobody's posted yet).
  const handleFollowTyped = (e) => {
    e.preventDefault()
    const name = query.trim()
    if (!name) return
    onFollowLocation(name)
    setQuery("")
    setShowSuggestions(false)
  }

  // PEOPLE YOU MAY KNOW — every real signed-up user (not just ones who've
  // posted), excluding yourself, with their real post count if any.
  const people = useMemo(() => {
    const counts = {}
    for (const p of posts || []) {
      if (p.authorId) counts[p.authorId] = (counts[p.authorId] || 0) + 1
    }
    return (allUsers || [])
      .filter((u) => u.id !== currentUserId)
      .map((u) => ({ id: u.id, name: u.name, count: counts[u.id] || 0 }))
      .sort((a, b) => b.count - a.count)
  }, [allUsers, posts, currentUserId])

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

        {/* Type a location — suggestions come from real posted locations
            in our own DB, no external API. Picking one follows the full,
            correct name; hitting Enter follows exactly what you typed. */}

        <div className="relative mb-3.5">

          <form onSubmit={handleFollowTyped} className="flex items-center gap-2">
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true) }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              placeholder="Type a location to follow"
              className="flex-1 bg-[#f5f7fb] rounded-lg px-3 h-[36px] outline-none text-[12px] text-[#111827] placeholder:text-[#9ca3af]"
            />
            <button
              type="submit"
              disabled={!query.trim()}
              className="shrink-0 w-[36px] h-[36px] rounded-lg bg-[#2563eb] disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center hover:bg-[#1d4ed8] transition"
            >
              <FaPlus className="text-[12px]" />
            </button>
          </form>

          {showSuggestions && suggestions.length > 0 && (

            <div className="absolute top-[40px] left-0 right-0 bg-white rounded-xl border border-[#ececec] shadow-lg z-30 max-h-[200px] overflow-y-auto py-1">
              {suggestions.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onMouseDown={() => pickSuggestion(loc)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-[#f5f7fb] transition"
                >
                  <FaMapMarkerAlt className="text-[#2563eb] text-[11px] shrink-0" />
                  <span className="text-[12px] font-medium text-[#111827] truncate">{loc}</span>
                </button>
              ))}
            </div>

          )}

        </div>

        {/* This list is ONLY what you've personally followed — not every
            location that shows up in the feed. */}

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

              const isFollowing = followedPeople.includes(person.id)

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
                    onClick={() => onTogglePersonFollow(person.id)}
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
          <p className="text-[12px] text-[#9ca3af]">No other travelers have signed up yet.</p>
        )}

      </div>

    </div>

  )
}

export default CommunitySidebar