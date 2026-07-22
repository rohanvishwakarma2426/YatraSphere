import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

import {
  HiOutlineMap,
} from "react-icons/hi"

import {
  FiUsers,
} from "react-icons/fi"

import {
  RiRoadMapLine,
} from "react-icons/ri"

import {
  BsBag,
} from "react-icons/bs"

import {
  FaBell,
  FaBars,
  FaSignOutAlt,
  FaSignInAlt,
  FaUser,
  FaUserShield,
} from "react-icons/fa"

import {
  AiOutlinePlus,
} from "react-icons/ai"

import logo from "../../assets/navbar/logo1.png"
import profile from "../../assets/navbar/profile.png"
import { useSidebar } from "../../hooks/useSidebar"
import { useAuth } from "../../hooks/useAuth"
import SearchBar from "./SearchBar"
import SettingsMenu from "./SettingsMenu"
import logoDark from "../../assets/logo-dark.png";
import { useTheme } from "../../context/ThemeContext"  

const NAV_ITEMS = [
  { label: "Explore", icon: HiOutlineMap, path: "/" },
  { label: "Community", icon: FiUsers, path: "/community" },
  { label: "Trips", icon: RiRoadMapLine, path: "/trips" },
  { label: "Alerts", icon: FaBell, path: "/alerts" },
  { label: "Packages", icon: BsBag, path: "/packages" },
]

function Navbar() {

  const { pathname } = useLocation()
  const { toggleSidebar } = useSidebar()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [profileOpen, setProfileOpen] = useState(false)
  const { theme } = useTheme()

  const handleLogout = () => {
    logout()
    setProfileOpen(false)
    navigate("/login")
  }

  return (

    <div className="w-full px-1 pt-1 sticky top-0 z-30 bg-[#f5f7fb] dark:bg-[#0b1120]">

      <div className="w-full h-[54px] bg-white dark:bg-gray-900 border border-[#ececec] dark:border-gray-800 rounded-[16px] shadow-sm flex items-center px-3 lg:px-0">

        {/* HAMBURGER (mobile only) */}

        <button
          onClick={toggleSidebar}
          className="lg:hidden mr-2 w-[34px] h-[34px] shrink-0 rounded-lg flex items-center justify-center text-[#4b5563] dark:text-gray-300 hover:bg-[#f5f7fb] dark:hover:bg-gray-800 transition"
        >
          <FaBars className="text-[16px]" />
        </button>

        {/* LOGO */}

        <img
  src={theme === "dark" ? logoDark : logo}
  alt="logo"
  className="w-[100px] h-[70] p-30 object-contain shrink-0"
/>
        {/* SEARCH (hidden on mobile to avoid overflow) */}

        <SearchBar />

        {/* MENU (hidden on mobile) */}

        <div className="hidden lg:flex items-center gap-4 ml-8 flex-1">

          {NAV_ITEMS.map(({ label, icon: Icon, path }) => {

            const active = path ? pathname === path : false

            const className = `flex items-center gap-1.5 cursor-pointer whitespace-nowrap transition ${
              active
                ? "text-[#2563eb] dark:text-blue-400 font-semibold"
                : "text-[#4b5563] dark:text-gray-300 hover:text-[#2563eb] dark:hover:text-blue-400"
            }`

            const content = (
              <>
                <Icon className="text-[17px]" />
                <span className="text-[14px]">
                  {label}
                </span>
              </>
            )

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

        {/* RIGHT */}

        <div className="flex items-center gap-2 shrink-0 ml-auto lg:ml-0">

          {/* BUTTON (hidden on mobile) */}

          <Link
            to="/share-experience"
            className="hidden lg:flex bg-[#2563eb] hover:bg-[#1d4ed8] transition text-white h-[32px] px-5 rounded-[9px] items-center gap-1 text-[13px] font-medium whitespace-nowrap"
          >

            <AiOutlinePlus className="text-[15px]" />

            Share Experience

          </Link>

          {/* NOTIFICATION */}

          <div className="relative cursor-pointer shrink-0">
            <FaBell className="text-[18px] text-[#4b5563] dark:text-gray-300" />
            <div className="absolute -top-1.5 -right-1.5 w-[16px] h-[16px] bg-red-500 rounded-full flex items-center justify-center text-white text-[9px] font-bold">
              3
            </div>
          </div>

          {/* SETTINGS */}
          <SettingsMenu />

          {/* PROFILE */}
          <div className="relative shrink-0">

            <button
              onClick={() => setProfileOpen((v) => !v)}
              className="flex items-center gap-2 cursor-pointer"
            >

              <img
                src={user?.avatar_url || profile}
                alt="profile"
                className="w-[36px] h-[36px] rounded-full object-cover"
              />

              <span className="hidden lg:block text-[13px] font-medium text-[#374151] dark:text-gray-200 max-w-[100px] truncate">
                {user ? user.name : "Guest"}
              </span>

            </button>

            {profileOpen && (

              <>

                <div
                  onClick={() => setProfileOpen(false)}
                  className="fixed inset-0 z-10"
                />

                <div className="absolute right-0 top-[46px] w-[200px] bg-white dark:bg-gray-900 rounded-xl border border-[#ececec] dark:border-gray-800 shadow-lg py-2 z-20">

                  <div className="px-4 py-2 border-b border-[#f0f0f0] dark:border-gray-800">
                    <p className="text-[13px] font-semibold text-[#111827] dark:text-gray-100 truncate">
                      {user ? user.name : "Guest"}
                    </p>
                    <p className="text-[11px] text-[#9ca3af] dark:text-gray-500 truncate">
                      {user ? user.email : "Not logged in"}
                    </p>
                  </div>

                  {user ? (
                    <>
                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] text-[#374151] dark:text-gray-300 hover:bg-[#f5f7fb] dark:hover:bg-gray-800 transition"
                      >
                        <FaUser className="text-[12px]" />
                        My Profile
                      </Link>
                      <Link
                 to="/admin/login"
                 onClick={() => setProfileOpen(false)}
                 className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] text-[#374151] dark:text-gray-300 hover:bg-[#f5f7fb] dark:hover:bg-gray-800 transition"
               >
                 <FaUserShield className="text-[12px]" />
                 Admin Login
              </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] text-[#dc2626] dark:text-red-400 hover:bg-[#fdeaea] dark:hover:bg-red-500/10 transition"
                      >
                        <FaSignOutAlt className="text-[12px]" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setProfileOpen(false)}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] text-[#2563eb] dark:text-blue-400 hover:bg-[#eef4ff] dark:hover:bg-blue-500/10 transition"
                    >
                      <FaSignInAlt className="text-[12px]" />
                      Login
                    </Link>
                  )}

                </div>

              </>

            )}

          </div>

        </div>

      </div>

    </div>

  )
}

export default Navbar