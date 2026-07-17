import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import {
  FaMapMarkerAlt, FaRoute, FaUsers, FaBook, FaExclamationTriangle,
  FaSuitcase, FaTag, FaStar, FaSpinner,
} from "react-icons/fa"

import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import { getLocationSummary } from "../../utils/locationSearch"
import { getLocationDashboardData, fetchLocationPosts } from "../../utils/locationDashboardHelpers"

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=1200&auto=format&fit=crop"

function SectionCard({ icon: Icon, title, count, viewAllPath, children, tone = "default" }) {

  const toneClasses = {
    default: "bg-white",
    danger: "bg-[#fdeaea]",
    success: "bg-[#e9f9ef]",
  }

  const iconTone = {
    default: "text-[#2563eb]",
    danger: "text-[#dc2626]",
    success: "text-[#16a34a]",
  }

  return (

    <div className={`${toneClasses[tone]} rounded-2xl border border-[#ececec] shadow-sm p-5`}>

      <div className="flex items-center justify-between mb-3">

        <div className="flex items-center gap-2">
          <Icon className={`text-[15px] ${iconTone[tone]}`} />
          <h2 className="text-[15px] font-bold text-[#111827]">
            {title}
          </h2>
          {typeof count === "number" && (
            <span className="text-[11px] text-[#9ca3af]">({count})</span>
          )}
        </div>

        {viewAllPath && (
          <Link to={viewAllPath} className="text-[#2563eb] text-[12px] font-semibold shrink-0">
            View all
          </Link>
        )}

      </div>

      {children}

    </div>

  )

}

function EmptyRow({ text }) {
  return (
    <p className="text-[12.5px] text-[#9ca3af] py-2">
      {text}
    </p>
  )
}

function LocationDashboard() {

  const { name } = useParams()
  const locationName = decodeURIComponent(name)

  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)

  const { destinations, packages, offers, guides, alerts, trips } =
  getLocationDashboardData(locationName)

  const [posts, setPosts] = useState([])

  useEffect(() => {

    let cancelled = false
    setLoading(true)

    getLocationSummary(locationName).then((result) => {
      if (!cancelled) {
        setSummary(result)
        setLoading(false)
      }
    })
    fetchLocationPosts(locationName).then((result) => {
        if (!cancelled) setPosts(result)
    })

    return () => { cancelled = true }

  }, [locationName])

  return (

    <div>

      <Navbar />

      <div className="flex">

        <Sidebar />

        <div className="flex-1 min-w-0 p-4 flex flex-col gap-4 max-w-[900px]">

          {/* HERO */}

          <div
            className="relative h-[180px] rounded-2xl overflow-hidden bg-cover bg-center bg-[#1e293b]"
            style={{ backgroundImage: `url(${summary?.image || FALLBACK_IMAGE})` }}
          >
            <div className="absolute inset-0 bg-black/45 flex flex-col justify-end p-5">

              <h1 className="text-white text-[24px] font-bold">
                {locationName}
              </h1>

              {loading ? (
                <p className="text-white/80 text-[12.5px] mt-1 flex items-center gap-2">
                  <FaSpinner className="animate-spin" /> Loading details...
                </p>
              ) : (
                <p className="text-white/85 text-[12.5px] mt-1 max-w-[600px] line-clamp-2">
                  {summary?.description || "Everything about this destination, in one place."}
                </p>
              )}

            </div>
          </div>

          {/* EXPLORE + TRIP PLANNER */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <SectionCard icon={FaMapMarkerAlt} title="Explore places" count={destinations.length} viewAllPath={`/explore?q=${encodeURIComponent(locationName)}`}>

              {destinations.length > 0 ? (
                <div className="flex gap-2 overflow-x-auto">
                  {destinations.slice(0, 4).map((d) => (
                    <img key={d.id} src={d.image} alt={d.name} className="w-[64px] h-[64px] rounded-xl object-cover shrink-0" />
                  ))}
                </div>
              ) : (
                <EmptyRow text="No matching places yet — browse all destinations instead." />
              )}

            </SectionCard>

            <SectionCard icon={FaRoute} title="Trip planner">
              <p className="text-[12.5px] text-[#6b7280] mb-3">
                Plan a trip to {locationName} in a few clicks.
              </p>
              <Link
                to="/trips"
                className="inline-block h-[34px] px-4 bg-[#2563eb] hover:bg-[#1d4ed8] transition text-white rounded-lg text-[12px] font-semibold leading-[34px]"
              >
                Plan this trip
              </Link>
            </SectionCard>

          </div>

          {/* COMMUNITY */}

          <SectionCard icon={FaUsers} title={`Community · ${locationName}`} count={posts.length} viewAllPath="/community">

            {posts.length > 0 ? (
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {posts.slice(0, 4).map((p) => (
                    <img key={p.id} src={p.avatar} alt={p.author} className="w-[40px] h-[40px] rounded-full object-cover border-2 border-white" />
                  ))}
                </div>
                <p className="text-[12.5px] text-[#6b7280]">
                  {posts.length} post{posts.length !== 1 ? "s" : ""} from travelers in {locationName}
                </p>
              </div>
            ) : (
              <EmptyRow text="No posts from this location yet — be the first to share one!" />
            )}

          </SectionCard>

          {/* ALERTS + BLOGS */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <SectionCard icon={FaExclamationTriangle} title="Scam alerts" count={alerts.length} viewAllPath="/alerts" tone="danger">

              {alerts.length > 0 ? (
                <div className="space-y-2">
                  {alerts.slice(0, 2).map((a) => (
                    <p key={a.id} className="text-[12px] text-[#7f1d1d] leading-4">
                      {a.title}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-[12px] text-[#7f1d1d]">
                  No reported alerts for {locationName} right now.
                </p>
              )}

            </SectionCard>

            <SectionCard icon={FaBook} title="Blogs & guides" count={guides.length} viewAllPath="/blogs-guides">

              {guides.length > 0 ? (
                <div className="space-y-1.5">
                  {guides.slice(0, 2).map((g) => (
                    <p key={g.id} className="text-[12px] text-[#374151] leading-4 truncate">
                      {g.title}
                    </p>
                  ))}
                </div>
              ) : (
                <EmptyRow text="No guides for this location yet." />
              )}

            </SectionCard>

          </div>

          {/* PACKAGES + OFFERS */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <SectionCard icon={FaSuitcase} title="Packages" count={packages.length} viewAllPath="/packages">

              {packages.length > 0 ? (
                <div className="space-y-2">
                  {packages.slice(0, 2).map((p) => (
                    <div key={p.id} className="flex items-center gap-2">
                      <img src={p.image} alt={p.title} className="w-[36px] h-[36px] rounded-lg object-cover shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[12px] font-medium text-[#111827] truncate">{p.title}</p>
                        <p className="text-[11px] text-[#9ca3af] flex items-center gap-1">
                          <FaStar className="text-[9px] text-[#f59e0b]" /> {p.rating} · ₹{p.price.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyRow text="No packages for this location yet." />
              )}

            </SectionCard>

            <SectionCard icon={FaTag} title="Offers" count={offers.length} viewAllPath="/offers" tone="success">

              {offers.length > 0 ? (
                <div className="space-y-1.5">
                  {offers.slice(0, 2).map((o) => (
                    <p key={o.id} className="text-[12px] text-[#166534] leading-4">
                      {o.badge} — {o.title}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-[12px] text-[#166534]">
                  No active offers for {locationName} right now.
                </p>
              )}

            </SectionCard>

          </div>

        </div>

      </div>

    </div>

  )

}

export default LocationDashboard