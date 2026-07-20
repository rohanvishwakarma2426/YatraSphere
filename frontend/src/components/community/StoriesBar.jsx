import { useRef, useState } from "react"
import { FaPlus, FaSpinner } from "react-icons/fa"

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop"

// stories: [{ id, avatar, author, image }]  — mapped by the parent page.
// onAddStory(file): called with the picked File when the user chooses one
// via "Your Story". Parent handles the upload + POST /stories + refetch.
function StoriesBar({ stories, onAddStory, uploading }) {

  const fileInputRef = useRef(null)
  const [previewStory, setPreviewStory] = useState(null)

  const handlePick = () => fileInputRef.current?.click()

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file && onAddStory) onAddStory(file)
    e.target.value = ""
  }

  return (

    <div className="bg-white rounded-2xl border border-[#ececec] shadow-sm p-4">

      <div className="flex items-center gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">

        {/* YOUR STORY */}

        <div className="shrink-0 flex flex-col items-center gap-1.5">

          <button
            onClick={handlePick}
            disabled={uploading}
            className="w-[58px] h-[58px] rounded-full bg-[#eef4ff] border-2 border-dashed border-[#2563eb] flex items-center justify-center disabled:opacity-60"
          >
            {uploading ? (
              <FaSpinner className="text-[#2563eb] text-[16px] animate-spin" />
            ) : (
              <FaPlus className="text-[#2563eb] text-[16px]" />
            )}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <span className="text-[11px] text-[#374151] font-medium">
            Your Story
          </span>

        </div>

        {stories.map((story) => (

          <button
            key={story.id}
            onClick={() => setPreviewStory(story)}
            className="shrink-0 flex flex-col items-center gap-1.5 cursor-pointer"
          >

            <div className="w-[58px] h-[58px] rounded-full p-[2px] bg-gradient-to-tr from-[#2563eb] to-[#7c3aed]">
              <img
                src={story.avatar || DEFAULT_AVATAR}
                alt={story.author}
                className="w-full h-full rounded-full object-cover border-2 border-white"
              />
            </div>

            <span className="text-[11px] text-[#374151] font-medium max-w-[64px] truncate">
              {story.author}
            </span>

          </button>

        ))}

        {stories.length === 0 && (
          <p className="text-[12.5px] text-[#9ca3af] py-4">
            No active stories right now — stories disappear after 24 hours.
          </p>
        )}

      </div>

      {/* FULLSCREEN PREVIEW */}

      {previewStory && (

        <div
          onClick={() => setPreviewStory(null)}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
        >
          <div className="max-w-[420px] w-full">
            <p className="text-white text-[13px] font-medium mb-2">{previewStory.author}</p>
            <img
              src={previewStory.image}
              alt={previewStory.author}
              className="w-full max-h-[75vh] object-contain rounded-xl"
            />
          </div>
        </div>

      )}

    </div>

  )
}

export default StoriesBar
