import { useState, useEffect, useMemo } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { FaSearch, FaMapMarkerAlt, FaTimes, FaSpinner } from "react-icons/fa"

import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import StoriesBar from "../../components/community/StoriesBar"
import PostCard from "../../components/community/PostCard"
import CommunitySidebar from "../../components/community/CommunitySidebar"
import { useAuth } from "../../hooks/useAuth"

const FOLLOWED_LOCATIONS_KEY = "ys_followed_locations"
const FOLLOWED_PEOPLE_KEY = "ys_followed_people"

// Reads a JSON array out of localStorage, falling back to [] on any
// error (first visit, corrupted value, private browsing, etc).
function loadStoredList(key) {
  try {
    const raw = localStorage.getItem(key)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop"

// Turns a Postgres timestamp into "4h ago" / "2d ago" style text.
function timeAgo(dateString) {
  const diffMs = Date.now() - new Date(dateString).getTime()
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return "Just now"
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

// Maps the backend's Post shape into what <PostCard /> expects.
function mapPost(p) {
  return {
    id: p.id,
    author: p.author?.name || "Traveler",
    authorId: p.author?.id ?? null,
    avatar: DEFAULT_AVATAR,
    location: p.location || "Unknown",
    createdAt: p.created_at,
    timeAgo: timeAgo(p.created_at),
    title: p.title,
    text: p.content,
    image: p.image_url || null,
    tags: [p.category],
    likes: p.likes_count,
    comments: 0,
    shares: 0,
  }
}

function Community() {

  const { user } = useAuth()

  const [followedLocations, setFollowedLocations] = useState(() => loadStoredList(FOLLOWED_LOCATIONS_KEY))
  const [followedPeople, setFollowedPeople] = useState(() => loadStoredList(FOLLOWED_PEOPLE_KEY))
  const [posts, setPosts] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState("")
  const [activeTab, setActiveTab] = useState("feed") // "feed" | "explore"
  const [searchQuery, setSearchQuery] = useState("")

  // Keep follows across refreshes — they stay exactly as they are until
  // you unfollow, instead of resetting every time the page reloads.
  useEffect(() => {
    localStorage.setItem(FOLLOWED_LOCATIONS_KEY, JSON.stringify(followedLocations))
  }, [followedLocations])

  useEffect(() => {
    localStorage.setItem(FOLLOWED_PEOPLE_KEY, JSON.stringify(followedPeople))
  }, [followedPeople])

  useEffect(() => {

    let cancelled = false
    setLoading(true)

    axios.get("http://127.0.0.1:8000/posts")
      .then((res) => {
        if (!cancelled) {
          setPosts(res.data.map(mapPost))
          setLoadError("")
        }
      })
      .catch((err) => {
        console.error("Failed to load posts:", err)
        if (!cancelled) setLoadError("Couldn't load posts right now. Is the backend running?")
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    // People You May Know should show every real signed-up user, not
    // just the ones who happen to have posted already.
    axios.get("http://127.0.0.1:8000/users")
      .then((res) => { if (!cancelled) setAllUsers(res.data) })
      .catch((err) => console.error("Failed to load users:", err))

    return () => { cancelled = true }

  }, [])

  const toggleFollow = (location) => {
    setFollowedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    )
  }

  // Used when picking a location from the sidebar's search — always adds,
  // never toggles off, so re-selecting the same suggestion doesn't unfollow.
  const followLocation = (location) => {
    setFollowedLocations((prev) => (prev.includes(location) ? prev : [...prev, location]))
  }

  const togglePersonFollow = (personId) => {
    setFollowedPeople((prev) =>
      prev.includes(personId)
        ? prev.filter((id) => id !== personId)
        : [...prev, personId]
    )
  }

  // Case-insensitive, partial match — "manali" or "Manali, HP" both match
  // a followed "Manali", instead of requiring an exact string match.
  const isLocationFollowed = (postLocation) => {
    if (!postLocation) return false
    const loc = postLocation.toLowerCase()
    return followedLocations.some(
      (followed) => loc.includes(followed.toLowerCase()) || followed.toLowerCase().includes(loc)
    )
  }

  // Feed = posts from locations you follow OR from people you follow.
  const feedPosts = useMemo(
    () => posts.filter((p) => isLocationFollowed(p.location) || followedPeople.includes(p.authorId)),
    [posts, followedLocations, followedPeople]
  )

  // SCAM ALERTS — scam-category posts, but only from locations you follow.
  // This is what powers the sidebar's alerts card.
  const scamAlerts = useMemo(
    () =>
      posts
        .filter((p) => p.tags?.[0] === "scam" && isLocationFollowed(p.location))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [posts, followedLocations]
  )

  // EXPLORE TAB: requires a search query, shows posts matching that location
  const exploreResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.trim().toLowerCase()
    return posts.filter((p) => p.location.toLowerCase().includes(q))
  }, [posts, searchQuery])

  // Locations actually seen in real posts, plus anything the user has
  // followed via the sidebar search — no hardcoded dummy entries.
  // Deduped case-insensitively so "goa" and "Goa" show up as one entry.
  const knownLocations = useMemo(() => {
    const raw = [
      ...posts.map((p) => p.location).filter((l) => l && l !== "Unknown"),
      ...followedLocations,
    ]
    const seen = new Map()
    for (const loc of raw) {
      const key = loc.trim().toLowerCase()
      if (key && !seen.has(key)) seen.set(key, loc.trim())
    }
    return Array.from(seen.values()).sort((a, b) => a.localeCompare(b))
  }, [posts, followedLocations])

  const matchedLocations = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.trim().toLowerCase()
    return knownLocations.filter((l) => l.toLowerCase().includes(q))
  }, [searchQuery, knownLocations])

  return (

    <div>

      <Navbar />

      <div className="flex">

        <Sidebar />

        <div className="flex-1 min-w-0 p-4 flex flex-col xl:flex-row gap-4 items-start">

          {/* MAIN COLUMN */}

          <div className="flex-1 min-w-0 flex flex-col gap-4">

            {/* TABS */}

            <div className="bg-white rounded-2xl border border-[#ececec] shadow-sm p-1.5 flex items-center gap-1.5 w-fit">

              <button
                onClick={() => setActiveTab("feed")}
                className={`px-5 h-[36px] rounded-xl text-[13px] font-semibold transition ${
                  activeTab === "feed"
                    ? "bg-[#2563eb] text-white"
                    : "text-[#4b5563] hover:bg-[#f5f7fb]"
                }`}
              >
                My Feed
              </button>

              <button
                onClick={() => setActiveTab("explore")}
                className={`px-5 h-[36px] rounded-xl text-[13px] font-semibold transition ${
                  activeTab === "explore"
                    ? "bg-[#2563eb] text-white"
                    : "text-[#4b5563] hover:bg-[#f5f7fb]"
                }`}
              >
                Explore
              </button>

            </div>

            {loading && (
              <div className="flex items-center gap-2 text-[#6b7280] text-[13px] py-10 justify-center">
                <FaSpinner className="animate-spin" /> Loading posts...
              </div>
            )}

            {loadError && (
              <div className="bg-[#fdeaea] border border-[#f3a9a9] rounded-xl px-4 py-2.5 text-[12.5px] text-[#dc2626]">
                {loadError}
              </div>
            )}

            {!loading && activeTab === "feed" && (

              <>

                <StoriesBar stories={[]} />

                <div className="bg-[#eef4ff] border border-[#dbe7ff] rounded-xl px-4 py-2.5 text-[12px] text-[#2563eb]">
                  Showing posts from locations and people you follow: <span className="font-semibold">{followedLocations.join(", ") || "no locations"}</span>
                  {" "}— want to post? Head to <a href="/share-experience" className="underline font-semibold">Share Experience</a>.
                </div>

                {feedPosts.length > 0 ? (
                  feedPosts.map((post) => <PostCard key={post.id} post={post} />)
                ) : (
                  <div className="bg-white rounded-2xl border border-[#ececec] p-8 text-center text-[#6b7280] text-[13px]">
                    You're not following any locations or people with posts yet. Go to Explore, or follow someone from the sidebar.
                  </div>
                )}

              </>

            )}

            {!loading && activeTab === "explore" && (

              <>

                {/* SEARCH */}

                <div className="bg-white rounded-2xl border border-[#ececec] shadow-sm p-4">

                  <div className="flex items-center gap-2 bg-[#f5f7fb] rounded-xl px-4 h-[42px]">

                    <FaSearch className="text-[#9ca3af] text-[13px]" />

                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search a location to explore its posts (e.g. Jaipur, Udaipur)"
                      className="flex-1 bg-transparent outline-none text-[13px] text-[#111827] placeholder:text-[#9ca3af]"
                    />

                    {searchQuery && (
                      <button onClick={() => setSearchQuery("")} className="text-[#9ca3af] hover:text-[#111827]">
                        <FaTimes className="text-[13px]" />
                      </button>
                    )}

                  </div>

                  {!searchQuery && knownLocations.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {knownLocations.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => setSearchQuery(loc)}
                          className="text-[11.5px] px-3 h-[28px] rounded-full bg-[#f5f7fb] text-[#4b5563] hover:bg-[#eef4ff] hover:text-[#2563eb] transition"
                        >
                          {loc}
                        </button>
                      ))}
                    </div>
                  )}

                </div>

                {!searchQuery && (
                  <div className="bg-white rounded-2xl border border-[#ececec] p-8 text-center text-[#6b7280] text-[13px]">
                    Search for a location above to see posts from travelers there — even if you don't follow it yet.
                  </div>
                )}

                {searchQuery && matchedLocations.length > 0 && (

                  <div className="flex flex-wrap gap-2">
                    {matchedLocations.map((loc) => (
                      <div
                        key={loc}
                        className="flex items-center gap-2 bg-white border border-[#ececec] rounded-full pl-3 pr-1.5 h-[34px]"
                      >
                        <FaMapMarkerAlt className="text-[11px] text-[#2563eb]" />
                        <Link to={`/location/${encodeURIComponent(loc)}`} className="text-[12px] text-[#111827] hover:text-[#2563eb] hover:underline transition">
                          {loc}
                        </Link>
                        <button
                          onClick={() => toggleFollow(loc)}
                          className={`text-[10.5px] font-semibold px-2.5 h-[24px] rounded-full transition ${
                            followedLocations.includes(loc)
                              ? "bg-[#f3f4f6] text-[#4b5563]"
                              : "bg-[#2563eb] text-white"
                          }`}
                        >
                          {followedLocations.includes(loc) ? "Following" : "Follow"}
                        </button>
                      </div>
                    ))}
                  </div>

                )}

                {searchQuery && exploreResults.length > 0 ? (
                  exploreResults.map((post) => <PostCard key={post.id} post={post} />)
                ) : searchQuery && (
                  <div className="bg-white rounded-2xl border border-[#ececec] p-8 text-center text-[#6b7280] text-[13px]">
                    No posts found for "{searchQuery}" yet.
                  </div>
                )}

              </>

            )}

          </div>

          {/* RIGHT SIDEBAR */}

          <CommunitySidebar
            allLocations={followedLocations}
            suggestLocations={knownLocations}
            followedLocations={followedLocations}
            onToggleFollow={toggleFollow}
            onFollowLocation={followLocation}
            posts={posts}
            allUsers={allUsers}
            followedPeople={followedPeople}
            onTogglePersonFollow={togglePersonFollow}
            scamAlerts={scamAlerts}
            currentUserId={user?.id ?? null}
          />

        </div>

      </div>

    </div>

  )
}

export default Community