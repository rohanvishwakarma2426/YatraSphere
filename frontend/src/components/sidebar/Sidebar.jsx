import { Link, useLocation } from "react-router-dom"

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
  { label: "Home", icon: FaHome, path: "/" },
  { label: "Explore Places", icon: FaMapMarkedAlt },
  { label: "Budget Calculator", icon: FaCalculator },
  { label: "Scam Alerts", icon: FaShieldAlt, path: "/alerts" },
  { label: "Trip Planner", icon: FaRoute, badge: "NEW", path: "/trips" },
  { label: "Community", icon: FaUsers, path: "/community" },
  { label: "Blogs & Guides", icon: FaBookOpen },
  { label: "Packages", icon: FaSuitcase },
  { label: "Offers & Deals", icon: FaTags },
]

function Sidebar() {

  const { pathname } = useLocation()

  return (

    <div className="w-[220px] shrink-0 min-h-screen px-4 py-4">

      {/* MENU */}

      <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#ececec]">

        <div className="space-y-0.5">

          {menuItems.map(({ label, icon: Icon, badge, path }) => {

            const active = path ? pathname === path : false

            const content = (
              <>
                <Icon className="text-[15px] shrink-0" />

                <span className="text-[13px]">
                  {label}
                </span>

                {badge && (
                  <span className="ml-auto bg-[#ef4444] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                    {badge}
                  </span>
                )}
              </>
            )

            const className = `flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition ${
              active
                ? "bg-[#edf3ff] text-[#2563eb] font-semibold"
                : "text-[#4b5563] hover:bg-[#f7f8fb]"
            }`

            return path ? (
              <Link key={label} to={path} className={className}>
                {content}
              </Link>
            ) : (
              <div key={label} className={className}>
                {content}
              </div>
            )

          })}

        </div>

      </div>

      {/* PREMIUM CARD */}

      <div className="mt-4 bg-gradient-to-br from-[#7c3aed] to-[#2563eb] rounded-2xl p-5 text-white">

        <h2 className="text-[17px] font-bold">
          Go Premium
        </h2>

        <p className="mt-2 text-[12px] leading-5 text-white/80">

          Unlock exclusive itineraries,
          AI planner, hidden gems
          and more.

        </p>

        <button className="mt-4 w-full h-[40px] bg-white text-[#2563eb] rounded-xl text-[13px] font-semibold hover:scale-[1.02] transition">

          Upgrade Now

        </button>

      </div>

      {/* APP CARD */}

      <div className="mt-4 bg-[#111827] rounded-2xl p-5 text-white">

        <h2 className="text-[17px] font-bold leading-6">

          Take YatraSphere
          Wherever You Go!

        </h2>

        <p className="mt-2 text-[12px] text-gray-300 leading-5">

          Download our app for the
          best travel experience.

        </p>

        <div className="mt-4 space-y-2">

          <button className="w-full h-[40px] bg-white/10 rounded-xl text-[13px]">

            Google Play

          </button>

          <button className="w-full h-[40px] bg-white/10 rounded-xl text-[13px]">

            App Store

          </button>

        </div>

      </div>

    </div>

  )
}

export default Sidebar