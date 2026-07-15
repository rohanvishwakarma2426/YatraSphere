import { FaFire } from "react-icons/fa"

const trendingTopics = [
  { title: "Best Budget Trips in India", posts: "124 posts" },
  { title: "Kedarkantha Trek in Winter", posts: "98 posts" },
  { title: "Solo Travel Safety Tips", posts: "87 posts" },
  { title: "Best Cafes in Kasol", posts: "63 posts" },
]

const people = [
  { name: "Neha Singh", tag: "Traveler · Photographer" },
  { name: "Vikram Malhotra", tag: "Adventure Enthusiast" },
  { name: "Pooja Iyer", tag: "Travel Blogger" },
]

function CommunitySidebar({ allLocations, followedLocations, onToggleFollow }) {

  return (

    <div className="w-full xl:w-[300px] xl:shrink-0 flex flex-col gap-4">

      {/* TRENDING */}

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#ececec]">

        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[14px] font-bold text-[#111827] flex items-center gap-1.5">
            <FaFire className="text-[#f97316] text-[13px]" />
            Trending Topics
          </h2>
          <span className="text-[#2563eb] text-[12px] font-semibold cursor-pointer">
            View All
          </span>
        </div>

        <div className="space-y-3">

          {trendingTopics.map((topic) => (
            <div key={topic.title} className="cursor-pointer">
              <h3 className="text-[12.5px] font-medium text-[#111827] hover:text-[#2563eb] transition leading-4.5">
                {topic.title}
              </h3>
              <p className="text-[11px] text-[#9ca3af] mt-0.5">
                {topic.posts}
              </p>
            </div>
          ))}

        </div>

      </div>

      {/* LOCATIONS TO FOLLOW */}

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#ececec]">

        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[14px] font-bold text-[#111827]">
            Locations
          </h2>
          <span className="text-[11px] text-[#9ca3af]">
            {followedLocations.length} followed
          </span>
        </div>

        <div className="space-y-3">

          {allLocations.map((loc) => {

            const isFollowing = followedLocations.includes(loc)

            return (

              <div key={loc} className="flex items-center justify-between gap-2">

                <span className="text-[12.5px] text-[#111827] truncate">
                  {loc}
                </span>

                <button
                  onClick={() => onToggleFollow(loc)}
                  className={`shrink-0 text-[11px] font-semibold px-3 h-[26px] rounded-lg transition ${
                    isFollowing
                      ? "bg-[#f3f4f6] text-[#4b5563] hover:bg-[#e5e7eb]"
                      : "bg-[#2563eb] text-white hover:bg-[#1d4ed8]"
                  }`}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>

              </div>

            )

          })}

        </div>

      </div>

      {/* PEOPLE */}

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#ececec]">

        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[14px] font-bold text-[#111827]">
            People You May Know
          </h2>
          <span className="text-[#2563eb] text-[12px] font-semibold cursor-pointer">
            View All
          </span>
        </div>

        <div className="space-y-3">

          {people.map((person) => (

            <div key={person.name} className="flex items-center justify-between gap-2">

              <div className="flex items-center gap-2.5 min-w-0">

                <div className="w-[32px] h-[32px] rounded-full bg-[#eef4ff] flex items-center justify-center text-[#2563eb] text-[12px] font-bold shrink-0">
                  {person.name.charAt(0)}
                </div>

                <div className="min-w-0">
                  <h3 className="text-[12px] font-semibold text-[#111827] truncate">
                    {person.name}
                  </h3>
                  <p className="text-[10.5px] text-[#9ca3af] truncate">
                    {person.tag}
                  </p>
                </div>

              </div>

              <button className="shrink-0 text-[11px] font-semibold px-3 h-[26px] rounded-lg border border-[#ececec] text-[#2563eb] hover:bg-[#eef4ff] transition">
                Follow
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>

  )
}

export default CommunitySidebar
