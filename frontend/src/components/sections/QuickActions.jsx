import { useNavigate } from "react-router-dom"
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
    // Already on Home — just jump to the Destinations search box.
    action: () => window.dispatchEvent(new Event("focus-destination-search")),
  },
  {
    icon: FaRoute,
    title: "Trip Planner",
    desc: "Plan your perfect itinerary",
    bg: "bg-[#e9f9ef]",
    color: "text-[#16a34a]",
    path: "/trips",
  },
  {
    icon: FaCalculator,
    title: "Budget Calculator",
    desc: "Calculate trip budget",
    bg: "bg-[#fff4e6]",
    color: "text-[#d97706]",
    path: "/budget-calculator",
  },
  {
    icon: FaShieldAlt,
    title: "Scam Alerts",
    desc: "Check travel scams & alerts",
    bg: "bg-[#fdeaea]",
    color: "text-[#dc2626]",
    path: "/alerts",
  },
  {
    icon: FaUsers,
    title: "Community",
    desc: "Connect with travelers",
    bg: "bg-[#f2edfd]",
    color: "text-[#7c3aed]",
    path: "/community",
  },
  {
    icon: FaTags,
    title: "Deals & Offers",
    desc: "Best discounts on travel",
    bg: "bg-[#fef6e7]",
    color: "text-[#ca8a04]",
    path: "/offers",
  },
]

function QuickActions() {

  const navigate = useNavigate()

  const handleClick = (item) => {
    if (item.action) item.action()
    else if (item.path) navigate(item.path)
  }

  return (

    <div>

      <div className="flex items-center justify-between mb-3">

        <h2 className="text-[18px] font-bold text-[#111827]">
          What would you like to do?
        </h2>

        {/* "See All" -> Explore Places, the closest thing to a full
            directory of everything these quick actions touch. */}

        <span
          onClick={() => navigate("/explore")}
          className="text-[#2563eb] text-[13px] font-semibold cursor-pointer hover:underline"
        >
          See All
        </span>

      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">

        {actions.map((item) => {
          const Icon = item.icon
          return (

            <div
              key={item.title}
              onClick={() => handleClick(item)}
              className="bg-white rounded-xl border border-[#ececec] shadow-sm p-3.5 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition"
            >

              <div className={`w-[36px] h-[36px] rounded-lg flex items-center justify-center ${item.bg}`}>
                <Icon className={`text-[15px] ${item.color}`} />
              </div>

              <h3 className="mt-3 text-[13px] font-semibold text-[#111827]">
                {item.title}
              </h3>

              <p className="mt-0.5 text-[11px] text-[#6b7280] leading-4">
                {item.desc}
              </p>

            </div>

          )
        })}

      </div>

    </div>

  )
}

export default QuickActions