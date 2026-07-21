import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import {
  FaMapMarkerAlt,
  FaRoute,
  FaCalculator,
  FaShieldAlt,
  FaUsers,
  FaTags,
} from "react-icons/fa";

const actions = [
  {
    icon: FaMapMarkerAlt,
    title: "Find Places",
    desc: "Explore top destinations",
    bg: "bg-[#eaf1ff] dark:bg-blue-500/10",
    color: "text-[#2563eb] dark:text-blue-400",
    action: () => window.dispatchEvent(new Event("focus-destination-search")),
  },
  {
    icon: FaRoute,
    title: "Trip Planner",
    desc: "Plan your perfect itinerary",
    bg: "bg-[#e9f9ef] dark:bg-green-500/10",
    color: "text-[#16a34a] dark:text-green-400",
    path: "/trips",
  },
  {
    icon: FaCalculator,
    title: "Budget Calculator",
    desc: "Calculate trip budget",
    bg: "bg-[#fff4e6] dark:bg-orange-500/10",
    color: "text-[#d97706] dark:text-orange-400",
    path: "/budget-calculator",
  },
  {
    icon: FaShieldAlt,
    title: "Scam Alerts",
    desc: "Check travel scams & alerts",
    bg: "bg-[#fdeaea] dark:bg-red-500/10",
    color: "text-[#dc2626] dark:text-red-400",
    path: "/alerts",
  },
  {
    icon: FaUsers,
    title: "Community",
    desc: "Connect with travelers",
    bg: "bg-[#f2edfd] dark:bg-purple-500/10",
    color: "text-[#7c3aed] dark:text-purple-400",
    path: "/community",
  },
  {
    icon: FaTags,
    title: "Deals & Offers",
    desc: "Best discounts on travel",
    bg: "bg-[#fef6e7] dark:bg-yellow-500/10",
    color: "text-[#ca8a04] dark:text-yellow-400",
    path: "/offers",
  },
];

export default function QuickActionsCarousel() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const handleClick = (item) => {
    if (item.action) item.action();
    else if (item.path) navigate(item.path);
  };

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstChild?.offsetWidth || 220;
    scrollRef.current.scrollBy({
      left: direction === "next" ? cardWidth + 12 : -(cardWidth + 12),
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[18px] font-bold text-[#111827] dark:text-gray-100">
          What would you like to do?
        </h2>
        <span
          onClick={() => navigate("/explore")}
          className="text-[#2563eb] dark:text-blue-400 text-[13px] font-semibold cursor-pointer hover:underline"
        >
          See All
        </span>
      </div>

      {/* Prev arrow */}
      <button
        onClick={() => scroll("prev")}
        aria-label="Previous"
        className="hidden sm:flex absolute left-0 top-[calc(50%+14px)] -translate-y-1/2 z-10 w-9 h-9 items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow border border-[#ececec] dark:border-gray-700 text-[#4b5563] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 -translate-x-4"
      >
        <FiChevronLeft size={18} />
      </button>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-1"
        style={{ scrollbarWidth: "none" }}
      >
        {actions.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              onClick={() => handleClick(item)}
              className="snap-start shrink-0 w-[200px] sm:w-[220px] bg-white dark:bg-gray-900 rounded-xl border border-[#ececec] dark:border-gray-800 shadow-sm p-3.5 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition"
            >
              <div className={`w-[36px] h-[36px] rounded-lg flex items-center justify-center ${item.bg}`}>
                <Icon className={`text-[15px] ${item.color}`} />
              </div>
              <h3 className="mt-3 text-[13px] font-semibold text-[#111827] dark:text-gray-100">
                {item.title}
              </h3>
              <p className="mt-0.5 text-[11px] text-[#6b7280] dark:text-gray-400 leading-4">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Next arrow */}
      <button
        onClick={() => scroll("next")}
        aria-label="Next"
        className="hidden sm:flex absolute right-0 top-[calc(50%+14px)] -translate-y-1/2 z-10 w-9 h-9 items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow border border-[#ececec] dark:border-gray-700 text-[#4b5563] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 translate-x-4"
      >
        <FiChevronRight size={18} />
      </button>
    </div>
  );
}