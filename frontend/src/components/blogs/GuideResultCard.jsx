import { FaMapMarkerAlt, FaHeart } from "react-icons/fa"
import { getGuideCategoryMeta } from "../../utils/guideHelpers"

function GuideResultCard({ post }) {

  const meta = getGuideCategoryMeta(post.category)
  const Icon = meta?.icon

  return (

    <div className="bg-white rounded-2xl border border-[#ececec] shadow-sm p-4 hover:shadow-md transition">

      <div className="flex items-center justify-between">

        {meta && (
          <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full ${meta.bg} ${meta.color}`}>
            {Icon && <Icon className="text-[10px]" />}
            {meta.label}
          </span>
        )}

        <span className="flex items-center gap-1 text-[11px] text-[#9ca3af]">
          <FaHeart className="text-[10px]" />
          {post.likes_count}
        </span>

      </div>

      <h3 className="text-[14px] font-bold text-[#111827] mt-2.5 leading-5">
        {post.title}
      </h3>

      <p className="text-[12px] text-[#6b7280] mt-1.5 leading-5 line-clamp-2">
        {post.content}
      </p>

      <div className="flex items-center justify-between mt-3 text-[10.5px] text-[#9ca3af]">

        {post.location && (
          <span className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-[9px]" />
            {post.location}
          </span>
        )}

        <span className="flex items-center gap-1.5">
          <span className="w-[18px] h-[18px] rounded-full bg-[#eef4ff] flex items-center justify-center text-[8px] font-bold text-[#2563eb]">
            {post.author.name.charAt(0)}
          </span>
          {post.author.name}
        </span>

      </div>

    </div>

  )
}

export default GuideResultCard