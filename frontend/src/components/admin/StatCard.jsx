import { FaArrowUp } from "react-icons/fa"

function StatCard({ icon: Icon, iconBg, iconColor, label, value, growth, isPlaceholder }) {

  return (

    <div className="bg-white rounded-2xl border border-[#ececec] shadow-sm p-4 relative">

      {isPlaceholder && (
        <span className="absolute top-3 right-3 text-[9px] font-semibold text-[#9ca3af] bg-[#f3f4f6] px-2 py-0.5 rounded-full">
          Sample data
        </span>
      )}

      <div className="flex items-center gap-3">

        <div className={`w-[42px] h-[42px] rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
          <Icon className={`text-[16px] ${iconColor}`} />
        </div>

        <div className="min-w-0">
          <p className="text-[12px] text-[#6b7280]">{label}</p>
          <p className="text-[20px] font-bold text-[#111827] leading-tight">{value}</p>
        </div>

      </div>

      {growth != null && (
        <p className="mt-2.5 text-[11.5px] text-emerald-600 flex items-center gap-1">
          <FaArrowUp className="text-[9px]" />
          {growth}% from last month
        </p>
      )}

    </div>

  )
}

export default StatCard