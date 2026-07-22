import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts"
import { FaUsers, FaSuitcase, FaRupeeSign, FaCommentAlt, FaSpinner } from "react-icons/fa"
import StatCard from "../../components/admin/StatCard"
import { useAdminAuth } from "../../hooks/useAdminAuth"

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop"

const DONUT_COLORS = ["#10b981", "#7c3aed", "#f59e0b", "#3b82f6", "#84cc16", "#9ca3af"]

function timeAgo(dateString) {
  const diffMs = Date.now() - new Date(dateString).getTime()
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return "Just now"
  if (mins < 60) return `${mins} min ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`
  const days = Math.floor(hours / 24)
  return `${days} day${days === 1 ? "" : "s"} ago`
}

function formatINR(n) {
  return "₹" + n.toLocaleString("en-IN")
}

function AdminDashboard() {

  const { admin } = useAdminAuth()

  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {

    let cancelled = false

    axios.get("http://127.0.0.1:8000/admin/stats")
      .then((res) => { if (!cancelled) setStats(res.data) })
      .catch((err) => {
        console.error("Failed to load admin stats:", err)
        if (!cancelled) setError("Couldn't load dashboard data. Is the backend running?")
      })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }

  }, [])

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-[#6b7280] text-[13px] py-16 justify-center">
        <FaSpinner className="animate-spin" /> Loading dashboard...
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="bg-white rounded-2xl border border-[#ececec] p-8 text-center text-[#dc2626] text-[13px]">
        {error || "Something went wrong."}
      </div>
    )
  }

  const { cards, bookings_overview, top_destinations, recent_users, recent_posts, recent_bookings } = stats

  return (

    <div className="flex flex-col gap-5">

      <div>
        <h1 className="text-[22px] font-bold text-[#111827]">Dashboard</h1>
        <p className="text-[13px] text-[#6b7280] mt-0.5">
          Welcome back, {admin?.name || "Admin"}! Here's what's happening with YatraSphere.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <StatCard
          icon={FaUsers} iconBg="bg-[#f2edfd]" iconColor="text-[#7c3aed]"
          label="Total Users" value={cards.total_users.value.toLocaleString("en-IN")}
          growth={12.5} isPlaceholder={cards.total_users.is_placeholder}
        />

        <StatCard
          icon={FaSuitcase} iconBg="bg-[#eaf1ff]" iconColor="text-[#2563eb]"
          label="Total Trips Booked" value={cards.total_trips_booked.value.toLocaleString("en-IN")}
          growth={8.3} isPlaceholder={cards.total_trips_booked.is_placeholder}
        />

        <StatCard
          icon={FaRupeeSign} iconBg="bg-[#e9f9ef]" iconColor="text-[#16a34a]"
          label="Total Revenue" value={formatINR(cards.total_revenue.value)}
          growth={15.7} isPlaceholder={cards.total_revenue.is_placeholder}
        />

        <StatCard
          icon={FaCommentAlt} iconBg="bg-[#fff4e6]" iconColor="text-[#d97706]"
          label="Community Posts" value={cards.total_posts.value.toLocaleString("en-IN")}
          growth={7.2} isPlaceholder={cards.total_posts.is_placeholder}
        />

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-4">

        <div className="bg-white rounded-2xl border border-[#ececec] shadow-sm p-4">

          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[14px] font-bold text-[#111827]">Bookings Overview</h2>
            <span className="text-[10px] font-semibold text-[#9ca3af] bg-[#f3f4f6] px-2 py-0.5 rounded-full">
              Sample data — no booking system yet
            </span>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={bookings_overview}>
              <defs>
                <linearGradient id="thisMonth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f1f3" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="last_month" stroke="#cbd5e1" strokeDasharray="4 3" fill="none" name="Last Month" />
              <Area type="monotone" dataKey="this_month" stroke="#10b981" strokeWidth={2} fill="url(#thisMonth)" name="This Month" />
            </AreaChart>
          </ResponsiveContainer>

        </div>

        <div className="bg-white rounded-2xl border border-[#ececec] shadow-sm p-4">

          <h2 className="text-[14px] font-bold text-[#111827] mb-3">Top Destinations</h2>

          {top_destinations.length === 0 ? (

            <p className="text-[12.5px] text-[#9ca3af] py-8 text-center">No location data yet.</p>

          ) : (

            <>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie
                    data={top_destinations}
                    dataKey="percent"
                    nameKey="name"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={2}
                  >
                    {top_destinations.map((_, i) => (
                      <Cell key={i} fill={DONUT_COLORS[i % DONUT_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <div className="flex flex-col gap-1.5 mt-2">
                {top_destinations.map((d, i) => (
                  <div key={d.name} className="flex items-center justify-between text-[12px]">
                    <span className="flex items-center gap-1.5 text-[#374151]">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: DONUT_COLORS[i % DONUT_COLORS.length] }} />
                      {d.name}
                    </span>
                    <span className="text-[#9ca3af] font-medium">{d.percent}%</span>
                  </div>
                ))}
              </div>
            </>

          )}

        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        <div className="bg-white rounded-2xl border border-[#ececec] shadow-sm p-4">

          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[14px] font-bold text-[#111827]">Recent Bookings</h2>
            <span className="text-[11px] font-semibold text-[#9ca3af]">Sample</span>
          </div>

          <div className="flex flex-col gap-3">
            {recent_bookings.map((b, i) => (
              <div key={i} className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[12.5px] font-semibold text-[#111827] truncate">{b.title}</p>
                  <p className="text-[11px] text-[#9ca3af]">By {b.by}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[12.5px] font-semibold text-[#111827]">{formatINR(b.amount)}</p>
                  <span className={`text-[9.5px] font-semibold px-1.5 py-0.5 rounded-full ${
                    b.status === "Confirmed" ? "bg-[#e9f9ef] text-[#16a34a]" : "bg-[#fff4e6] text-[#d97706]"
                  }`}>
                    {b.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        <div className="bg-white rounded-2xl border border-[#ececec] shadow-sm p-4">

          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[14px] font-bold text-[#111827]">Recent Users</h2>
            <Link to="/admin/users" className="text-[#2563eb] text-[11.5px] font-semibold hover:underline">View All</Link>
          </div>

          {recent_users.length === 0 ? (
            <p className="text-[12.5px] text-[#9ca3af]">No users yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {recent_users.map((u) => (
                <div key={u.id} className="flex items-center gap-2.5">
                  <img src={u.avatar_url || DEFAULT_AVATAR} alt={u.name} className="w-[32px] h-[32px] rounded-full object-cover shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[12.5px] font-semibold text-[#111827] truncate">{u.name}</p>
                    <p className="text-[11px] text-[#9ca3af] truncate">{u.email}</p>
                  </div>
                  <span className="text-[10.5px] text-[#9ca3af] shrink-0">{timeAgo(u.joined_at)}</span>
                </div>
              ))}
            </div>
          )}

        </div>

        <div className="bg-white rounded-2xl border border-[#ececec] shadow-sm p-4">

          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[14px] font-bold text-[#111827]">Recent Community Posts</h2>
            <Link to="/admin/community-posts" className="text-[#2563eb] text-[11.5px] font-semibold hover:underline">View All</Link>
          </div>

          {recent_posts.length === 0 ? (
            <p className="text-[12.5px] text-[#9ca3af]">No posts yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {recent_posts.map((p) => (
                <div key={p.id} className="flex items-center gap-2.5">
                  <img
                    src={p.image_url || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=200&auto=format&fit=crop"}
                    alt={p.title}
                    className="w-[38px] h-[38px] rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[12.5px] font-semibold text-[#111827] truncate">{p.title}</p>
                    <p className="text-[11px] text-[#9ca3af] truncate">By {p.author_name}</p>
                  </div>
                  <span className="text-[10.5px] text-[#9ca3af] shrink-0">{timeAgo(p.created_at)}</span>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </div>

  )
}

export default AdminDashboard