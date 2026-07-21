import { useState } from "react"
import {
  FaMapMarkerAlt, FaCalendarAlt, FaBus, FaBed, FaUtensils, FaCamera, FaEllipsisH,
} from "react-icons/fa"

import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import BudgetResultSidebar from "../../components/budget/BudgetResultSidebar"
import {
  TRIP_TYPES, BUDGET_STYLES, TRAVELER_OPTIONS, DURATION_OPTIONS, computeBudget,
} from "../../utils/budgetHelpers"

const CATEGORY_ICONS = {
  Transport: { icon: FaBus, bg: "bg-[#f2edfd]", color: "text-[#7c3aed]" },
  Stay: { icon: FaBed, bg: "bg-[#eaf1ff]", color: "text-[#2563eb]" },
  Food: { icon: FaUtensils, bg: "bg-[#fff4e6]", color: "text-[#d97706]" },
  Activities: { icon: FaCamera, bg: "bg-[#e9f9ef]", color: "text-[#16a34a]" },
  Others: { icon: FaEllipsisH, bg: "bg-[#f3f4f6]", color: "text-[#6b7280]" },
}

const DEFAULT_FORM = {
  from: "Delhi, India",
  to: "Manali, Himachal Pradesh",
  duration: "5 Days / 4 Nights",
  travelDate: "",
  travelers: "2 Adults",
  tripType: "Standard",
  budgetStyle: "Balanced",
}

