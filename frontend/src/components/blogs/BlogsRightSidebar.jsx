import { FaMapMarkedAlt, FaWallet, FaUserAlt, FaHiking, FaUtensils, FaCamera, FaLightbulb } from "react-icons/fa"
import { TOP_CATEGORIES, POPULAR_POSTS } from "./blogsData"

const CATEGORY_ICONS = [FaLightbulb, FaMapMarkedAlt, FaWallet, FaUserAlt, FaHiking, FaUtensils, FaCamera]
const CATEGORY_COLORS = [
  { bg: "bg-[#f2edfd]", color: "text-[#7c3aed]" },
  { bg: "bg-[#eaf1ff]", color: "text-[#2563eb]" },
  { bg: "bg-[#e9f9ef]", color: "text-[#16a34a]" },
  { bg: "bg-[#eaf1ff]", color: "text-[#2563eb]" },
  { bg: "bg-[#e9f9ef]", color: "text-[#16a34a]" },
  { bg: "bg-[#fff4e6]", color: "text-[#d97706]" },
  { bg: "bg-[#f2edfd]", color: "text-[#7c3aed]" },
]

function BlogsRightSidebar() {

  return (

    <div className="w-full xl:w-[300px] xl:shrink-0 flex flex-col gap-4">

      {/* TOP CATEGORIES */}

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#ececec]">

        <h2 className="text-[14px] font-bold text-[#111827] mb-3">Top Categories</h2>

        <div className="space-y-2.5">
          {TOP_CATEGORIES.map((cat, i) => {
            const Icon = CATEGORY_ICONS[i % CATEGORY_ICONS.length]
            const { bg, color } = CATEGORY_COLORS[i % CATEGORY_COLORS.length]
            return (
              <div key={cat.name} className="flex items-center justify-between cursor-pointer hover:bg-[#f9fafb] rounded-lg p-1.5 -m-1.5 transition">
                <div className="flex items-center gap-2.5">
                  <div className={`w-[30px] h-[30px] rounded-lg shrink-0 flex items-center justify-center ${bg}`}>
                    <Icon className={`text-[12px] ${color}`} />
                  </div>
                  <span className="text-[12.5px] font-medium text-[#111827]">{cat.name}</span>
                </div>
                <span className="text-[11px] text-[#9ca3af]">{cat.count} Articles</span>
              </div>
            )
          })}
        </div>

        <button className="mt-3 w-full h-[38px] text-[#2563eb] text-[12.5px] font-semibold border border-[#ececec] rounded-xl hover:bg-[#f5f7fb] transition">
          View All Categories
        </button>

      </div>

      {/* POPULAR POSTS */}

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#ececec]">

        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[14px] font-bold text-[#111827]">Popular Posts</h2>
        </div>

        <div className="space-y-3">
          {POPULAR_POSTS.map((post) => (
            <div key={post.title} className="flex items-start gap-2.5">
              <img src={post.image} alt={post.title} className="w-[52px] h-[52px] rounded-lg object-cover shrink-0" />
              <div className="min-w-0">
                <h3 className="text-[12px] font-semibold text-[#111827] leading-4">{post.title}</h3>
                <p className="text-[10.5px] text-[#9ca3af] mt-1">{post.date} · {post.readTime}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-3 w-full text-center text-[#2563eb] text-[12.5px] font-semibold">
          View All Popular Posts
        </button>

      </div>

    </div>

  )
}

export default BlogsRightSidebar