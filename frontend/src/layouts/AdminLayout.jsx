import { useState } from "react"
import { Outlet, NavLink, useNavigate } from "react-router-dom"
import {
  FaBars, FaSearch, FaBell, FaChevronDown, FaHome, FaUsers, FaMapMarkedAlt,
  FaSuitcase, FaClipboardList, FaBook, FaComments, FaStar, FaTags,
  FaChartBar, FaCog, FaBellSlash, FaLifeRing, FaSignOutAlt,
} from "react-icons/fa"
import { useAdminAuth } from "../hooks/useAdminAuth"

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop"

const MAIN_LINKS = [
  { to: "/admin/dashboard", label: "Dashboard", icon: FaHome },
  { to: "/admin/users", label: "Users", icon: FaUsers },
  { to: "/admin/destinations", label: "Destinations", icon: FaMapMarkedAlt },
  { to: "/admin/trips-packages", label: "Trips & Packages", icon: FaSuitcase },
  { to: "/admin/bookings", label: "Bookings", icon: FaClipboardList },
  { to: "/admin/blog-guides", label: "Blog & Guides", icon: FaBook },
  { to: "/admin/community-posts", label: "Community Posts", icon: FaComments },
  { to: "/admin/reviews-ratings", label: "Reviews & Ratings", icon: FaStar },
  { to: "/admin/offers-deals", label: "Offers & Deals", icon: FaTags },
  { to: "/admin/reports-analytics", label: "Reports & Analytics", icon: FaChartBar },
  { to: "/admin/site-settings", label: "Site Settings", icon: FaCog },
  { to: "/admin/notifications", label: "Notifications", icon: FaBellSlash },
]

function AdminLayout() {

  const { admin, logout } = useAdminAuth()
  const navigate = useNavigate()

  const [collapsed, setCollapsed] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/admin/login")
  }

  return (

    <div className="min-h-screen flex bg-[#f4f6f9]">

      <aside className={`shrink-0 bg-[#0f172a] text-white flex flex-col transition-all duration-200 ${collapsed ? "w-[76px]" : "w-[250px]"}`}>

        <div className="h-[64px] flex items-center gap-2.5 px-4 border-b border-white/10 shrink-0">
          <div className="w-[34px] h-[34px] rounded-lg bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center font-bold text-[15px] shrink-0">
            Y
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <h1 className="text-[14px] font-bold leading-tight truncate">YatraSphere</h1>
              <p className="text-[10.5px] text-white/50 leading-tight">Admin Panel</p>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-2.5">

          {!collapsed && <p className="px-2.5 mb-1.5 text-[10px] font-semibold text-white/35 uppercase tracking-wide">Main</p>}

          <div className="flex flex-col gap-0.5">
            {MAIN_LINKS.map((link) => {
              const Icon = link.icon
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  title={collapsed ? link.label : undefined}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-2.5 h-[38px] rounded-lg text-[13px] transition ${
                      isActive
                        ? "bg-emerald-600/90 text-white font-medium"
                        : "text-white/65 hover:bg-white/5 hover:text-white"
                    }`
                  }
                >
                  <Icon className="text-[13px] shrink-0" />
                  {!collapsed && <span className="truncate">{link.label}</span>}
                </NavLink>
              )
            })}
          </div>

          {!collapsed && <p className="px-2.5 mt-4 mb-1.5 text-[10px] font-semibold text-white/35 uppercase tracking-wide">Tools</p>}

          <NavLink
            to="/admin/support-tickets"
            title={collapsed ? "Support Tickets" : undefined}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-2.5 h-[38px] rounded-lg text-[13px] transition ${
                isActive ? "bg-emerald-600/90 text-white font-medium" : "text-white/65 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <FaLifeRing className="text-[13px] shrink-0" />
            {!collapsed && <span className="truncate">Support Tickets</span>}
          </NavLink>

        </nav>

        <div className="p-2.5 border-t border-white/10 shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-2.5 h-[38px] rounded-lg text-[13px] text-white/65 hover:bg-white/5 hover:text-white transition"
          >
            <FaSignOutAlt className="text-[13px] shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>

      </aside>

      <div className="flex-1 min-w-0 flex flex-col">

        <header className="h-[64px] shrink-0 bg-white border-b border-[#ececec] flex items-center justify-between px-5 gap-4">

          <button
            onClick={() => setCollapsed((c) => !c)}
            className="w-[36px] h-[36px] flex items-center justify-center rounded-lg text-[#4b5563] hover:bg-[#f3f4f6] transition"
          >
            <FaBars className="text-[15px]" />
          </button>

          <div className="flex-1 max-w-[420px] hidden sm:flex items-center gap-2 bg-[#f4f6f9] rounded-xl h-[38px] px-3.5">
            <FaSearch className="text-[#9ca3af] text-[12px]" />
            <input
              type="text"
              placeholder="Search anything..."
              className="flex-1 bg-transparent outline-none text-[12.5px]"
            />
          </div>

          <div className="flex items-center gap-3 shrink-0">

            <button className="relative w-[36px] h-[36px] flex items-center justify-center rounded-lg text-[#4b5563] hover:bg-[#f3f4f6] transition">
              <FaBell className="text-[15px]" />
              <span className="absolute top-0.5 right-0.5 w-[15px] h-[15px] bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                6
              </span>
            </button>

            <div className="relative">

              <button
                onClick={() => setProfileOpen((p) => !p)}
                className="flex items-center gap-2 pl-1 pr-2 h-[38px] rounded-lg hover:bg-[#f3f4f6] transition"
              >
                <img
                  src={admin?.avatar_url || DEFAULT_AVATAR}
                  alt={admin?.name || "Admin"}
                  className="w-[30px] h-[30px] rounded-full object-cover"
                />
                <div className="hidden sm:block text-left">
                  <p className="text-[12px] font-semibold text-[#111827] leading-tight">{admin?.name || "Admin"}</p>
                  <p className="text-[10.5px] text-[#9ca3af] leading-tight">Super Admin</p>
                </div>
                <FaChevronDown className="text-[10px] text-[#9ca3af]" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-[44px] w-[160px] bg-white rounded-xl border border-[#ececec] shadow-lg py-1.5 z-40">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3.5 py-2 text-[12.5px] text-[#dc2626] hover:bg-[#fdeaea] transition"
                  >
                    <FaSignOutAlt className="text-[11px]" />
                    Logout
                  </button>
                </div>
              )}

            </div>

          </div>

        </header>

        <main className="flex-1 p-5 overflow-y-auto">
          <Outlet />
        </main>

      </div>

    </div>

  )
}

export default AdminLayout