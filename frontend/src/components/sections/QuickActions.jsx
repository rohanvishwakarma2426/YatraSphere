import {
  FaMapMarkerAlt,
  FaRoute,
  FaCalculator,
  FaShieldAlt,
  FaUsers,
  FaTags,
} from "react-icons/fa"

const actions = [
  {
    icon: FaMapMarkerAlt,
    title: "Find Places",
    desc: "Explore top destinations",
    bg: "bg-[#eaf1ff]",
    color: "text-[#2563eb]",
  },
  {
    icon: FaRoute,
    title: "Trip Planner",
    desc: "Plan your perfect itinerary",
    bg: "bg-[#e9f9ef]",
    color: "text-[#16a34a]",
  },
  {
    icon: FaCalculator,
    title: "Budget Calculator",
    desc: "Calculate trip budget",
    bg: "bg-[#fff4e6]",
    color: "text-[#d97706]",
  },
  {
    icon: FaShieldAlt,
    title: "Scam Alerts",
    desc: "Check travel scams & alerts",
    bg: "bg-[#fdeaea]",
    color: "text-[#dc2626]",
  },
  {
    icon: FaUsers,
    title: "Community",
    desc: "Connect with travelers",
    bg: "bg-[#f2edfd]",
    color: "text-[#7c3aed]",
  },
  {
    icon: FaTags,
    title: "Deals & Offers",
    desc: "Best discounts on travel",
    bg: "bg-[#fef6e7]",
    color: "text-[#ca8a04]",
  },
]

function QuickActions() {

  return (

    <div>

      <div className="flex items-center justify-between mb-3">

        <h2 className="text-[18px] font-bold text-[#111827]">
          What would you like to do?
        </h2>

        <span className="text-[#2563eb] text-[13px] font-semibold cursor-pointer">
          See All
        </span>

      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">

        {actions.map(({ icon: Icon, title, desc, bg, color }) => (

          <div
            key={title}
            className="bg-white rounded-xl border border-[#ececec] shadow-sm p-3.5 cursor-pointer hover:shadow-md transition"
          >

            <div className={`w-[36px] h-[36px] rounded-lg flex items-center justify-center ${bg}`}>
              <Icon className={`text-[15px] ${color}`} />
            </div>

            <h3 className="mt-3 text-[13px] font-semibold text-[#111827]">
              {title}
            </h3>

            <p className="mt-0.5 text-[11px] text-[#6b7280] leading-4">
              {desc}
            </p>

          </div>

        ))}

      </div>

    </div>

  )
}

export default QuickActions
