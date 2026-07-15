import { useState } from "react"
import { FaMapMarkerAlt, FaClock, FaEllipsisH, FaCheck } from "react-icons/fa"
import { CATEGORY_META, getRelativeTime } from "../../utils/alertHelpers"

function AlertCard({ alert, onToggleRead, onDismiss }) {

  const [menuOpen, setMenuOpen] = useState(false)
  const meta = CATEGORY_META[alert.category]
  const Icon = meta.icon

  return (

    <div
      className={`flex items-start gap-3 p-4 rounded-2xl border transition ${
        alert.read ? "bg-white border-[#ececec]" : "bg-[#f7faff] border-[#dbe7ff]"
      }`}
    >

      <div className={`w-[38px] h-[38px] rounded-xl flex items-center justify-center shrink-0 ${meta.bg}`}>
        <Icon className={`text-[15px] ${meta.text}`} />
      </div>

      <div className="flex-1 min-w-0">

        <div className="flex items-start justify-between gap-2">

          <div className="flex items-center gap-2 flex-wrap">

            <h3 className="text-[13.5px] font-semibold text-[#111827]">
              {alert.title}
            </h3>

            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${meta.pill}`}>
              {meta.label}
            </span>

            {!alert.read && (
              <span className="w-[7px] h-[7px] rounded-full bg-[#2563eb]" />
            )}

          </div>

          <div className="relative shrink-0 flex items-center gap-2">

            <span className="text-[11px] text-[#9ca3af] whitespace-nowrap">
              {getRelativeTime(alert.timestamp)}
            </span>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="text-[#9ca3af] hover:text-[#111827] transition"
            >
              <FaEllipsisH className="text-[11px]" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-6 w-[160px] bg-white rounded-xl shadow-lg border border-[#ececec] py-1.5 z-10">

                <button
                  onClick={() => { onToggleRead(alert.id); setMenuOpen(false) }}
                  className="w-full text-left px-3.5 py-2 text-[12px] text-[#374151] hover:bg-[#f5f7fb] flex items-center gap-2"
                >
                  <FaCheck className="text-[10px]" />
                  {alert.read ? "Mark as unread" : "Mark as read"}
                </button>

                <button
                  onClick={() => { onDismiss(alert.id); setMenuOpen(false) }}
                  className="w-full text-left px-3.5 py-2 text-[12px] text-[#dc2626] hover:bg-[#fdeaea]"
                >
                  Dismiss
                </button>

              </div>
            )}

          </div>

        </div>

        <p className="text-[12px] text-[#6b7280] mt-1 leading-5">
          {alert.description}
        </p>

        <div className="flex items-center gap-3 mt-2 text-[11px] text-[#9ca3af]">

          <span className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-[10px]" />
            {alert.location}
          </span>

          <span className="flex items-center gap-1">
            <FaClock className="text-[10px]" />
            {alert.time}
          </span>

        </div>

        {alert.ctaLabel && (
          <button className={`mt-2.5 h-[28px] px-3 rounded-lg text-[11px] font-semibold ${meta.pill}`}>
            {alert.ctaLabel}
          </button>
        )}

      </div>

      {alert.image && (
        <img
          src={alert.image}
          alt={alert.title}
          className="w-[70px] h-[54px] rounded-lg object-cover shrink-0 hidden sm:block"
        />
      )}

    </div>

  )
}

export default AlertCard