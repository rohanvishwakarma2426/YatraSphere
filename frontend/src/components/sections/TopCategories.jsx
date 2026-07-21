import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { FaTag, FaSpinner } from "react-icons/fa"
import { getCategoryLabel } from "../../utils/postCategories"
import { GUIDE_CATEGORIES } from "../../utils/guideHelpers"
import { EXPERIENCE_CATEGORIES } from "../../utils/experienceHelpers"

const GUIDE_KEYS = new Set(GUIDE_CATEGORIES.map((c) => c.key))
const EXPERIENCE_KEYS = new Set(EXPERIENCE_CATEGORIES.map((c) => c.key))

function metaFor(key) {
  return GUIDE_CATEGORIES.find((c) => c.key === key) || EXPERIENCE_CATEGORIES.find((c) => c.key === key) || null
}

function TopCategories() {

  const navigate = useNavigate()

  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    let cancelled = false

    axios.get("http://127.0.0.1:8000/posts")
      .then((res) => {
        if (cancelled) return

        const counts = {}
        for (const p of res.data) {
          counts[p.category] = (counts[p.category] || 0) + 1
        }

        const ranked = Object.entries(counts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([key, count]) => ({ key, count, label: getCategoryLabel(key), meta: metaFor(key) }))

        setCategories(ranked)
      })
      .catch((err) => console.error("Failed to load top categories:", err))
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }

  }, [])

  const handleClick = (cat) => {
    if (GUIDE_KEYS.has(cat.key)) navigate(`/guides?category=${cat.key}`)
    else if (EXPERIENCE_KEYS.has(cat.key)) navigate(`/experiences?q=${encodeURIComponent(cat.label)}`)
    else navigate("/community")
  }

  return (

    <div>

      <h2 className="text-[18px] font-bold text-[#111827] dark:text-gray-100 mb-3">
        Top Categories
      </h2>

      {loading ? (

        <div className="flex items-center gap-2 text-[#6b7280] dark:text-gray-400 text-[13px] py-6 justify-center">
          <FaSpinner className="animate-spin" /> Loading categories...
        </div>

      ) : categories.length === 0 ? (

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-[#ececec] dark:border-gray-800 p-6 text-center text-[#6b7280] dark:text-gray-400 text-[13px]">
          No categories yet — posts will group here automatically.
        </div>

      ) : (

        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">

          {categories.map((cat) => {
            const Icon = cat.meta?.icon || FaTag
            const bg = cat.meta?.bg || "bg-[#eef4ff]"
            const color = cat.meta?.color || "text-[#2563eb]"
            return (

              <div
                key={cat.key}
                onClick={() => handleClick(cat)}
                className="bg-white dark:bg-gray-900 rounded-xl border border-[#ececec] dark:border-gray-800 shadow-sm p-3 flex items-center gap-2.5 cursor-pointer hover:shadow-md transition"
              >

                <div className={`w-[34px] h-[34px] shrink-0 rounded-lg flex items-center justify-center ${bg} dark:bg-opacity-10`}>
                  <Icon className={`text-[14px] ${color}`} />
                </div>

                <div className="min-w-0">
                  <h3 className="text-[12.5px] font-semibold text-[#111827] dark:text-gray-100 truncate">
                    {cat.label}
                  </h3>
                  <p className="text-[11px] text-[#6b7280] dark:text-gray-400">
                    {cat.count} post{cat.count === 1 ? "" : "s"}
                  </p>
                </div>

              </div>

            )
          })}

        </div>

      )}

    </div>

  )
}

export default TopCategories