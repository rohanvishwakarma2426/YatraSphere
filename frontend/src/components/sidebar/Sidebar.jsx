import {
  FaHome,
  FaMapMarkedAlt,
  FaCalculator,
  FaUsers,
  FaSuitcase,
  FaShieldAlt,
  FaRoute,
  FaBookOpen,
  FaTags,
} from "react-icons/fa"

const menuItems = [
  { label: "Home", icon: FaHome, active: true },
  { label: "Explore Places", icon: FaMapMarkedAlt },
  { label: "Budget Calculator", icon: FaCalculator },
  { label: "Scam Alerts", icon: FaShieldAlt },
  { label: "Trip Planner", icon: FaRoute, badge: "NEW" },
  { label: "Community", icon: FaUsers },
  { label: "Blogs & Guides", icon: FaBookOpen },
  { label: "Packages", icon: FaSuitcase },
  { label: "Offers & Deals", icon: FaTags },
]

function Sidebar() {

  return (

    <div className="w-[260px] shrink-0 min-h-screen px-5 py-5">

      {/* MENU */}

      <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#ececec]">

        <div className="space-y-1">

          {menuItems.map(({ label, icon: Icon, active, badge }) => (

            <div
              key={label}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl cursor-pointer transition ${
                active
                  ? "bg-[#edf3ff] text-[#2563eb] font-semibold"
                  : "text-[#4b5563] hover:bg-[#f7f8fb]"
              }`}
            >

              <Icon className="text-[18px] shrink-0" />

              <span className="text-[15px]">
                {label}
              </span>

              {badge && (
                <span className="ml-auto bg-[#ef4444] text-white text-[10px] font-bold px-2 py-1 rounded-full">
                  {badge}
                </span>
              )}

            </div>

          ))}

        </div>

      </div>

      {/* PREMIUM CARD */}

      <div className="mt-5 bg-gradient-to-br from-[#7c3aed] to-[#2563eb] rounded-3xl p-6 text-white">

        <h2 className="text-[22px] font-bold">
          Go Premium
        </h2>

        <p className="mt-3 text-[14px] leading-6 text-white/80">

          Unlock exclusive itineraries,
          AI planner, hidden gems
          and more.

        </p>

        <button className="mt-6 w-full h-[50px] bg-white text-[#2563eb] rounded-2xl font-semibold hover:scale-[1.02] transition">

          Upgrade Now

        </button>

      </div>

      {/* APP CARD */}

      <div className="mt-5 bg-[#111827] rounded-3xl p-6 text-white">

        <h2 className="text-[22px] font-bold leading-9">

          Take YatraSphere
          Wherever You Go!

        </h2>

        <p className="mt-3 text-[14px] text-gray-300 leading-6">

          Download our app for the
          best travel experience.

        </p>

        <div className="mt-6 space-y-3">

          <button className="w-full h-[50px] bg-white/10 rounded-2xl">

            Google Play

          </button>

          <button className="w-full h-[50px] bg-white/10 rounded-2xl">

            App Store

          </button>

        </div>

      </div>

    </div>

  )
}

export default Sidebar