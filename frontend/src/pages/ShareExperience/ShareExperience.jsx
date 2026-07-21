import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import {
  FaMapMarkerAlt, FaLightbulb, FaExclamationTriangle,
  FaCommentDots, FaStickyNote, FaEllipsisH, FaCloudUploadAlt,
  FaBold, FaItalic, FaListUl, FaQuoteRight, FaLink, FaImage,
} from "react-icons/fa"

import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import ShareExperienceRightSidebar from "../../components/shareExperience/ShareExperienceRightSidebar"
import LocationAutocomplete from "../../components/hero/LocationAutocomplete"
import { useAuth } from "../../hooks/useAuth"
import { GUIDE_CATEGORIES } from "../../utils/guideHelpers"
import { EXPERIENCE_CATEGORIES } from "../../utils/experienceHelpers"

const CATEGORIES = [
  { key: "awareness", label: "Awareness", desc: "Share helpful info & awareness", icon: FaLightbulb, bg: "bg-[#eaf1ff]", color: "text-[#2563eb]" },
  { key: "scam", label: "Scam / Fraud", desc: "Warn others about scams & frauds", icon: FaExclamationTriangle, bg: "bg-[#fff4e6]", color: "text-[#d97706]" },
  { key: "thoughts", label: "Thoughts", desc: "Share your personal thoughts", icon: FaCommentDots, bg: "bg-[#e9f9ef]", color: "text-[#16a34a]" },
  { key: "tips", label: "Tips", desc: "Useful tips for travelers", icon: FaStickyNote, bg: "bg-[#f2edfd]", color: "text-[#7c3aed]" },
  // Guide categories — posting under any of these also makes the post
  // show up in Guide Search (Blogs & Guides page).
  ...GUIDE_CATEGORIES,
  // Experience categories — posting under any of these also makes the post
  // show up in Experience Search (Hero section's "Experiences" tab).
  ...EXPERIENCE_CATEGORIES,
  { key: "other", label: "Other", desc: "Other experiences & stories", icon: FaEllipsisH, bg: "bg-[#f3f4f6]", color: "text-[#6b7280]" },
]

const TITLE_LIMIT = 100
const STORY_LIMIT = 3000

