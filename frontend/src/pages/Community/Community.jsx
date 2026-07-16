import { useState, useMemo } from "react"
import { FaSearch, FaMapMarkerAlt, FaTimes } from "react-icons/fa"

import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import StoriesBar from "../../components/community/StoriesBar"
import CreatePostBox from "../../components/community/CreatePostBox"
import PostCard from "../../components/community/PostCard"
import CommunitySidebar from "../../components/community/CommunitySidebar"

export const ALL_LOCATIONS = [
  "Manali", "Kasol", "Goa", "Leh Ladakh", "Varanasi",
  "Jaipur", "Rishikesh", "Udaipur", "Spiti Valley",
]

const INITIAL_FOLLOWED = ["Manali", "Kasol", "Goa"]

export const INITIAL_POSTS = [
  {
    id: 1,
    author: "Ananya Verma",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    location: "Spiti Valley",
    timeAgo: "4h ago",
    title: "Spiti Valley in July is a different vibe!",
    text: "The roads are challenging but the views are totally worth it. Here's a glimpse of my recent trip to this beautiful cold desert.",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=500&auto=format&fit=crop",
    ],
    tags: ["SpitiValley", "HimachalPradesh", "RoadTrip"],
    likes: 245,
    comments: 32,
    shares: 8,
  },
  {
    id: 2,
    author: "Rohit Backpacker",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop",
    location: "Manali",
    timeAgo: "6h ago",
    text: "Just completed the Manali trip in ₹3500. Here's my 3 day complete budget breakdown for fellow backpackers!",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=500&auto=format&fit=crop",
    ],
    tags: ["Manali", "BudgetTravel"],
    likes: 128,
    comments: 32,
    shares: 15,
  },
  {
    id: 3,
    author: "Priya Menon",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=200&auto=format&fit=crop",
    location: "Goa",
    timeAgo: "1d ago",
    text: "Found this hidden beach shack in South Goa with the best sunset view and no crowds at all. DM me for the exact location!",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=500&auto=format&fit=crop",
    ],
    tags: ["Goa", "HiddenGem"],
    likes: 312,
    comments: 54,
    shares: 21,
  },
  {
    id: 4,
    author: "Karan Thapa",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    location: "Kasol",
    timeAgo: "2d ago",
    text: "Trekked from Kasol to Kheerganga in one day. Tough but so worth it for those hot springs at the top.",
    images: [],
    tags: ["Kasol", "Trekking"],
    likes: 96,
    comments: 12,
    shares: 4,
  },
  {
    id: 5,
    author: "Simran Kaur",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&auto=format&fit=crop",
    location: "Varanasi",
    timeAgo: "3d ago",
    text: "The evening Ganga Aarti at Dashashwamedh Ghat is something every traveler should witness at least once.",
    images: [
      "https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=500&auto=format&fit=crop",
    ],
    tags: ["Varanasi", "Spiritual"],
    likes: 178,
    comments: 22,
    shares: 9,
  },
]

const INITIAL_STORIES = [
  { id: 1, author: "Ananya Verma", location: "Spiti Valley", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" },
  { id: 2, author: "Rohit Sharma", location: "Manali", avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop" },
  { id: 3, author: "Priya Menon", location: "Goa", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=200&auto=format&fit=crop" },
  { id: 4, author: "Karan Thapa", location: "Kasol", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" },
]

function Community() {

  const [followedLocations, setFollowedLocations] = useState(INITIAL_FOLLOWED)
  const [posts, setPosts] = useState(INITIAL_POSTS)
  const [activeTab, setActiveTab] = useState("feed") // "feed" | "explore"
  const [searchQuery, setSearchQuery] = useState("")

  const toggleFollow = (location) => {
    setFollowedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    )
  }

  const handleCreatePost = ({ text, location }) => {

    const newPost = {
      id: Date.now(),
      author: "You",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop",
      location,
      timeAgo: "Just now",
      text,
      images: [],
      tags: [],
      likes: 0,
      comments: 0,
      shares: 0,
    }

    setPosts((prev) => [newPost, ...prev])

    // posting about a location implies interest — auto-follow it so it shows in feed
    if (!followedLocations.includes(location)) {
      setFollowedLocations((prev) => [...prev, location])
    }

  }

  // FEED TAB: only posts/stories from followed locations
  const feedPosts = useMemo(
    () => posts.filter((p) => followedLocations.includes(p.location)),
    [posts, followedLocations]
  )

  const feedStories = useMemo(
    () => INITIAL_STORIES.filter((s) => followedLocations.includes(s.location)),
    [followedLocations]
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

            {activeTab === "feed" && (

              <>

                <StoriesBar stories={feedStories} />

                <CreatePostBox allLocations={ALL_LOCATIONS} onCreatePost={handleCreatePost} />

                <div className="bg-[#eef4ff] border border-[#dbe7ff] rounded-xl px-4 py-2.5 text-[12px] text-[#2563eb]">
                  Showing posts &amp; stories only from locations you follow: <span className="font-semibold">{followedLocations.join(", ") || "none yet"}</span>
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

            {activeTab === "explore" && (

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
