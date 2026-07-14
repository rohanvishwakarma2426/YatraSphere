import { FaCalculator, FaExclamationTriangle, FaHeart, FaRegComment, FaShare } from "react-icons/fa"

const scamAlerts = [
  { title: "Manali Taxi Overcharging", desc: "Be aware of fixed price scams...", time: "New", isNew: true },
  { title: "Goa Fake Rental Scam", desc: "Don't pay full amount in advance...", time: "1d ago" },
  { title: "Jaipur Guide Scam", desc: "Official guides only at...", time: "2d ago" },
]

function RightSidebar() {

  return (

    <div className="w-full xl:w-[340px] xl:shrink-0 flex flex-col gap-5">

      {/* BUDGET CALCULATOR */}

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#ececec]">

        <div className="flex items-center gap-3">

          <div className="w-[38px] h-[38px] rounded-xl bg-[#eaf1ff] flex items-center justify-center shrink-0">
            <FaCalculator className="text-[#2563eb] text-[16px]" />
          </div>

          <div>
            <h2 className="text-[17px] font-bold text-[#111827]">
              Budget Calculator
            </h2>
            <p className="text-[12px] text-[#6b7280]">
              Plan your trip smartly with real estimated budget.
            </p>
          </div>

        </div>

        {/* FORM */}

        <div className="mt-6 space-y-4">

          <select className="w-full h-[50px] border border-[#ececec] rounded-2xl px-4 outline-none text-[14px]">
            <option>Manali, Himachal Pradesh</option>
          </select>

          <select className="w-full h-[50px] border border-[#ececec] rounded-2xl px-4 outline-none text-[14px]">
            <option>3 Days</option>
          </select>

          <select className="w-full h-[50px] border border-[#ececec] rounded-2xl px-4 outline-none text-[14px]">
            <option>Budget Travel</option>
          </select>

          <button className="w-full h-[52px] bg-[#2563eb] text-white rounded-2xl text-[15px] font-semibold hover:bg-[#1d4ed8] transition">
            Calculate My Budget
          </button>

        </div>

        {/* RESULT */}

        <div className="mt-5 bg-[#f5fbf7] rounded-2xl p-5 border border-[#d8f5df]">

          <p className="text-[#6b7280] text-[13px]">
            Estimated Budget
          </p>

          <h1 className="text-[#16a34a] text-[28px] font-bold mt-1">
            ₹4,250 - ₹5,700
          </h1>

          <p className="text-[#16a34a] mt-1 text-[13px] font-medium">
            (Per Person)
          </p>

        </div>

      </div>

      {/* SCAM ALERTS */}

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#ececec]">

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[16px] font-bold text-[#111827]">
            Scam Alerts
          </h2>
          <span className="text-[#2563eb] text-[13px] font-semibold cursor-pointer">
            View All
          </span>
        </div>

        <div className="space-y-4">

          {scamAlerts.map((alert) => (

            <div key={alert.title} className="flex items-start gap-3">

              <div className="w-[34px] h-[34px] shrink-0 rounded-xl bg-[#fdeaea] flex items-center justify-center">
                <FaExclamationTriangle className="text-[#dc2626] text-[13px]" />
              </div>

              <div className="min-w-0 flex-1">

                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-[13px] font-semibold text-[#111827] truncate">
                    {alert.title}
                  </h3>
                  {alert.isNew ? (
                    <span className="shrink-0 bg-[#fdeaea] text-[#dc2626] text-[10px] font-bold px-2 py-0.5 rounded-full">
                      New
                    </span>
                  ) : (
                    <span className="shrink-0 text-[11px] text-[#9ca3af]">
                      {alert.time}
                    </span>
                  )}
                </div>

                <p className="text-[12px] text-[#6b7280] mt-0.5 truncate">
                  {alert.desc}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* COMMUNITY */}

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#ececec]">

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[16px] font-bold text-[#111827]">
            From the Community
          </h2>
          <span className="text-[#2563eb] text-[13px] font-semibold cursor-pointer">
            View All
          </span>
        </div>

        <div className="flex items-center gap-3">

          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop"
            alt="Rohit Backpacker"
            className="w-[38px] h-[38px] rounded-full object-cover"
          />

          <div>
            <h3 className="text-[13px] font-semibold text-[#111827]">
              Rohit Backpacker
            </h3>
            <p className="text-[11px] text-[#9ca3af]">
              Manali Trip · 2h ago
            </p>
          </div>

        </div>

        <p className="mt-3 text-[13px] text-[#374151] leading-5">
          Just completed the Manali trip in ₹3500. Here's my 3 day complete budget breakdown...
        </p>

        <div className="mt-3 grid grid-cols-3 gap-2">

          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=200&auto=format&fit=crop"
            alt="trip photo"
            className="w-full h-[64px] object-cover rounded-xl"
          />

          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=200&auto=format&fit=crop"
            alt="trip photo"
            className="w-full h-[64px] object-cover rounded-xl"
          />

          <div className="relative w-full h-[64px] rounded-xl overflow-hidden">

            <img
              src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=200&auto=format&fit=crop"
              alt="trip photo"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-[12px] font-semibold cursor-pointer">
              Read More
            </div>

          </div>

        </div>

        <div className="mt-4 flex items-center gap-5 text-[#6b7280] text-[13px]">

          <span className="flex items-center gap-1.5 cursor-pointer hover:text-[#dc2626]">
            <FaHeart className="text-[13px]" /> 128
          </span>

          <span className="flex items-center gap-1.5 cursor-pointer hover:text-[#2563eb]">
            <FaRegComment className="text-[13px]" /> 32
          </span>

          <span className="flex items-center gap-1.5 cursor-pointer hover:text-[#2563eb]">
            <FaShare className="text-[13px]" /> 15
          </span>

        </div>

      </div>

    </div>

  )
}

export default RightSidebar
