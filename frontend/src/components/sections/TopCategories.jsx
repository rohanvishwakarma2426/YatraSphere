import {
  FaHeart,
  FaWallet,
  FaChild,
  FaMountain,
  FaUtensils,
  FaCompass,
} from "react-icons/fa"

const categories = [
  { icon: FaHeart, title: "Solo Travel", count: "123 Guides", bg: "bg-[#fdeaea]", color: "text-[#dc2626]" },
  { icon: FaWallet, title: "Budget Trips", count: "245 Guides", bg: "bg-[#eaf1ff]", color: "text-[#2563eb]" },
  { icon: FaChild, title: "Family Trips", count: "178 Guides", bg: "bg-[#eaf6fd]", color: "text-[#0891b2]" },
  { icon: FaMountain, title: "Adventure", count: "312 Guides", bg: "bg-[#f2edfd]", color: "text-[#7c3aed]" },
  { icon: FaUtensils, title: "Food & Culture", count: "156 Guides", bg: "bg-[#fff4e6]", color: "text-[#d97706]" },
  { icon: FaCompass, title: "Offbeat Places", count: "189 Guides", bg: "bg-[#e9f9ef]", color: "text-[#16a34a]" },
]

function TopCategories() {

  return (

    <div>

      <h2 className="text-[18px] font-bold text-[#111827] mb-3">
        Top Categories
      </h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">

        {categories.map(({ icon: Icon, title, count, bg, color }) => (

          <div
            key={title}
            className="bg-white rounded-xl border border-[#ececec] shadow-sm p-3 flex items-center gap-2.5 cursor-pointer hover:shadow-md transition"
          >

            <div className={`w-[34px] h-[34px] shrink-0 rounded-lg flex items-center justify-center ${bg}`}>
              <Icon className={`text-[14px] ${color}`} />
            </div>

            <div className="min-w-0">
              <h3 className="text-[12.5px] font-semibold text-[#111827] truncate">
                {title}
              </h3>
              <p className="text-[11px] text-[#6b7280]">
                {count}
              </p>
            </div>

          </div>

        ))}

      </div>

    </div>

  )
}

export default TopCategories
