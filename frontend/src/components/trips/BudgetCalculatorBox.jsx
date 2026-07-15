import { useState } from "react"
import { FaCalculator } from "react-icons/fa"
import { estimateBudget } from "../../utils/tripHelpers"

function BudgetCalculatorBox({ onAddToBudget }) {

  const [destination, setDestination] = useState("Manali, Himachal Pradesh")
  const [days, setDays] = useState(3)
  const [style, setStyle] = useState("Budget Travel")
  const [estimate, setEstimate] = useState(null)

  const handleCalculate = () => {
    setEstimate(estimateBudget(days, style))
  }

  const handleAdd = () => {
    if (!estimate) return
    onAddToBudget(estimate)
    setEstimate(null)
  }

  return (

    <div className="bg-white rounded-2xl border border-[#ececec] shadow-sm p-5">

      <div className="flex items-center gap-2">
        <FaCalculator className="text-[13px] text-[#2563eb]" />
        <h2 className="text-[15px] font-bold text-[#111827]">
          Budget Calculator
        </h2>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">

        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="h-[40px] border border-[#ececec] rounded-lg px-3 outline-none text-[12.5px]"
        >
          <option>Manali, Himachal Pradesh</option>
          <option>Goa</option>
          <option>Leh Ladakh</option>
          <option>Kasol, Himachal Pradesh</option>
          <option>Kedarnath, Uttarakhand</option>
        </select>

        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="h-[40px] border border-[#ececec] rounded-lg px-3 outline-none text-[12.5px]"
        >
          {[2, 3, 4, 5, 7, 10].map((d) => (
            <option key={d} value={d}>{d} Days</option>
          ))}
        </select>

        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="h-[40px] border border-[#ececec] rounded-lg px-3 outline-none text-[12.5px]"
        >
          <option>Budget Travel</option>
          <option>Mid-Range</option>
          <option>Luxury</option>
        </select>

      </div>

      <button
        onClick={handleCalculate}
        className="mt-3 w-full h-[40px] bg-[#2563eb] hover:bg-[#1d4ed8] transition text-white rounded-lg text-[12.5px] font-semibold"
      >
        Calculate My Budget
      </button>

      {estimate && (

        <div className="mt-4 bg-[#f5fbf7] border border-[#d8f5df] rounded-xl p-4">

          <p className="text-[11.5px] text-[#6b7280]">Estimated Budget for {destination}</p>

          <h3 className="text-[22px] font-bold text-[#16a34a] mt-1">
            ₹{estimate.total.toLocaleString("en-IN")}
          </h3>

          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-[#374151]">
            {Object.entries(estimate.categories).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between">
                <span>{key}</span>
                <span className="font-medium">₹{val.toLocaleString("en-IN")}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleAdd}
            className="mt-3 w-full h-[36px] bg-[#16a34a] hover:bg-[#15803d] transition text-white rounded-lg text-[12px] font-semibold"
          >
            Add to My Budget
          </button>

        </div>

      )}

    </div>

  )
}

export default BudgetCalculatorBox