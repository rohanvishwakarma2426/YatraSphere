import { useEffect, useState } from "react"
import { FaPaperPlane } from "react-icons/fa"
import { DEAL_OF_THE_DAY } from "./offersData"

function splitTime(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  return { h: String(h).padStart(2, "0"), m: String(m).padStart(2, "0"), s: String(s).padStart(2, "0") }
}

function OffersRightSidebar() {

  const [secondsLeft, setSecondsLeft] = useState(DEAL_OF_THE_DAY.secondsLeft)
  const [email, setEmail] = useState("")
  const [category, setCategory] = useState("All Categories")
  const [destination, setDestination] = useState("All Destinations")
  const [discount, setDiscount] = useState("Any Discount")
  const [sort, setSort] = useState("Price: Low to High")

  useEffect(() => {
    const timer = setInterval(() => setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000)
    return () => clearInterval(timer)
  }, [])

  const { h, m, s } = splitTime(secondsLeft)
  const discountPercent = Math.round(((DEAL_OF_THE_DAY.originalPrice - DEAL_OF_THE_DAY.price) / DEAL_OF_THE_DAY.originalPrice) * 100)

  return (

    <div className="w-full xl:w-[300px] xl:shrink-0 flex flex-col gap-4">

      {/* DEAL OF THE DAY */}

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#ececec]">

        <h2 className="text-[14px] font-bold text-[#111827] mb-3">Deal of the Day</h2>

        <div className="flex items-center gap-2">
          {[{ v: h, l: "HRS" }, { v: m, l: "MINS" }, { v: s, l: "SECS" }].map((t, i) => (
            <div key={i} className="flex-1 bg-[#fdeaea] rounded-lg py-2 text-center">
              <p className="text-[15px] font-bold text-[#dc2626]">{t.v}</p>
              <p className="text-[9px] text-[#dc2626]/70 font-semibold">{t.l}</p>
            </div>
          ))}
        </div>

        <div className="relative mt-3">
          <img src={DEAL_OF_THE_DAY.image} alt={DEAL_OF_THE_DAY.title} className="w-full h-[130px] object-cover rounded-xl" />
          <span className="absolute top-2.5 left-2.5 bg-[#f59e0b] text-white text-[10px] font-bold px-2 py-1 rounded-full">
            SAVE ₹{DEAL_OF_THE_DAY.save.toLocaleString("en-IN")}
          </span>
        </div>

        <h3 className="text-[13.5px] font-bold text-[#111827] mt-3">{DEAL_OF_THE_DAY.title}</h3>
        <p className="text-[11px] text-[#6b7280] mt-0.5">{DEAL_OF_THE_DAY.duration}</p>
        <p className="text-[11px] text-[#6b7280] mt-0.5">{DEAL_OF_THE_DAY.location}</p>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-[16px] font-bold text-[#dc2626]">₹{DEAL_OF_THE_DAY.price.toLocaleString("en-IN")}</span>
          <span className="text-[12px] text-[#9ca3af] line-through">₹{DEAL_OF_THE_DAY.originalPrice.toLocaleString("en-IN")}</span>
          <span className="text-[10.5px] text-[#16a34a] font-semibold">{discountPercent}% OFF</span>
        </div>

        <button className="mt-3 w-full h-[40px] bg-[#2563eb] hover:bg-[#1d4ed8] transition text-white rounded-xl text-[13px] font-semibold">
          View Details
        </button>

      </div>

      {/* FILTER DEALS */}

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#ececec]">

        <h2 className="flex items-center gap-2 text-[14px] font-bold text-[#111827] mb-3">
          Filter Deals
        </h2>

        <div className="space-y-2.5">

          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full h-[38px] border border-[#ececec] rounded-xl px-3 outline-none text-[12px]">
            <option>All Categories</option>
            <option>Flights</option>
            <option>Hotels</option>
            <option>Packages</option>
            <option>Activities</option>
          </select>

          <select value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full h-[38px] border border-[#ececec] rounded-xl px-3 outline-none text-[12px]">
            <option>All Destinations</option>
            <option>Ladakh</option>
            <option>Goa</option>
            <option>Kashmir</option>
            <option>Kerala</option>
          </select>

          <select value={discount} onChange={(e) => setDiscount(e.target.value)} className="w-full h-[38px] border border-[#ececec] rounded-xl px-3 outline-none text-[12px]">
            <option>Any Discount</option>
            <option>10% & above</option>
            <option>20% & above</option>
            <option>30% & above</option>
          </select>

          <select value={sort} onChange={(e) => setSort(e.target.value)} className="w-full h-[38px] border border-[#ececec] rounded-xl px-3 outline-none text-[12px]">
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Highest Discount</option>
          </select>

        </div>

        <button className="mt-3 w-full h-[40px] bg-[#2563eb] hover:bg-[#1d4ed8] transition text-white rounded-xl text-[13px] font-semibold">
          Apply Filters
        </button>

      </div>

      {/* NEWSLETTER */}

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#ececec]">

        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-[32px] h-[32px] rounded-lg bg-[#eaf1ff] flex items-center justify-center shrink-0">
            <FaPaperPlane className="text-[#2563eb] text-[13px]" />
          </div>
          <h2 className="text-[14px] font-bold text-[#111827]">Never Miss a Deal!</h2>
        </div>

        <p className="text-[11px] text-[#6b7280] mb-3">Get the best offers directly in your inbox.</p>

        <div className="flex items-center gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 h-[40px] border border-[#ececec] rounded-xl px-3 outline-none text-[12px]"
          />
          <button className="h-[40px] px-4 shrink-0 bg-[#2563eb] hover:bg-[#1d4ed8] transition text-white rounded-xl text-[12px] font-semibold">
            Subscribe
          </button>
        </div>

      </div>

    </div>

  )
}

export default OffersRightSidebar