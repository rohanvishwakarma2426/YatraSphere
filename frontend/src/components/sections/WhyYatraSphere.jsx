import {
  FaUserFriends,
  FaShieldAlt,
  FaSuitcase,
  FaHeadset,
} from "react-icons/fa"

const features = [
  {
    icon: FaUserFriends,
    title: "Real Experiences",
    desc: "By Real Travelers",
  },
  {
    icon: FaShieldAlt,
    title: "Scam Free Travel",
    desc: "Safety First Always",
  },
  {
    icon: FaSuitcase,
    title: "Budget Friendly",
    desc: "Plan Smart Save More",
  },
  {
    icon: FaHeadset,
    title: "24/7 Community",
    desc: "We're Here to Help",
  },
]

function WhyYatraSphere() {

  return (

    <div className="bg-[#eef4ff] rounded-3xl p-8">

      <h2 className="text-[22px] font-bold text-[#111827] mb-6">
        Why Travelers Love YatraSphere?
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {features.map(({ icon: Icon, title, desc }) => (

          <div key={title} className="flex items-center gap-3">

            <div className="w-[42px] h-[42px] shrink-0 rounded-xl bg-white flex items-center justify-center shadow-sm">
              <Icon className="text-[18px] text-[#2563eb]" />
            </div>

            <div className="min-w-0">
              <h3 className="text-[14px] font-semibold text-[#111827] truncate">
                {title}
              </h3>
              <p className="text-[12px] text-[#6b7280] truncate">
                {desc}
              </p>
            </div>

          </div>

        ))}

      </div>

    </div>

  )
}

export default WhyYatraSphere
