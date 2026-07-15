import { FaLightbulb, FaShareAlt } from "react-icons/fa"
import { CATEGORY_COLORS } from "../../utils/budgetHelpers"

const TIPS = [
  "Book buses instead of flights",
  "Stay in budget hotels or homestays",
  "Eat at local restaurants",
  "Plan & book activities in advance",
]

// Pure-SVG donut chart built from stroke-dasharray segments — no chart
// library needed since it's just a handful of categories.
function DonutChart({ categories, total }) {

  const radius = 60
  const circumference = 2 * Math.PI * radius
  let offsetSoFar = 0

  const entries = Object.entries(categories)

  return (
    <svg viewBox="0 0 160 160" className="w-[180px] h-[180px] mx-auto -rotate-90">
      <circle cx="80" cy="80" r={radius} fill="none" stroke="#f0f1f3" strokeWidth="20" />
      {entries.map(([key, value]) => {
        const fraction = total ? value / total : 0
        const dash = fraction * circumference
        const circle = (
          <circle
            key={key}
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={CATEGORY_COLORS[key] || "#9ca3af"}
            strokeWidth="20"
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeDashoffset={-offsetSoFar}
          />
        )
        offsetSoFar += dash
        return circle
      })}
    </svg>
  )
}

function BudgetResultSidebar({ result }) {

  const { total, perPerson, categories } = result

  return (

    <div className="w-full xl:w-[320px] xl:shrink-0 flex flex-col gap-4">

      {/* ESTIMATE CARD */}

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#ececec]">

        <h2 className="text-[14px] font-bold text-[#111827]">Your Estimated Budget</h2>

        <h1 className="text-[#16a34a] text-[30px] font-bold mt-1">
          ₹{total.toLocaleString("en-IN")}
        </h1>

        <p className="text-[11.5px] text-[#6b7280] mt-0.5">
          Total for {result.travelerCount} {result.travelerCount === 1 ? "Adult" : "Adults"} · {result.days} Days / {Math.max(result.days - 1, 0)} Nights
        </p>

        <DonutChart categories={categories} total={total} />

        <div className="mt-2 space-y-2">
          {Object.entries(categories).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between text-[12px]">
              <span className="flex items-center gap-2 text-[#374151]">
                <span className="w-[9px] h-[9px] rounded-full" style={{ background: CATEGORY_COLORS[key] }} />
                {key}
              </span>
              <span className="font-semibold text-[#111827]">₹{value.toLocaleString("en-IN")}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 bg-[#f5fbf7] rounded-xl p-4 border border-[#d8f5df] flex items-center justify-between">
          <span className="text-[12px] text-[#374151]">Average Cost Per Person</span>
          <span className="text-[15px] font-bold text-[#16a34a]">₹{perPerson.toLocaleString("en-IN")}</span>
        </div>

      </div>

      {/* SAVING TIPS */}

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#ececec]">

        <h2 className="flex items-center gap-2 text-[14px] font-bold text-[#111827] mb-3">
          <FaLightbulb className="text-[#f59e0b] text-[13px]" />
          Budget Saving Tips
        </h2>

        <div className="space-y-2">
          {TIPS.map((tip) => (
            <div key={tip} className="flex items-start gap-2 text-[12px] text-[#374151]">
              <span className="text-[#16a34a] font-bold">✓</span>
              {tip}
            </div>
          ))}
        </div>

      </div>

      {/* SHARE */}

      <button className="w-full h-[44px] bg-white border border-[#ececec] shadow-sm rounded-2xl text-[13px] font-semibold text-[#2563eb] flex items-center justify-center gap-2 hover:bg-[#f5f7fb] transition">
        <FaShareAlt className="text-[12px]" />
        Share Estimate
      </button>

    </div>

  )
}

export default BudgetResultSidebar