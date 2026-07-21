import { useMemo, useState } from "react"
import {
  FaChevronRight, FaRegHeart, FaArrowRight, FaTag, FaShieldAlt, FaSync, FaHeadset,
} from "react-icons/fa"

import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import OffersRightSidebar from "../../components/offers/OffersRightSidebar"
import { OFFER_CATEGORIES, TOP_DEALS, BANK_OFFERS } from "../../components/offers/offersData"

const TRUST_BADGES = [
  { icon: FaTag, title: "Best Price Guarantee", desc: "We assure you the best prices", bg: "bg-[#eaf1ff]", color: "text-[#2563eb]" },
  { icon: FaShieldAlt, title: "Safe & Secure Booking", desc: "100% secure payments", bg: "bg-[#e9f9ef]", color: "text-[#16a34a]" },
  { icon: FaSync, title: "Easy Cancellations", desc: "Hassle-free cancellations", bg: "bg-[#f2edfd]", color: "text-[#7c3aed]" },
  { icon: FaHeadset, title: "24/7 Customer Support", desc: "Always here to help you", bg: "bg-[#fff4e6]", color: "text-[#d97706]" },
]

function OffersDeals() {

  const [activeCategory, setActiveCategory] = useState("All Offers")

  const visibleDeals = useMemo(
    () => activeCategory === "All Offers" ? TOP_DEALS : TOP_DEALS.filter((d) => d.category === activeCategory),
    [activeCategory]
  )

  return (

    <div>

      <Navbar />

      <div className="flex">

        <Sidebar />

        <div className="flex-1 min-w-0 p-4 flex flex-col xl:flex-row gap-4 items-start">

          <div className="flex-1 min-w-0 w-full flex flex-col gap-4">

            {/* HEADER */}

            <div>
              <h1 className="text-[22px] font-bold text-[#111827]">Offers &amp; Deals</h1>
              <p className="text-[13px] text-[#6b7280] mt-1">Best travel deals, discounts and exclusive offers for you</p>
            </div>

            {/* HERO BANNER */}

            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#6d28d9] to-[#7c3aed] p-8 flex items-center justify-between">

              <div>
                <h2 className="text-white text-[24px] font-bold">Summer Sale is Live!</h2>
                <p className="text-white/85 text-[13.5px] mt-1.5">Up to 40% OFF on Selected Packages</p>
                <button className="mt-4 bg-[#fbbf24] text-[#111827] text-[13px] font-semibold px-5 h-[42px] rounded-xl hover:scale-[1.02] transition">
                  Explore Deals
                </button>
              </div>

              <div className="hidden sm:flex items-center justify-center w-[110px] h-[110px] rounded-full bg-[#dc2626] text-white text-center shrink-0 flex-col leading-tight">
                <span className="text-[10px] font-semibold">UP TO</span>
                <span className="text-[22px] font-bold">40%</span>
                <span className="text-[10px] font-semibold">OFF</span>
              </div>

            </div>

            {/* CATEGORY PILLS */}

            <div className="flex items-center justify-between gap-3">

              <div className="flex items-center gap-2 overflow-x-auto">
                {OFFER_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`shrink-0 px-4 h-[38px] rounded-full text-[12.5px] font-semibold transition ${
                      activeCategory === cat
                        ? "bg-[#2563eb] text-white"
                        : "bg-white border border-[#ececec] text-[#4b5563] hover:bg-[#f5f7fb]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <button className="shrink-0 flex items-center gap-2 px-4 h-[38px] rounded-full border border-[#ececec] bg-white text-[12.5px] font-semibold text-[#4b5563]">
                Filters ⚙
              </button>

            </div>

            {/* TOP DEALS */}

            <div>

              <div className="flex items-center justify-between mb-3">
                <h2 className="text-[16px] font-bold text-[#111827]">Top Deals For You</h2>
                <span className="flex items-center gap-1 text-[#2563eb] text-[12.5px] font-semibold cursor-pointer">
                  View All Deals <FaChevronRight className="text-[10px]" />
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                {visibleDeals.map((deal) => (
                  <div key={deal.id} className="bg-white rounded-2xl border border-[#ececec] shadow-sm overflow-hidden hover:shadow-md transition">

                    <div className="relative h-[130px]">
                      <img src={deal.image} alt={deal.title} className="w-full h-full object-cover" />
                      <span className={`absolute top-3 left-3 ${deal.badgeColor} text-white text-[10px] font-semibold px-2.5 py-1 rounded-full`}>
                        {deal.badge}
                      </span>
                      <button className="absolute top-2.5 right-2.5 w-[26px] h-[26px] rounded-full bg-white/90 flex items-center justify-center">
                        <FaRegHeart className="text-[11px] text-[#4b5563]" />
                      </button>
                    </div>

                    <div className="p-4">
                      <h3 className="text-[14px] font-bold text-[#111827]">{deal.title}</h3>
                      <p className="text-[11.5px] text-[#6b7280] mt-1">{deal.desc}</p>

                      <div className="mt-3 bg-[#eef4ff] text-[#2563eb] text-[11px] font-semibold rounded-lg px-2.5 py-1.5 inline-block">
                        Use Code: {deal.code}
                      </div>

                      <button className="mt-3 w-full text-left text-[#2563eb] text-[12.5px] font-semibold flex items-center gap-1.5 hover:gap-2.5 transition-all">
                        BOOK NOW <FaArrowRight className="text-[10px]" />
                      </button>
                    </div>

                  </div>
                ))}

              </div>

            </div>

            {/* BANK OFFERS */}

            <div>

              <div className="flex items-center justify-between mb-3">
                <h2 className="text-[16px] font-bold text-[#111827]">Exclusive Bank Offers</h2>
                <span className="flex items-center gap-1 text-[#2563eb] text-[12.5px] font-semibold cursor-pointer">
                  View All Bank Offers <FaChevronRight className="text-[10px]" />
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {BANK_OFFERS.map((offer) => (
                  <div key={offer.bank} className={`rounded-2xl border border-[#ececec] shadow-sm p-4 ${offer.bg}`}>
                    <h3 className={`text-[14px] font-bold ${offer.color}`}>{offer.bank}</h3>
                    <p className="text-[13px] font-semibold text-[#111827] mt-2">{offer.discount}</p>
                    <p className="text-[11.5px] text-[#6b7280] mt-0.5">{offer.desc}</p>
                    <button className="mt-3 text-[#2563eb] text-[12px] font-semibold">View Details</button>
                  </div>
                ))}
              </div>

            </div>

            {/* TRUST BADGES */}

            <div className="bg-white rounded-2xl border border-[#ececec] shadow-sm p-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {TRUST_BADGES.map(({ icon: Icon, title, desc, bg, color }) => (
                <div key={title} className="flex items-center gap-2.5">
                  <div className={`w-[34px] h-[34px] rounded-lg shrink-0 flex items-center justify-center ${bg}`}>
                    <Icon className={`text-[14px] ${color}`} />
                  </div>
                  <div>
                    <h3 className="text-[12px] font-semibold text-[#111827]">{title}</h3>
                    <p className="text-[10.5px] text-[#6b7280]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT SIDEBAR */}

          <OffersRightSidebar />

        </div>

      </div>

    </div>

  )
}

export default OffersDeals