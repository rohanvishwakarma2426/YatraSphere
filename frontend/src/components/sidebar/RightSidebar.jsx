import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { FaExclamationTriangle, FaHeart, FaRegComment, FaShare } from "react-icons/fa"
import TrendingTopics from "../sections/TrendingTopics"

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop"

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

function RightSidebar() {

  const [scamAlerts, setScamAlerts] = useState([])
  const [latestPost, setLatestPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    let cancelled = false

    axios.get("http://127.0.0.1:8000/posts")
      .then((res) => {
        if (cancelled) return

        const posts = res.data

        const scams = posts
          .filter((p) => p.category === "scam")
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 3)
          .map((p) => ({
            id: p.id,
            title: p.title,
            desc: p.content,
            isNew: Date.now() - new Date(p.created_at).getTime() < 24 * 60 * 60 * 1000,
            timeAgo: timeAgo(p.created_at),
          }))

        setScamAlerts(scams)

        const sortedAll = [...posts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        setLatestPost(sortedAll[0] || null)
      })
      .catch((err) => console.error("Failed to load sidebar data:", err))
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }

  }, [])

  return (

    <div className="w-full xl:w-[300px] xl:shrink-0 flex flex-col gap-4">

      <TrendingTopics />

      {/* SCAM ALERTS */}

      <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-[#ececec] dark:border-gray-800">

        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[14px] font-bold text-[#111827] dark:text-gray-100">
            Scam Alerts
          </h2>
          <Link to="/alerts?category=scam" className="text-[#2563eb] dark:text-blue-400 text-[12px] font-semibold hover:underline">
            View All
          </Link>
        </div>

        {loading ? (

          <p className="text-[12px] text-[#9ca3af] dark:text-gray-500">Loading...</p>

        ) : scamAlerts.length === 0 ? (

          <p className="text-[12px] text-[#9ca3af] dark:text-gray-500">No scam reports yet.</p>

        ) : (

          <div className="space-y-3">

            {scamAlerts.map((alert) => (

              <div key={alert.id} className="flex items-start gap-2.5">

                <div className="w-[28px] h-[28px] shrink-0 rounded-lg bg-[#fdeaea] dark:bg-red-500/10 flex items-center justify-center">
                  <FaExclamationTriangle className="text-[#dc2626] dark:text-red-400 text-[11px]" />
                </div>

                <div className="min-w-0 flex-1">

                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-[12px] font-semibold text-[#111827] dark:text-gray-100 truncate">
                      {alert.title}
                    </h3>
                    {alert.isNew ? (
                      <span className="shrink-0 bg-[#fdeaea] dark:bg-red-500/10 text-[#dc2626] dark:text-red-400 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                        New
                      </span>
                    ) : (
                      <span className="shrink-0 text-[10px] text-[#9ca3af] dark:text-gray-500">
                        {alert.timeAgo}
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-[#6b7280] dark:text-gray-400 mt-0.5 truncate">
                    {alert.desc}
                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* FROM THE COMMUNITY */}

      <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-[#ececec] dark:border-gray-800">

        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[14px] font-bold text-[#111827] dark:text-gray-100">
            From the Community
          </h2>
          <Link to="/community" className="text-[#2563eb] dark:text-blue-400 text-[12px] font-semibold hover:underline">
            View All
          </Link>
        </div>

        {loading ? (

          <p className="text-[12px] text-[#9ca3af] dark:text-gray-500">Loading...</p>

        ) : !latestPost ? (

          <p className="text-[12px] text-[#9ca3af] dark:text-gray-500">
            No posts yet — be the first to{" "}
            <Link to="/share-experience" className="text-[#2563eb] dark:text-blue-400 underline">share</Link> one!
          </p>

        ) : (

          <>

            <div className="flex items-center gap-2.5">

              <img
                src={latestPost.author?.avatar_url || DEFAULT_AVATAR}
                alt={latestPost.author?.name || "Traveler"}
                className="w-[32px] h-[32px] rounded-full object-cover"
              />

              <div className="min-w-0">
                <h3 className="text-[12px] font-semibold text-[#111827] dark:text-gray-100 truncate">
                  {latestPost.author?.name || "Traveler"}
                </h3>
                <p className="text-[10px] text-[#9ca3af] dark:text-gray-500 truncate">
                  {latestPost.location ? `${latestPost.location} · ` : ""}{timeAgo(latestPost.created_at)}
                </p>
              </div>

            </div>

            <p className="mt-2.5 text-[12px] text-[#374151] dark:text-gray-300 leading-4.5 line-clamp-3">
              {latestPost.content}
            </p>

            {latestPost.image_url && (
              <img
                src={latestPost.image_url}
                alt={latestPost.title}
                className="mt-2.5 w-full h-[110px] object-cover rounded-lg"
              />
            )}

            <div className="mt-3 flex items-center gap-4 text-[#6b7280] dark:text-gray-400 text-[12px]">

              <span className="flex items-center gap-1">
                <FaHeart className="text-[12px]" /> {latestPost.likes_count || 0}
              </span>

              <span className="flex items-center gap-1">
                <FaRegComment className="text-[12px]" /> 0
              </span>

              <span className="flex items-center gap-1">
                <FaShare className="text-[12px]" /> 0
              </span>

            </div>

          </>

        )}

      </div>

    </div>

  )
}

export default RightSidebar