import { FaTools } from "react-icons/fa"

function AdminComingSoon({ title }) {
  return (
    <div className="bg-white rounded-2xl border border-[#ececec] shadow-sm p-14 flex flex-col items-center text-center">
      <div className="w-[52px] h-[52px] rounded-full bg-[#eef4ff] flex items-center justify-center mb-4">
        <FaTools className="text-[#2563eb] text-[20px]" />
      </div>
      <h2 className="text-[16px] font-bold text-[#111827]">{title}</h2>
      <p className="text-[13px] text-[#6b7280] mt-1.5 max-w-[360px]">
        This section is on the roadmap and hasn't been built yet — bata do agar isko banana hai.
      </p>
    </div>
  )
}

export default AdminComingSoon