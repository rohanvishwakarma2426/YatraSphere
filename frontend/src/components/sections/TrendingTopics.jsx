import { useState, useEffect } from "react"
import axios from "axios"
import { FaFire } from "react-icons/fa"
import { getCategoryLabel } from "../../utils/postCategories"

function TrendingTopics() {

  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    let cancelled = false

    axios.get("http://127.0.0.1:8000/posts")
      .then((res) => {
        if (cancelled) return

        const counts = {}
        for (const p of res.data) {
          const label = getCategoryLabel(p.category)
          counts[label] = (counts[label] || 0) + 1
        }

        const sorted = Object.entries(counts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([title, count]) => ({ title, count }))

        setTopics(sorted)
      })
      .catch((err) => console.error("Failed to load trending topics:", err))
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }

  }, [])

  return (

    <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-[#ececec] dark:border-gray-800">

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[14px] font-bold text-[#111827] dark:text-gray-100 flex items-center gap-1.5">
          <FaFire className="text-[#f97316] text-[13px]" />
          Trending Topics
        </h2>
      </div>

      {loading ? (
        <p className="text-[12px] text-[#9ca3af] dark:text-gray-500">Loading...</p>
      ) : topics.length > 0 ? (
        <div className="space-y-3">
          {topics.map((topic) => (
            <div key={topic.title}>
              <h3 className="text-[12.5px] font-medium text-[#111827] dark:text-gray-100 leading-4.5">{topic.title}</h3>
              <p className="text-[11px] text-[#9ca3af] dark:text-gray-500 mt-0.5">{topic.count} post{topic.count === 1 ? "" : "s"}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[12px] text-[#9ca3af] dark:text-gray-500">No posts yet — be the first to start a topic!</p>
      )}

    </div>

  )
}

export default TrendingTopics