import { useEffect, useState } from "react"
import {
  FaClock, FaShieldAlt, FaHeadset, FaLock, FaAward, FaChevronRight,
} from "react-icons/fa"

const WHY_BOOK = [
  { icon: FaAward, title: "Best Price Guarantee", desc: "Get the best deals and offers", bg: "bg-[#fff4e6]", color: "text-[#d97706]" },
  { icon: FaHeadset, title: "24/7 Customer Support", desc: "We are here to help you anytime", bg: "bg-[#eaf1ff]", color: "text-[#2563eb]" },
  { icon: FaLock, title: "Secure Booking", desc: "Your booking is safe with us", bg: "bg-[#e9f9ef]", color: "text-[#16a34a]" },
  { icon: FaShieldAlt, title: "Trusted by 10K+ Travelers", desc: "Join our happy travel community", bg: "bg-[#fdeaea]", color: "text-[#dc2626]" },
]

const TOP_DESTINATIONS = [
  { name: "Ladakh", count: 128, image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=200&auto=format&fit=crop" },
  { name: "Goa", count: 96, image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=200&auto=format&fit=crop" },
  { name: "Himachal Pradesh", count: 84, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=200&auto=format&fit=crop" },
  { name: "Kerala", count: 78, image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=200&auto=format&fit=crop" },
  { name: "Rajasthan", count: 71, image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=200&auto=format&fit=crop" },
]

// Static "seconds left" seed for the deal timer — counts down live client-side.
const DEAL_SECONDS_LEFT = 12 * 3600 + 45 * 60 + 30

function formatCountdown(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  return `${h}h : ${String(m).padStart(2, "0")}m : ${String(s).padStart(2, "0")}s`
}

function PackagesRightSidebar() {

  const [secondsLeft, setSecondsLeft] = useState(DEAL_SECONDS_LEFT)
  const [email, setEmail] = useState("")

  // Ticks the deal countdown every second. Purely visual — resets on page reload.
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (

    <div className="w-full xl:w-[300px] xl:shrink-0 flex flex-col gap-4">

      {/* DEAL OF THE DAY */}

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#ececec]">

        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[14px] font-bold text-[#111827]">Deal of the Day</h2>
          <span className="flex items-center gap-1 bg-[#fdeaea] text-[#dc2626] text-[10px] font-semibold px-2 py-1 rounded-full">
            <FaClock className="text-[9px]" />
            {formatCountdown(secondsLeft)}
          </span>
        </div>

        <img
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=400&auto=format&fit=crop"
          alt="Andaman Paradise"
          className="w-full h-[110px] object-cover rounded-xl"
        />

        <h3 className="text-[13.5px] font-bold text-[#111827] mt-3">Andaman Paradise</h3>
        <p className="text-[11px] text-[#6b7280] mt-0.5">4 Days / 3 Nights</p>
        <p className="text-[11px] text-[#6b7280] mt-0.5">Port Blair, Havelock Island</p>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-[12px] text-[#9ca3af] line-through">₹18,999</span>
          <span className="text-[16px] font-bold text-[#111827]">₹12,999</span>
          <span className="text-[10.5px] text-[#16a34a] font-semibold">31% OFF</span>
        </div>

        <button className="mt-3 w-full h-[40px] bg-[#2563eb] hover:bg-[#1d4ed8] transition text-white rounded-xl text-[13px] font-semibold">
          View Deal
        </button>

      </div>

      {/* WHY BOOK WITH US */}

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#ececec]">

        <h2 className="text-[14px] font-bold text-[#111827] mb-3">Why Book with YatraSphere?</h2>

        <div className="space-y-3.5">
          {WHY_BOOK.map(({ icon: Icon, title, desc, bg, color }) => (
            <div key={title} className="flex items-start gap-2.5">
              <div className={`w-[30px] h-[30px] rounded-lg shrink-0 flex items-center justify-center ${bg}`}>
                <Icon className={`text-[12px] ${color}`} />
              </div>
              <div>
                <h3 className="text-[12px] font-semibold text-[#111827]">{title}</h3>
                <p className="text-[10.5px] text-[#6b7280] mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* TOP DESTINATIONS */}

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#ececec]">

        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[14px] font-bold text-[#111827]">Top Destinations</h2>
          <span className="flex items-center gap-0.5 text-[#2563eb] text-[12px] font-semibold cursor-pointer">
            View All <FaChevronRight className="text-[9px]" />
          </span>
        </div>

        <div className="space-y-3">
          {TOP_DESTINATIONS.map((dest) => (
            <div key={dest.name} className="flex items-center gap-2.5">
              <img src={dest.image} alt={dest.name} className="w-[38px] h-[38px] rounded-lg object-cover shrink-0" />
              <div>
                <h3 className="text-[12px] font-semibold text-[#111827]">{dest.name}</h3>
                <p className="text-[10.5px] text-[#9ca3af]">{dest.count} Packages</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* NEWSLETTER */}

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#ececec]">

        <h2 className="text-[14px] font-bold text-[#111827]">Get Exclusive Offers</h2>
        <p className="text-[11px] text-[#6b7280] mt-1">Subscribe to get best travel deals</p>

        <div className="flex items-center gap-2 mt-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 h-[40px] border border-[#ececec] rounded-xl px-3 outline-none text-[12px]"
          />
          <button className="w-[40px] h-[40px] shrink-0 bg-[#2563eb] hover:bg-[#1d4ed8] transition text-white rounded-xl flex items-center justify-center">
            →
          </button>
        </div>

      </div>

    </div>

  )
}

export default PackagesRightSidebar