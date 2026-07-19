import { FaExclamationTriangle, FaHeart, FaRegComment, FaShare } from "react-icons/fa"

const scamAlerts = [
  { title: "Manali Taxi Overcharging", desc: "Be aware of fixed price scams...", time: "New", isNew: true },
  { title: "Goa Fake Rental Scam", desc: "Don't pay full amount in advance...", time: "1d ago" },
  { title: "Jaipur Guide Scam", desc: "Official guides only at...", time: "2d ago" },
]

function RightSidebar() {

  return (

    <div className="w-full xl:w-[300px] xl:shrink-0 flex flex-col gap-4">

      {/* TRENDING TOPICS — real, from live posts */}

      <TrendingTopics />

      {/* SCAM ALERTS */}


      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#ececec]">

        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[14px] font-bold text-[#111827]">
            Scam Alerts
          </h2>
          <span className="text-[#2563eb] text-[12px] font-semibold cursor-pointer">
            View All
          </span>
        </div>

        <div className="space-y-3">

          {scamAlerts.map((alert) => (

            <div key={alert.title} className="flex items-start gap-2.5">

              <div className="w-[28px] h-[28px] shrink-0 rounded-lg bg-[#fdeaea] flex items-center justify-center">
                <FaExclamationTriangle className="text-[#dc2626] text-[11px]" />
              </div>

              <div className="min-w-0 flex-1">

                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-[12px] font-semibold text-[#111827] truncate">
                    {alert.title}
                  </h3>
                  {alert.isNew ? (
                    <span className="shrink-0 bg-[#fdeaea] text-[#dc2626] text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                      New
                    </span>
                  ) : (
                    <span className="shrink-0 text-[10px] text-[#9ca3af]">
                      {alert.time}
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-[#6b7280] mt-0.5 truncate">
                  {alert.desc}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* COMMUNITY */}

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#ececec]">

        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[14px] font-bold text-[#111827]">
            From the Community
          </h2>
          <span className="text-[#2563eb] text-[12px] font-semibold cursor-pointer">
            View All
          </span>
        </div>

        <div className="flex items-center gap-2.5">

          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop"
            alt="Rohit Backpacker"
            className="w-[32px] h-[32px] rounded-full object-cover"
          />

          <div>
            <h3 className="text-[12px] font-semibold text-[#111827]">
              Rohit Backpacker
            </h3>
            <p className="text-[10px] text-[#9ca3af]">
              Manali Trip · 2h ago
            </p>
          </div>

        </div>

        <p className="mt-2.5 text-[12px] text-[#374151] leading-4.5">
          Just completed the Manali trip in ₹3500. Here's my 3 day complete budget breakdown...
        </p>

        <div className="mt-2.5 grid grid-cols-3 gap-1.5">

          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=200&auto=format&fit=crop"
            alt="trip photo"
            className="w-full h-[52px] object-cover rounded-lg"
          />

          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=200&auto=format&fit=crop"
            alt="trip photo"
            className="w-full h-[52px] object-cover rounded-lg"
          />

          <div className="relative w-full h-[52px] rounded-lg overflow-hidden">

            <img
              src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=200&auto=format&fit=crop"
              alt="trip photo"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-[10px] font-semibold cursor-pointer">
              Read More
            </div>

          </div>

        </div>

        <div className="mt-3 flex items-center gap-4 text-[#6b7280] text-[12px]">

          <span className="flex items-center gap-1 cursor-pointer hover:text-[#dc2626]">
            <FaHeart className="text-[12px]" /> 128
          </span>

          <span className="flex items-center gap-1 cursor-pointer hover:text-[#2563eb]">
            <FaRegComment className="text-[12px]" /> 32
          </span>

          <span className="flex items-center gap-1 cursor-pointer hover:text-[#2563eb]">
            <FaShare className="text-[12px]" /> 15
          </span>

        </div>

      </div>

    </div>

  )
}

export default RightSidebar