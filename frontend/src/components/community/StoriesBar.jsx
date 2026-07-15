import { FaPlus } from "react-icons/fa"

function StoriesBar({ stories }) {

  return (

    <div className="bg-white rounded-2xl border border-[#ececec] shadow-sm p-4">

      <div className="flex items-center gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">

        {/* YOUR STORY */}

        <div className="shrink-0 flex flex-col items-center gap-1.5 cursor-pointer">

          <div className="w-[58px] h-[58px] rounded-full bg-[#eef4ff] border-2 border-dashed border-[#2563eb] flex items-center justify-center">
            <FaPlus className="text-[#2563eb] text-[16px]" />
          </div>

          <span className="text-[11px] text-[#374151] font-medium">
            Your Story
          </span>

        </div>

        {stories.map((story) => (

          <div key={story.id} className="shrink-0 flex flex-col items-center gap-1.5 cursor-pointer">

            <div className="w-[58px] h-[58px] rounded-full p-[2px] bg-gradient-to-tr from-[#2563eb] to-[#7c3aed]">
              <img
                src={story.avatar}
                alt={story.author}
                className="w-full h-full rounded-full object-cover border-2 border-white"
              />
            </div>

            <span className="text-[11px] text-[#374151] font-medium max-w-[64px] truncate">
              {story.author}
            </span>

          </div>

        ))}

        {stories.length === 0 && (
          <p className="text-[12.5px] text-[#9ca3af] py-4">
            No stories yet from locations you follow.
          </p>
        )}

      </div>

    </div>

  )
}

export default StoriesBar
