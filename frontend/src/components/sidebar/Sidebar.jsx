import { useEffect } from "react"
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
  FaPen,
  FaTimes,
} from "react-icons/fa"

import { useSidebar } from "../../hooks/useSidebar"

const menuItems = [
  { label: "Home", icon: FaHome, path: "/" },
  { label: "Explore Places", icon: FaMapMarkedAlt, path: "/explore" },
  { label: "Budget Calculator", icon: FaCalculator, path: "/budget-calculator" },
  { label: "Scam Alerts", icon: FaShieldAlt, path: "/alerts" },
  { label: "Trip Planner", icon: FaRoute, badge: "NEW", path: "/trips" },
  { label: "Community", icon: FaUsers, path: "/community" },
  { label: "Blogs & Guides", icon: FaBookOpen, path: "/blogs-guides" },
  { label: "Packages", icon: FaSuitcase, path: "/packages" },
  { label: "Offers & Deals", icon: FaTags, path: "/offers" },
  { label: "Share Experience", icon: FaPen, path: "/share-experience" },
]

function Sidebar() {

  const { pathname } = useLocation()
  const { isOpen, closeSidebar } = useSidebar()

  useEffect(() => {
    closeSidebar()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (

    <>

      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-[260px] overflow-y-auto bg-[#f5f6fa] dark:bg-[#0b1120] transform transition-transform duration-300 ease-in-out px-4 py-4
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:z-auto lg:translate-x-0 lg:w-[220px] lg:shrink-0 lg:min-h-screen`}
      >

        {/* MOBILE CLOSE BUTTON */}

        <button
          onClick={closeSidebar}
          className="lg:hidden mb-3 ml-auto flex w-[32px] h-[32px] items-center justify-center rounded-full bg-white dark:bg-gray-900 border border-[#ececec] dark:border-gray-800 text-[#4b5563] dark:text-gray-300"
        >
          <FaTimes className="text-[13px]" />
        </button>

        {/* MENU */}

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-3.5 shadow-sm border border-[#ececec] dark:border-gray-800">

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
                  ? "bg-[#edf3ff] dark:bg-blue-500/10 text-[#2563eb] dark:text-blue-400 font-semibold"
                  : "text-[#4b5563] dark:text-gray-300 hover:bg-[#f7f8fb] dark:hover:bg-gray-800"
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

        {/* PREMIUM CARD — kept as-is, gradient already looks good in dark mode */}

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

        {/* APP CARD — already dark (#111827), fine in both modes */}

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

    </>

  )
}

export default Sidebar