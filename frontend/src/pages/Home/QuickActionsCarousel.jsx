import { useRef } from "react";
import { FiChevronLeft, FiChevronRight, FiMapPin, FiTarget, FiPieChart, FiShield, FiUsers, FiTag } from "react-icons/fi";

const actions = [
  { icon: FiMapPin, title: "Find Places", desc: "Explore top destinations", color: "blue" },
  { icon: FiTarget, title: "Trip Planner", desc: "Plan your perfect itinerary", color: "green" },
  { icon: FiPieChart, title: "Budget Calculator", desc: "Calculate trip budget", color: "orange" },
  { icon: FiShield, title: "Scam Alerts", desc: "Check travel scams & alerts", color: "red" },
  { icon: FiUsers, title: "Community", desc: "Connect with travelers", color: "purple" },
  { icon: FiTag, title: "Deals & Offers", desc: "Best discounts on travel", color: "yellow" },
];

const colorMap = {
  blue: "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  green: "bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400",
  orange: "bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
  red: "bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400",
  purple: "bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
  yellow: "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400",
};

export default function QuickActionsCarousel() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstChild?.offsetWidth || 260;
    scrollRef.current.scrollBy({ left: direction === "next" ? cardWidth + 16 : -(cardWidth + 16), behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">What would you like to do?</h2>
        <a href="#" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">See All</a>
      </div>

      <button onClick={() => scroll("prev")} aria-label="Previous" className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 -translate-x-4">
        <FiChevronLeft size={18} />
      </button>

      <div ref={scrollRef} className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-2" style={{ scrollbarWidth: "none" }}>
        {actions.map(({ icon: Icon, title, desc, color }) => (
          <div key={title} className="snap-start shrink-0 w-[220px] sm:w-[240px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:shadow-md transition-shadow cursor-pointer">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${colorMap[color]}`}>
              <Icon size={18} />
            </div>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">{title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
          </div>
        ))}
      </div>

      <button onClick={() => scroll("next")} aria-label="Next" className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 translate-x-4">
        <FiChevronRight size={18} />
      </button>
    </div>
  );
}