function BudgetCalculator() {

  const [form, setForm] = useState(DEFAULT_FORM)
  const [result, setResult] = useState(() => computeBudget(DEFAULT_FORM))
  const [dailyView, setDailyView] = useState("perDay") // perDay | total

  const update = (patch) => setForm((prev) => ({ ...prev, ...patch }))

  const handleCalculate = () => setResult(computeBudget(form))

  const handleReset = () => {
    setForm(DEFAULT_FORM)
    setResult(computeBudget(DEFAULT_FORM))
  }

  return (

    <div>

      <Navbar />

      <div className="flex">

        <Sidebar />

        <div className="flex-1 min-w-0 p-4 flex flex-col xl:flex-row gap-4 items-start">

          <div className="flex-1 min-w-0 w-full flex flex-col gap-4">

            {/* HEADER */}

            <div>
              <h1 className="text-[22px] font-bold text-[#111827]">Budget Calculator</h1>
              <p className="text-[13px] text-[#6b7280] mt-1">Plan your trip budget smartly</p>
            </div>

            {/* FORM CARD */}

            <div className="bg-white rounded-2xl border border-[#ececec] shadow-sm p-5">

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                <div>
                  <label className="text-[12px] font-semibold text-[#374151] mb-1.5 block">From</label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-[11px] text-[#9ca3af]" />
                    <input
                      value={form.from}
                      onChange={(e) => update({ from: e.target.value })}
                      className="w-full h-[42px] border border-[#ececec] rounded-xl pl-8 pr-3 outline-none text-[12.5px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[12px] font-semibold text-[#374151] mb-1.5 block">To</label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-[11px] text-[#9ca3af]" />
                    <input
                      value={form.to}
                      onChange={(e) => update({ to: e.target.value })}
                      className="w-full h-[42px] border border-[#ececec] rounded-xl pl-8 pr-3 outline-none text-[12.5px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[12px] font-semibold text-[#374151] mb-1.5 block">Trip Duration</label>
                  <select
                    value={form.duration}
                    onChange={(e) => update({ duration: e.target.value })}
                    className="w-full h-[42px] border border-[#ececec] rounded-xl px-3 outline-none text-[12.5px]"
                  >
                    {DURATION_OPTIONS.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-[12px] font-semibold text-[#374151] mb-1.5 block">Travel Date</label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-[11px] text-[#9ca3af]" />
                    <input
                      type="date"
                      value={form.travelDate}
                      onChange={(e) => update({ travelDate: e.target.value })}
                      className="w-full h-[42px] border border-[#ececec] rounded-xl pl-8 pr-3 outline-none text-[12.5px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[12px] font-semibold text-[#374151] mb-1.5 block">Travelers</label>
                  <select
                    value={form.travelers}
                    onChange={(e) => update({ travelers: e.target.value })}
                    className="w-full h-[42px] border border-[#ececec] rounded-xl px-3 outline-none text-[12.5px]"
                  >
                    {TRAVELER_OPTIONS.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-[12px] font-semibold text-[#374151] mb-1.5 block">Trip Type</label>
                  <select
                    value={form.tripType}
                    onChange={(e) => update({ tripType: e.target.value })}
                    className="w-full h-[42px] border border-[#ececec] rounded-xl px-3 outline-none text-[12.5px]"
                  >
                    {TRIP_TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-[12px] font-semibold text-[#374151] mb-1.5 flex items-center gap-1">
                    Budget Style
                    <span title="How much comfort you want vs. saving money" className="text-[#9ca3af] cursor-help">ⓘ</span>
                  </label>
                  <select
                    value={form.budgetStyle}
                    onChange={(e) => update({ budgetStyle: e.target.value })}
                    className="w-full h-[42px] border border-[#ececec] rounded-xl px-3 outline-none text-[12.5px]"
                  >
                    {BUDGET_STYLES.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </div>

              </div>

              <div className="mt-4 bg-[#eaf1ff] text-[#2563eb] text-[12px] rounded-xl px-4 py-2.5">
                💡 This is an estimated budget. Actual costs may vary based on season, availability and your preferences.
              </div>

              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={handleCalculate}
                  className="flex-1 h-[46px] bg-[#2563eb] hover:bg-[#1d4ed8] transition text-white rounded-xl text-[13.5px] font-semibold"
                >
                  Calculate Budget
                </button>
                <button
                  onClick={handleReset}
                  className="h-[46px] px-6 border border-[#ececec] rounded-xl text-[13.5px] font-semibold text-[#374151] hover:bg-[#f5f7fb] transition"
                >
                  Reset
                </button>
              </div>

            </div>

            {/* COST BREAKDOWN */}

            <div>

              <h2 className="text-[15px] font-bold text-[#111827] mb-3">Estimated Cost Breakdown</h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">

                {Object.entries(result.categories).map(([key, value]) => {
                  const meta = CATEGORY_ICONS[key]
                  const Icon = meta.icon
                  const percent = Math.round((value / result.total) * 100)

                  return (
                    <div key={key} className="bg-white rounded-xl border border-[#ececec] shadow-sm p-3.5">
                      <div className={`w-[32px] h-[32px] rounded-lg flex items-center justify-center ${meta.bg}`}>
                        <Icon className={`text-[13px] ${meta.color}`} />
                      </div>
                      <h3 className="mt-2.5 text-[12.5px] font-semibold text-[#111827]">{key}</h3>
                      <p className="text-[13px] font-bold text-[#111827] mt-0.5">₹{value.toLocaleString("en-IN")}</p>
                      <p className="text-[10.5px] text-[#9ca3af]">{percent}%</p>
                    </div>
                  )
                })}

              </div>

            </div>

            {/* DAILY ESTIMATE */}

            <div className="bg-white rounded-2xl border border-[#ececec] shadow-sm p-5">

              <div className="flex items-center justify-between mb-4">

                <h2 className="text-[15px] font-bold text-[#111827]">Daily Budget Estimate</h2>

                <div className="bg-[#f5f7fb] rounded-xl p-1 flex items-center gap-1">
                  {[{ key: "perDay", label: "Per Day" }, { key: "total", label: "Total Trip" }].map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => setDailyView(opt.key)}
                      className={`px-3.5 h-[30px] rounded-lg text-[11.5px] font-semibold transition ${
                        dailyView === opt.key ? "bg-[#2563eb] text-white" : "text-[#4b5563]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {result.dailyEstimate.map((d) => (
                  <div key={d.day} className="bg-[#f9fafb] rounded-xl p-3.5">
                    <p className="text-[11.5px] font-semibold text-[#111827]">Day {d.day}</p>
                    <p className="text-[13px] font-bold text-[#111827] mt-0.5">
                      ₹{(dailyView === "perDay" ? d.amount : d.amount * result.days).toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 bg-[#f5fbf7] text-[#16a34a] text-[12px] rounded-xl px-4 py-2.5">
                💡 Tip: Book your stay in advance and travel during weekdays to save more!
              </div>

            </div>

          </div>

          {/* RIGHT SIDEBAR — LIVE RESULT */}

          <BudgetResultSidebar result={result} />

        </div>

      </div>

    </div>

  )
}

export default BudgetCalculator