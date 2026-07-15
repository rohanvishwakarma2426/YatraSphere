import { FaCheckCircle, FaHandsHelping, FaExclamationCircle, FaLightbulb } from "react-icons/fa"

const GUIDELINES = [
  { icon: FaCheckCircle, title: "Be Honest", desc: "Share genuine and truthful information.", bg: "bg-[#e9f9ef]", color: "text-[#16a34a]" },
  { icon: FaHandsHelping, title: "Be Respectful", desc: "Respect people, cultures and local communities.", bg: "bg-[#fdeaea]", color: "text-[#dc2626]" },
  { icon: FaLightbulb, title: "Be Helpful", desc: "Your experience can guide someone's journey.", bg: "bg-[#eaf1ff]", color: "text-[#2563eb]" },
  { icon: FaExclamationCircle, title: "No Promotions", desc: "Don't post ads or promotional content.", bg: "bg-[#fdeaea]", color: "text-[#dc2626]" },
]

const RECENT_EXPERIENCES = [
  { title: "Scam alert: Fake hotel in Kasol", tag: "Scam / Fraud", tagColor: "bg-[#fdeaea] text-[#dc2626]", time: "2h ago", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=200&auto=format&fit=crop" },
  { title: "Beautiful sunrise at Radhanagar Beach", tag: "Thoughts", tagColor: "bg-[#e9f9ef] text-[#16a34a]", time: "5h ago", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=200&auto=format&fit=crop" },
  { title: "Important tips for train travel in India", tag: "Tips", tagColor: "bg-[#f2edfd] text-[#7c3aed]", time: "1d ago", image: "https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?q=80&w=200&auto=format&fit=crop" },
  { title: "Stay safe while trekking in Himalayas", tag: "Awareness", tagColor: "bg-[#eaf1ff] text-[#2563eb]", time: "1d ago", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=200&auto=format&fit=crop" },
]

function ShareExperienceRightSidebar() {

  return (

    <div className="w-full xl:w-[300px] xl:shrink-0 flex flex-col gap-4">

      {/* BEFORE YOU POST */}

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#ececec]">

        <h2 className="text-[14px] font-bold text-[#111827] mb-3.5">Before You Post</h2>

        <div className="space-y-3.5">
          {GUIDELINES.map(({ icon: Icon, title, desc, bg, color }) => (
            <div key={title} className="flex items-start gap-2.5">
              <div className={`w-[30px] h-[30px] rounded-lg shrink-0 flex items-center justify-center ${bg}`}>
                <Icon className={`text-[12px] ${color}`} />
              </div>
              <div>
                <h3 className="text-[12px] font-semibold text-[#111827]">{title}</h3>
                <p className="text-[10.5px] text-[#6b7280] mt-0.5 leading-4">{desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* RECENT EXPERIENCES */}

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#ececec]">

        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[14px] font-bold text-[#111827]">Recent Experiences</h2>
          <span className="text-[#2563eb] text-[12px] font-semibold cursor-pointer">View All</span>
        </div>

        <div className="space-y-3">
          {RECENT_EXPERIENCES.map((exp) => (
            <div key={exp.title} className="flex items-start gap-2.5">
              <img src={exp.image} alt={exp.title} className="w-[52px] h-[52px] rounded-lg object-cover shrink-0" />
              <div className="min-w-0">
                <h3 className="text-[12px] font-semibold text-[#111827] leading-4">{exp.title}</h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${exp.tagColor}`}>{exp.tag}</span>
                  <span className="text-[10px] text-[#9ca3af]">{exp.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* COMMUNITY GUIDELINES */}

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#ececec]">

        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[14px] font-bold text-[#111827]">Community Guidelines</h2>
          <span className="text-[#2563eb] text-[12px] font-semibold cursor-pointer">View All</span>
        </div>

        <p className="text-[11.5px] text-[#6b7280] leading-4.5 mb-3">
          Please read our community guidelines before posting.
        </p>

        <button className="w-full h-[42px] bg-[#eef4ff] hover:bg-[#dbe7ff] transition text-[#2563eb] rounded-xl text-[12.5px] font-semibold">
          Read Guidelines
        </button>

      </div>

    </div>

  )
}

export default ShareExperienceRightSidebar