function ShareExperience() {

  const navigate = useNavigate()
  const { user } = useAuth()

  const [location, setLocation] = useState("")
  const [category, setCategory] = useState("awareness")
  const [story, setStory] = useState("")
  const [files, setFiles] = useState([])
  const [submitting, setSubmitting] = useState(false)

  const handleFileSelect = (e) => {
    // Only one image is supported for now — take the first file picked.
    const picked = Array.from(e.target.files || []).slice(0, 1)
    setFiles(picked)
  }

  const isValid = location.trim() && story.trim()

  // Auto-derive a short title from the story so the backend (which still
  // requires a title) gets something reasonable without a separate field.
  const deriveTitle = (text) => {
    const trimmed = text.trim().replace(/\s+/g, " ")
    return trimmed.length > 60 ? trimmed.slice(0, 60).trim() + "..." : trimmed
  }

  const handlePublish = async () => {

    if (!user) {
      alert("Please login to publish your experience.")
      navigate("/login")
      return
    }

    if (!isValid || submitting) return

    setSubmitting(true)

    try {

      let imageUrl = null

      if (files.length > 0) {

        const formData = new FormData()
        formData.append("file", files[0])

        const uploadRes = await axios.post("http://127.0.0.1:8000/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })

        imageUrl = uploadRes.data.image_url

      }

      await axios.post("http://127.0.0.1:8000/posts", {
        user_id: user.id,
        title: deriveTitle(story),
        content: story.trim(),
        location: location.trim(),
        category,
        image_url: imageUrl,
      })

      alert("Your experience has been published!")

      setLocation("")
      setCategory("awareness")
      setStory("")
      setFiles([])

      navigate("/community")

    } catch (error) {
      console.log(error)
      alert(error.response?.data?.detail || "Failed to publish. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (

    <div>

      <Navbar />

      <div className="flex">

        <Sidebar />

        <div className="flex-1 min-w-0 p-4 flex flex-col xl:flex-row gap-4 items-start">

          <div className="flex-1 min-w-0 w-full flex flex-col gap-4">

            {/* HEADER BANNER */}

            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#dbeafe] to-[#eef2ff] p-8">
              <h1 className="text-[24px] font-bold text-[#111827]">Share Your Travel Experience</h1>
              <p className="text-[13.5px] text-[#4b5563] mt-1.5">Your experience can help and inspire other travelers.</p>
            </div>

            {/* FORM CARD */}

            <div className="bg-white rounded-2xl border border-[#ececec] shadow-sm p-6">

              {/* STEP 1: LOCATION */}

              <div className="mb-6">
                <h2 className="text-[14px] font-bold text-[#111827]">1. Add Location</h2>
                <p className="text-[12px] text-[#6b7280] mt-0.5 mb-2.5">Where was your experience?</p>

                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-[13px] text-[#9ca3af] shrink-0" />
                  <LocationAutocomplete
                    value={location}
                    onChange={setLocation}
                    onSelect={(place) => setLocation(place.name)}
                    placeholder="Search and select a location"
                  />
                </div>
              </div>

              {/* STEP 2: CATEGORY */}

              <div className="mb-6">
                <h2 className="text-[14px] font-bold text-[#111827]">2. What type of experience do you want to share?</h2>
                <p className="text-[12px] text-[#6b7280] mt-0.5 mb-2.5">
                  Choose the category that best fits your story — this also decides where it becomes searchable (Community, Guide search, or Experience search).
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {CATEGORIES.map(({ key, label, desc, icon: Icon, bg, color }) => (
                    <button
                      key={key}
                      onClick={() => setCategory(key)}
                      className={`text-left p-3.5 rounded-xl border transition ${
                        category === key ? "border-[#2563eb] bg-[#f5f9ff]" : "border-[#ececec] hover:bg-[#f9fafb]"
                      }`}
                    >
                      <div className={`w-[30px] h-[30px] rounded-lg flex items-center justify-center ${bg}`}>
                        <Icon className={`text-[13px] ${color}`} />
                      </div>
                      <h3 className="text-[12.5px] font-semibold text-[#111827] mt-2">{label}</h3>
                      <p className="text-[10.5px] text-[#6b7280] mt-0.5 leading-4">{desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* STEP 4: STORY */}

              <div className="mb-6">
                <h2 className="text-[14px] font-bold text-[#111827]">4. Share Your Experience</h2>
                <p className="text-[12px] text-[#6b7280] mt-0.5 mb-2.5">Write your story in detail. What happened? What should other travelers know?</p>

                <div className="border border-[#ececec] rounded-xl overflow-hidden focus-within:border-[#2563eb]">
                  <textarea
                    value={story}
                    maxLength={STORY_LIMIT}
                    onChange={(e) => setStory(e.target.value)}
                    placeholder="Start writing your experience here..."
                    rows={6}
                    className="w-full p-3.5 outline-none text-[13px] resize-none"
                  />
                  <div className="flex items-center justify-between border-t border-[#ececec] px-3.5 py-2">
                    <div className="flex items-center gap-3 text-[#6b7280]">
                      <FaBold className="text-[12px] cursor-pointer hover:text-[#111827]" />
                      <FaItalic className="text-[12px] cursor-pointer hover:text-[#111827]" />
                      <FaListUl className="text-[12px] cursor-pointer hover:text-[#111827]" />
                      <FaQuoteRight className="text-[12px] cursor-pointer hover:text-[#111827]" />
                      <FaImage className="text-[12px] cursor-pointer hover:text-[#111827]" />
                      <FaLink className="text-[12px] cursor-pointer hover:text-[#111827]" />
                    </div>
                    <span className="text-[10.5px] text-[#9ca3af]">{story.length}/{STORY_LIMIT}</span>
                  </div>
                </div>
              </div>

              {/* STEP 5: PHOTOS */}

              <div>
                <h2 className="text-[14px] font-bold text-[#111827]">5. Add Photos / Videos (Optional)</h2>
                <p className="text-[12px] text-[#6b7280] mt-0.5 mb-2.5">Add photos or videos to make your story more helpful.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <label className="border-2 border-dashed border-[#d1d5db] rounded-xl flex flex-col items-center justify-center py-8 cursor-pointer hover:border-[#2563eb] transition">
                    <FaCloudUploadAlt className="text-[26px] text-[#9ca3af]" />
                    <p className="text-[12.5px] font-semibold text-[#374151] mt-2">Drag & drop files here or click to upload</p>
                    <p className="text-[10.5px] text-[#9ca3af] mt-1">Images (JPG, PNG) — 1 image per post, max 5MB</p>
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
                  </label>

                  <div className="bg-[#f9fafb] rounded-xl p-4">
                    <p className="text-[12.5px] font-semibold text-[#111827] mb-2">Tips for better posts</p>
                    {["Use real photos or videos", "Be honest and specific", "Help others make informed decisions"].map((tip) => (
                      <div key={tip} className="flex items-start gap-2 text-[11.5px] text-[#374151] mt-1.5">
                        <span className="text-[#16a34a]">✓</span>
                        {tip}
                      </div>
                    ))}
                  </div>

                </div>

                {files.length > 0 && (
                  <p className="text-[11.5px] text-[#16a34a] mt-2.5">{files[0].name} selected</p>
                )}
              </div>

            </div>

            {/* ACTIONS */}

            <div className="flex items-center justify-between">
              <button className="h-[46px] px-6 border border-[#ececec] bg-white rounded-xl text-[13px] font-semibold text-[#374151] hover:bg-[#f5f7fb] transition">
                Save as Draft
              </button>
              <button
                disabled={!isValid || submitting}
                onClick={handlePublish}
                className="h-[46px] px-6 bg-[#2563eb] hover:bg-[#1d4ed8] disabled:opacity-40 disabled:cursor-not-allowed transition text-white rounded-xl text-[13px] font-semibold"
              >
                {submitting ? "Publishing..." : "Publish Experience"}
              </button>
            </div>

          </div>

          {/* RIGHT SIDEBAR */}

          <ShareExperienceRightSidebar />

        </div>

      </div>

    </div>

  )
}

export default ShareExperience