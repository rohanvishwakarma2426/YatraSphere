import { useState, useEffect, useMemo } from "react"
import axios from "axios"
import { FaSearch, FaMapMarkerAlt, FaTimes, FaSpinner } from "react-icons/fa"

import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import StoriesBar from "../../components/community/StoriesBar"
import PostCard from "../../components/community/PostCard"
import CommunitySidebar from "../../components/community/CommunitySidebar"

export const ALL_LOCATIONS = [
  "Manali", "Kasol", "Goa", "Leh Ladakh", "Varanasi",
  "Jaipur", "Rishikesh", "Udaipur", "Spiti Valley",
]

const INITIAL_FOLLOWED = ["Manali", "Kasol", "Goa"]

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
    avatar: DEFAULT_AVATAR,
    location: p.location || "Unknown",
    timeAgo: timeAgo(p.created_at),
    title: p.title,
    text: p.content,
    images: [],
    tags: [p.category],
    likes: p.likes_count,
    comments: 0,
    shares: 0,
  }
}

function Community() {

  const [followedLocations, setFollowedLocations] = useState(INITIAL_FOLLOWED)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState("")
  const [activeTab, setActiveTab] = useState("feed") // "feed" | "explore"
  const [searchQuery, setSearchQuery] = useState("")

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

    return () => { cancelled = true }

  }, [])

  const toggleFollow = (location) => {
    setFollowedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
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

  const feedPosts = useMemo(
    () => posts.filter((p) => isLocationFollowed(p.location)),
    [posts, followedLocations]
  )

  // EXPLORE TAB: requires a search query, shows posts matching that location
  const exploreResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.trim().toLowerCase()
    return posts.filter((p) => p.location.toLowerCase().includes(q))
  }, [posts, searchQuery])

  const matchedLocations = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.trim().toLowerCase()
    return ALL_LOCATIONS.filter((l) => l.toLowerCase().includes(q))
  }, [searchQuery])

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
                  Showing posts only from locations you follow: <span className="font-semibold">{followedLocations.join(", ") || "none yet"}</span>
                  {" "}— want to post? Head to <a href="/share-experience" className="underline font-semibold">Share Experience</a>.
                </div>

                {feedPosts.length > 0 ? (
                  feedPosts.map((post) => <PostCard key={post.id} post={post} />)
                ) : (
                  <div className="bg-white rounded-2xl border border-[#ececec] p-8 text-center text-[#6b7280] text-[13px]">
                    You're not following any locations with posts yet. Go to Explore to find and follow locations.
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

                  {!searchQuery && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {ALL_LOCATIONS.map((loc) => (
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
                        <span className="text-[12px] text-[#111827]">{loc}</span>
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
            allLocations={ALL_LOCATIONS}
            followedLocations={followedLocations}
            onToggleFollow={toggleFollow}
          />

        </div>

      </div>

    </div>

  )
}

export default Community