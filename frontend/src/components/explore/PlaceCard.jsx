import { FaStar, FaRegHeart, FaHeart, FaCalendarAlt } from "react-icons/fa"

function PlaceCard({ place, wishlisted, onToggleWishlist }) {

  return (

    <div className="relative shrink-0 w-[220px] bg-white rounded-2xl overflow-hidden border border-[#ececec] shadow-sm cursor-pointer group">

      <div className="relative h-[150px]">

        <img
          src={place.image}
          alt={place.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        <span className="absolute top-2.5 left-2.5 bg-white/95 text-[11px] font-semibold px-2 py-1 rounded-full flex items-center gap-1 text-[#111827]">
          <FaStar className="text-[10px] text-[#f59e0b]" />
          {place.rating}
        </span>

        <button
          onClick={() => onToggleWishlist(place.id)}
          className="absolute top-2.5 right-2.5 w-[26px] h-[26px] rounded-full bg-white/95 flex items-center justify-center hover:bg-white transition"
        >
          {wishlisted ? (
            <FaHeart className="text-[11px] text-[#dc2626]" />
          ) : (
            <FaRegHeart className="text-[11px] text-[#4b5563]" />
          )}
        </button>

        <div className="absolute bottom-2.5 left-3 right-3 text-white">

          <h3 className="text-[15px] font-bold leading-tight">
            {place.name}
          </h3>

          <p className="text-[11px] text-white/85 mt-0.5">
            {place.region}
          </p>

        </div>

      </div>

      <div className="px-3 py-2.5 bg-[#f9fafb] flex items-center gap-1.5 text-[11px] text-[#6b7280]">
        <FaCalendarAlt className="text-[10px] text-[#9ca3af]" />
        Best time: {place.bestTime}
      </div>

    </div>

  )
}

export default PlaceCard