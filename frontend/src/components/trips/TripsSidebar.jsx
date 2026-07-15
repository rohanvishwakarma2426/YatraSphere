import { useState } from "react"
import CalendarView from "./CalendarView"

const CATEGORY_COLORS = {
  Transport: "#2563eb",
  Stay: "#16a34a",
  Food: "#f59e0b",
  Activities: "#7c3aed",
}

function BudgetDonut({ budget }) {

  const entries = Object.entries(budget.categories)
  const total = entries.reduce((sum, [, val]) => sum + val, 0) || 1

  const radius = 40
  const circumference = 2 * Math.PI * radius
  let offset = 0

  return (

    <svg viewBox="0 0 100 100" className="w-[110px] h-[110px] -rotate-90">

      <circle cx="50" cy="50" r={radius} fill="none" stroke="#f0f1f3" strokeWidth="14" />

      {entries.map(([key, val]) => {
        const fraction = val / total
        const dash = fraction * circumference
        const circle = (
          <circle
            key={key}
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={CATEGORY_COLORS[key] || "#9ca3af"}
            strokeWidth="14"
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeDashoffset={-offset}
            strokeLinecap="butt"
          />
        )
        offset += dash
        return circle
      })}

    </svg>

  )
}

function BudgetOverview({ budget }) {

  const remaining = Math.max(budget.total - budget.spent, 0)

  return (

    <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#ececec]">

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[14px] font-bold text-[#111827]">
          Budget Overview
        </h2>
        <span className="text-[#2563eb] text-[12px] font-semibold cursor-pointer">
          View Details
        </span>
      </div>

      <div className="flex items-center gap-4">

        <div className="relative shrink-0">
          <BudgetDonut budget={budget} />
        </div>

        <div>
          <p className="text-[11px] text-[#9ca3af]">Total Budget</p>
          <h3 className="text-[19px] font-bold text-[#111827]">
            ₹{budget.total.toLocaleString("en-IN")}
          </h3>
          <p className="text-[11px] text-[#9ca3af] mt-1">
            Spent: ₹{budget.spent.toLocaleString("en-IN")}
          </p>
          <p className="text-[11px] text-[#9ca3af]">
            Remaining: ₹{remaining.toLocaleString("en-IN")}
          </p>
        </div>

      </div>

      <div className="mt-4 space-y-1.5">

        {Object.entries(budget.categories).map(([key, val]) => (
          <div key={key} className="flex items-center justify-between text-[11.5px]">
            <span className="flex items-center gap-2 text-[#374151]">
              <span
                className="w-[8px] h-[8px] rounded-full"
                style={{ backgroundColor: CATEGORY_COLORS[key] }}
              />
              {key}
            </span>
            <span className="font-medium text-[#111827]">
              ₹{val.toLocaleString("en-IN")}
            </span>
          </div>
        ))}

      </div>

    </div>

  )
}

function PackingProgress({ items, onToggle }) {

  const checkedCount = items.filter((i) => i.checked).length
  const percent = items.length ? Math.round((checkedCount / items.length) * 100) : 0

  return (

    <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#ececec]">

      <div className="flex items-center justify-between mb-2">
        <h2 className="text-[14px] font-bold text-[#111827]">
          Packing Progress
        </h2>
        <span className="text-[#2563eb] text-[12px] font-semibold cursor-pointer">
          View Checklist
        </span>
      </div>

      <p className="text-[11.5px] text-[#6b7280] mb-1.5">
        {checkedCount}/{items.length} Items Packed
      </p>

      <div className="h-[6px] bg-[#f0f1f3] rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-[#16a34a] rounded-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="space-y-1.5 max-h-[150px] overflow-y-auto pr-1">

        {items.map((item) => (
          <label key={item.id} className="flex items-center gap-2 text-[12px] text-[#374151] cursor-pointer">
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => onToggle(item.id)}
              className="accent-[#16a34a] w-[14px] h-[14px]"
            />
            <span className={item.checked ? "line-through text-[#9ca3af]" : ""}>
              {item.label}
            </span>
          </label>
        ))}

      </div>

    </div>

  )
}

function SuggestedForYou() {

  return (

    <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#ececec]">

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[14px] font-bold text-[#111827]">
          Suggested For You
        </h2>
        <span className="text-[#2563eb] text-[12px] font-semibold cursor-pointer">
          View All
        </span>
      </div>

      <div className="flex gap-3">

        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=200&auto=format&fit=crop"
          alt="Manali"
          className="w-[64px] h-[64px] rounded-xl object-cover shrink-0"
        />

        <div className="min-w-0">
          <h3 className="text-[12.5px] font-semibold text-[#111827] truncate">
            Manali Weekend Trip
          </h3>
          <p className="text-[11px] text-[#9ca3af]">
            3 Days · Himachal Pradesh
          </p>
          <p className="text-[11px] text-[#f59e0b] mt-0.5">
            ★ 4.6 (128)
          </p>
          <p className="text-[12px] font-semibold text-[#111827] mt-0.5">
            ₹6,999 <span className="text-[10px] font-normal text-[#9ca3af]">/ person</span>
          </p>
        </div>

      </div>

    </div>

  )
}

const DEFAULT_PACKING_ITEMS = [
  { id: 1, label: "Passport / ID", checked: true },
  { id: 2, label: "Power Bank", checked: true },
  { id: 3, label: "Trekking Shoes", checked: true },
  { id: 4, label: "Rain Jacket", checked: false },
  { id: 5, label: "First Aid Kit", checked: true },
  { id: 6, label: "Camera", checked: false },
  { id: 7, label: "Snacks", checked: true },
  { id: 8, label: "Water Bottle", checked: true },
  { id: 9, label: "Sunscreen", checked: false },
  { id: 10, label: "Sleeping Bag", checked: false },
]

function TripsSidebar({ budget }) {

  const [packingItems, setPackingItems] = useState(DEFAULT_PACKING_ITEMS)

  const togglePackingItem = (id) => {
    setPackingItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i))
    )
  }

  return (

    <div className="w-full xl:w-[300px] xl:shrink-0 flex flex-col gap-4">

      <CalendarView />

      <BudgetOverview budget={budget} />

      <PackingProgress items={packingItems} onToggle={togglePackingItem} />

      <SuggestedForYou />

    </div>

  )
}

export default TripsSidebar