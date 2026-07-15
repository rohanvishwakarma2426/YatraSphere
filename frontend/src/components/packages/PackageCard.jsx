import { useState } from "react"
import { FaRegHeart, FaHeart, FaStar, FaMapMarkerAlt } from "react-icons/fa"
import { formatINR, BADGE_STYLES } from "../../utils/packageHelpers"

function PackageCard({ pkg }) {

  const [liked, setLiked] = useState(false)

  const discountPercent = pkg.originalPrice
    ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)
    : null

  return (

    <div className="bg-white rounded-2xl border border-[#ececec] shadow-sm overflow-hidden hover:shadow-md transition">

      {/* IMAGE */}

      <div className="relative h-[150px]">

        <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />

        {/* TOP-LEFT BADGE (best seller / popular / trending / new / discount) */}

        {pkg.badge && (
          <span className={`absolute top-3 left-3 ${BADGE_STYLES[pkg.badge] || "bg-[#2563eb]"} text-white text-[10px] font-semibold px-2.5 py-1 rounded-full`}>
            {pkg.badge}
          </span>
        )}

        {discountPercent && (
          <span className="absolute top-3 left-3 bg-[#dc2626] text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
            {discountPercent}% OFF
          </span>
        )}

        {/* WISHLIST HEART */}

        <button
          onClick={() => setLiked((v) => !v)}
          className="absolute top-2.5 right-2.5 w-[28px] h-[28px] rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition"
        >
          {liked ? (
            <FaHeart className="text-[12px] text-[#dc2626]" />
          ) : (
            <FaRegHeart className="text-[12px] text-[#4b5563]" />
          )}
        </button>

      </div>

      {/* CONTENT */}

      <div className="p-4">

        <h3 className="text-[14.5px] font-bold text-[#111827]">
          {pkg.title}
        </h3>

        <p className="text-[11.5px] text-[#9ca3af] mt-1">
          {pkg.days} Days / {pkg.nights} Nights
        </p>

        <div className="flex items-center gap-1.5 text-[11.5px] text-[#6b7280] mt-1.5">
          <FaMapMarkerAlt className="text-[10px] shrink-0" />
          <span className="truncate">{pkg.location}</span>
        </div>

        {/* INCLUDES */}

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2.5 text-[10.5px] text-[#6b7280]">
          {pkg.includes.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        {/* RATING */}

        <div className="flex items-center gap-1 mt-2.5 text-[11.5px]">
          <FaStar className="text-[#f59e0b] text-[11px]" />
          <span className="font-semibold text-[#111827]">{pkg.rating}</span>
          <span className="text-[#9ca3af]">({pkg.reviews})</span>
        </div>

        {/* PRICE */}

        <div className="flex items-center gap-2 mt-2">
          <span className="text-[16px] font-bold text-[#111827]">
            {formatINR(pkg.price)}
          </span>
          {pkg.originalPrice && (
            <span className="text-[12px] text-[#9ca3af] line-through">
              {formatINR(pkg.originalPrice)}
            </span>
          )}
          <span className="text-[10.5px] text-[#9ca3af]">/ per person</span>
        </div>

        {/* CTA */}

        <button className="mt-3 w-full h-[38px] bg-[#eef4ff] text-[#2563eb] rounded-xl text-[12.5px] font-semibold hover:bg-[#2563eb] hover:text-white transition">
          View Details
        </button>

      </div>

    </div>

  )
}

export default PackageCard