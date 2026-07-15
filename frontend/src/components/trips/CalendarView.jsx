import { useState } from "react"
import { FaChevronLeft, FaChevronRight, FaRegCalendarAlt } from "react-icons/fa"

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

function buildMonthGrid(year, month) {
  // month is 0-indexed. Week starts Monday.
  const firstDay = new Date(year, month, 1)
  const startOffset = (firstDay.getDay() + 6) % 7 // convert Sun=0 to Mon=0
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  const cells = []

  for (let i = startOffset; i > 0; i--) {
    cells.push({ day: daysInPrevMonth - i + 1, current: false })
  }

  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, current: true })
  }

  while (cells.length % 7 !== 0) {
    cells.push({ day: cells.length - (startOffset + daysInMonth) + 1, current: false })
  }

  return cells
}

function CalendarView() {

  const today = new Date()
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))

  const cells = buildMonthGrid(viewDate.getFullYear(), viewDate.getMonth())

  const monthLabel = viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })

  const goPrev = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))
  const goNext = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))

  const isToday = (day, current) =>
    current &&
    day === today.getDate() &&
    viewDate.getMonth() === today.getMonth() &&
    viewDate.getFullYear() === today.getFullYear()

  return (

    <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#ececec]">

      <div className="flex items-center gap-2 mb-3">
        <FaRegCalendarAlt className="text-[13px] text-[#2563eb]" />
        <h2 className="text-[14px] font-bold text-[#111827]">
          Calendar View
        </h2>
      </div>

      <div className="flex items-center justify-between mb-3">

        <button onClick={goPrev} className="text-[#9ca3af] hover:text-[#111827] transition">
          <FaChevronLeft className="text-[11px]" />
        </button>

        <span className="text-[12.5px] font-semibold text-[#111827]">
          {monthLabel}
        </span>

        <button onClick={goNext} className="text-[#9ca3af] hover:text-[#111827] transition">
          <FaChevronRight className="text-[11px]" />
        </button>

      </div>

      <div className="grid grid-cols-7 gap-y-1.5 text-center">

        {DAY_LABELS.map((d) => (
          <span key={d} className="text-[10px] font-semibold text-[#9ca3af]">
            {d}
          </span>
        ))}

        {cells.map((cell, i) => (
          <span
            key={i}
            className={`text-[11px] h-[24px] flex items-center justify-center rounded-full mx-auto w-[24px] ${
              isToday(cell.day, cell.current)
                ? "bg-[#2563eb] text-white font-bold"
                : cell.current
                ? "text-[#374151]"
                : "text-[#d1d5db]"
            }`}
          >
            {cell.day}
          </span>
        ))}

      </div>

    </div>

  )
}

export default CalendarView