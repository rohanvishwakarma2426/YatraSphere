import { useState } from "react"
import { FaHeart, FaRegHeart, FaRegComment, FaShare, FaRegBookmark, FaMapMarkerAlt } from "react-icons/fa"

function PostCard({ post }) {

  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)

  const toggleLike = () => {
    setLiked((prev) => !prev)
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1))
  }

  return (

    <div className="bg-white rounded-2xl border border-[#ececec] shadow-sm p-5">

      {/* HEADER */}

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-3">

          <img
            src={post.avatar}
            alt={post.author}
            className="w-[42px] h-[42px] rounded-full object-cover"
          />

          <div>
            <h3 className="text-[14px] font-semibold text-[#111827]">
              {post.author}
            </h3>
            <div className="flex items-center gap-1.5 text-[11.5px] text-[#9ca3af] mt-0.5">
              <span>{post.timeAgo}</span>
              <span>·</span>
              <FaMapMarkerAlt className="text-[10px]" />
              <span>{post.location}</span>
            </div>
          </div>

        </div>

      </div>

      {/* TEXT */}

      {post.title && (
        <h4 className="mt-3 text-[14px] font-semibold text-[#111827]">
          {post.title}
        </h4>
      )}

      <p className="mt-1.5 text-[13.5px] text-[#374151] leading-5">
        {post.text}
      </p>

      {/* IMAGES */}

      {post.images && post.images.length > 0 && (

        <div className="mt-3 grid grid-cols-2 gap-2 rounded-xl overflow-hidden">

          {post.images.slice(0, 4).map((img, i) => (

            <div key={i} className="relative">

              <img
                src={img}
                alt="post"
                className={`w-full object-cover ${
                  post.images.length === 1 ? "h-[280px] col-span-2" : "h-[140px]"
                }`}
              />

              {i === 3 && post.images.length > 4 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-[18px] font-bold">
                  +{post.images.length - 4}
                </div>
              )}

            </div>

          ))}

        </div>

      )}

      {/* TAGS */}

      {post.tags && post.tags.length > 0 && (

        <div className="mt-3 flex flex-wrap gap-1.5">

          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-[#eef4ff] text-[#2563eb] text-[11px] font-medium px-2.5 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}

        </div>

      )}

      {/* ACTIONS */}

      <div className="mt-4 pt-3 border-t border-[#f0f1f3] flex items-center justify-between text-[#6b7280] text-[13px]">

        <div className="flex items-center gap-4">

          <button
            onClick={toggleLike}
            className={`flex items-center gap-1.5 cursor-pointer transition ${
              liked ? "text-[#dc2626]" : "hover:text-[#dc2626]"
            }`}
          >
            {liked ? <FaHeart /> : <FaRegHeart />}
            {likeCount}
          </button>

          <button className="flex items-center gap-1.5 cursor-pointer hover:text-[#2563eb] transition">
            <FaRegComment />
            {post.comments}
          </button>

          <button className="flex items-center gap-1.5 cursor-pointer hover:text-[#2563eb] transition">
            <FaShare />
            {post.shares || ""}
          </button>

        </div>

        <button className="cursor-pointer hover:text-[#2563eb] transition">
          <FaRegBookmark />
        </button>

      </div>

    </div>

  )
}

export default PostCard
