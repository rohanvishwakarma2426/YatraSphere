import { useState } from "react"
import { FaImage, FaMapMarkerAlt } from "react-icons/fa"

function CreatePostBox({ allLocations, onCreatePost }) {

  const [text, setText] = useState("")
  const [location, setLocation] = useState("")
  const [error, setError] = useState("")

  const handlePost = () => {

    if (!location) {
      setError("Please select a location before posting.")
      return
    }

    if (!text.trim()) {
      setError("Write something to share with travelers.")
      return
    }

    onCreatePost({ text, location })

    setText("")
    setLocation("")
    setError("")

  }

  return (

    <div className="bg-white rounded-2xl border border-[#ececec] shadow-sm p-5">

      <div className="flex items-start gap-3">

        <img
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop"
          alt="you"
          className="w-[42px] h-[42px] rounded-full object-cover shrink-0"
        />

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind? Share your travel story..."
          rows={2}
          className="flex-1 resize-none outline-none text-[13.5px] text-[#111827] placeholder:text-[#9ca3af] pt-2"
        />

      </div>

      {/* LOCATION SELECT - REQUIRED */}

      <div className="mt-3 flex items-center gap-2">

        <FaMapMarkerAlt className={`text-[13px] ${location ? "text-[#2563eb]" : "text-[#dc2626]"}`} />

        <select
          value={location}
          onChange={(e) => {
            setLocation(e.target.value)
            setError("")
          }}
          className={`h-[36px] flex-1 sm:flex-none sm:w-[220px] border rounded-lg px-3 outline-none text-[12.5px] ${
            location ? "border-[#ececec] text-[#111827]" : "border-[#f3a9a9] text-[#9ca3af]"
          }`}
        >
          <option value="">Select location (required)</option>
          {allLocations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>

        {!location && (
          <span className="text-[11px] text-[#dc2626]">
            Location required to post
          </span>
        )}

      </div>

      {error && (
        <p className="mt-2 text-[11.5px] text-[#dc2626]">
          {error}
        </p>
      )}

      {/* ACTIONS */}

      <div className="mt-4 pt-3 border-t border-[#f0f1f3] flex items-center justify-between">

        <button className="flex items-center gap-2 text-[#4b5563] text-[12.5px] font-medium cursor-pointer hover:text-[#2563eb] transition">
          <FaImage className="text-[14px] text-[#16a34a]" />
          Photo
        </button>

        <button
          onClick={handlePost}
          className="bg-[#2563eb] hover:bg-[#1d4ed8] transition text-white text-[13px] font-semibold px-5 h-[36px] rounded-xl"
        >
          Post
        </button>

      </div>

    </div>

  )
}

export default CreatePostBox
