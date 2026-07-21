import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaCamera, FaSpinner, FaTimes } from "react-icons/fa"

import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import PostCard from "../../components/community/PostCard"
import { useAuth } from "../../hooks/useAuth"
import { uploadImage, updateProfile, getUserPosts, updatePost, deletePost } from "../../services/userService"
import { POST_CATEGORIES } from "../../utils/postCategories"

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop"

function timeAgo(dateString) {
  const diffMs = Date.now() - new Date(dateString).getTime()
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return "Just now"
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

function mapPost(p) {
  return {
    id: p.id,
    author: p.author?.name || "Traveler",
    authorId: p.author?.id ?? null,
    avatar: DEFAULT_AVATAR,
    location: p.location || "Unknown",
    createdAt: p.created_at,
    timeAgo: timeAgo(p.created_at),
    title: p.title,
    text: p.content,
    image: p.image_url || null,
    tags: [p.category],
    likes: p.likes_count,
    comments: 0,
    shares: 0,
    _raw: p,
  }
}

function Profile() {

  const { user, updateUser } = useAuth()
  const navigate = useNavigate()

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState("")

  const [editingProfile, setEditingProfile] = useState(false)
  const [name, setName] = useState(user?.name || "")
  const [bio, setBio] = useState(user?.bio || "")
  const [avatarUploading, setAvatarUploading] = useState(false)
  const [savingProfile, setSavingProfile] = useState(false)

  const [editingPost, setEditingPost] = useState(null)

  const refreshPosts = () => {
    setLoading(true)
    getUserPosts(user.id)
      .then((data) => { setPosts(data.map(mapPost)); setLoadError("") })
      .catch((err) => {
        console.error("Failed to load your posts:", err)
        setLoadError("Couldn't load your posts. Is the backend running?")
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (!user) {
      navigate("/login")
      return
    }
    refreshPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  if (!user) return null

  const handleAvatarPick = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ""
    if (!file) return

    setAvatarUploading(true)
    try {
      const imageUrl = await uploadImage(file)
      const updated = await updateProfile(user.id, { avatar_url: imageUrl })
      updateUser(updated)
    } catch (err) {
      console.error("Failed to update avatar:", err)
      alert("Failed to update avatar. Please try again.")
    } finally {
      setAvatarUploading(false)
    }
  }

  const handleSaveProfile = async () => {
    if (!name.trim()) {
      alert("Name can't be empty.")
      return
    }

    setSavingProfile(true)
    try {
      const updated = await updateProfile(user.id, { name: name.trim(), bio: bio.trim() })
      updateUser(updated)
      setEditingProfile(false)
    } catch (err) {
      console.error("Failed to save profile:", err)
      alert("Failed to save profile. Please try again.")
    } finally {
      setSavingProfile(false)
    }
  }

  const handleDeletePost = async (post) => {
    if (!confirm(`Delete "${post.title || "this post"}"? This can't be undone.`)) return

    try {
      await deletePost(post.id)
      setPosts((prev) => prev.filter((p) => p.id !== post.id))
    } catch (err) {
      console.error("Failed to delete post:", err)
      alert("Failed to delete post. Please try again.")
    }
  }

  const handleEditPost = (post) => setEditingPost(post._raw)

  const handleSavePostEdit = async (fields) => {
    try {
      await updatePost(editingPost.id, fields)
      setEditingPost(null)
      refreshPosts()
    } catch (err) {
      console.error("Failed to update post:", err)
      alert("Failed to update post. Please try again.")
    }
  }

  return (

    <div>

      <Navbar />

      <div className="flex">

        <Sidebar />

        <div className="flex-1 min-w-0 p-4 flex flex-col gap-4 max-w-[720px] mx-auto">

          {/* PROFILE HEADER */}

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-[#ececec] dark:border-gray-800 shadow-sm p-6">

            <div className="flex items-start gap-4">

              <div className="relative shrink-0">

                <img
                  src={user.avatar_url || DEFAULT_AVATAR}
                  alt={user.name}
                  className="w-[84px] h-[84px] rounded-full object-cover border border-[#ececec] dark:border-gray-800"
                />

                <label className="absolute -bottom-1 -right-1 w-[28px] h-[28px] bg-[#2563eb] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#1d4ed8] transition">
                  {avatarUploading ? (
                    <FaSpinner className="text-white text-[11px] animate-spin" />
                  ) : (
                    <FaCamera className="text-white text-[11px]" />
                  )}
                  <input type="file" accept="image/*" onChange={handleAvatarPick} className="hidden" disabled={avatarUploading} />
                </label>

              </div>

              <div className="flex-1 min-w-0">

                {!editingProfile ? (

                  <>
                    <h1 className="text-[18px] font-bold text-[#111827] dark:text-gray-100">{user.name}</h1>
                    <p className="text-[12.5px] text-[#9ca3af] dark:text-gray-500 mt-0.5">{user.email}</p>
                    <p className="text-[13px] text-[#374151] dark:text-gray-300 mt-2">
                      {user.bio || <span className="text-[#9ca3af] dark:text-gray-500 italic">No bio yet.</span>}
                    </p>
                    <button
                      onClick={() => { setName(user.name); setBio(user.bio || ""); setEditingProfile(true) }}
                      className="mt-3 h-[32px] px-4 rounded-lg border border-[#ececec] dark:border-gray-700 text-[12.5px] font-semibold text-[#374151] dark:text-gray-300 hover:bg-[#f5f7fb] dark:hover:bg-gray-800 transition"
                    >
                      Edit Profile
                    </button>
                  </>

                ) : (

                  <div className="flex flex-col gap-2.5">

                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="h-[36px] bg-white dark:bg-gray-800 text-[#111827] dark:text-gray-100 border border-[#ececec] dark:border-gray-700 rounded-lg px-3 text-[13px] outline-none focus:border-[#2563eb]"
                    />

                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="A short bio..."
                      rows={2}
                      maxLength={300}
                      className="bg-white dark:bg-gray-800 text-[#111827] dark:text-gray-100 border border-[#ececec] dark:border-gray-700 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#2563eb] resize-none"
                    />

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleSaveProfile}
                        disabled={savingProfile}
                        className="h-[32px] px-4 rounded-lg bg-[#2563eb] text-white text-[12.5px] font-semibold hover:bg-[#1d4ed8] transition disabled:opacity-60"
                      >
                        {savingProfile ? "Saving..." : "Save"}
                      </button>
                      <button
                        onClick={() => setEditingProfile(false)}
                        className="h-[32px] px-4 rounded-lg border border-[#ececec] dark:border-gray-700 text-[12.5px] font-semibold text-[#374151] dark:text-gray-300 hover:bg-[#f5f7fb] dark:hover:bg-gray-800 transition"
                      >
                        Cancel
                      </button>
                    </div>

                  </div>

                )}

              </div>

            </div>

          </div>

          {/* MY POSTS */}

          <h2 className="text-[14px] font-semibold text-[#111827] dark:text-gray-100 mt-1">My Posts</h2>

          {loading && (
            <div className="flex items-center gap-2 text-[#6b7280] dark:text-gray-400 text-[13px] py-10 justify-center">
              <FaSpinner className="animate-spin" /> Loading your posts...
            </div>
          )}

          {loadError && (
            <div className="bg-[#fdeaea] dark:bg-red-500/10 border border-[#f3a9a9] dark:border-red-500/30 rounded-xl px-4 py-2.5 text-[12.5px] text-[#dc2626] dark:text-red-400">
              {loadError}
            </div>
          )}

          {!loading && posts.length === 0 && !loadError && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-[#ececec] dark:border-gray-800 p-8 text-center text-[#6b7280] dark:text-gray-400 text-[13px]">
              You haven't posted anything yet. Head to{" "}
              <a href="/share-experience" className="text-[#2563eb] dark:text-blue-400 underline font-semibold">Share Experience</a> to create one.
            </div>
          )}

          {!loading && posts.map((post) => (
            <PostCard key={post.id} post={post} onEdit={handleEditPost} onDelete={handleDeletePost} />
          ))}

        </div>

      </div>

      {editingPost && (
        <EditPostModal
          post={editingPost}
          onClose={() => setEditingPost(null)}
          onSave={handleSavePostEdit}
        />
      )}

    </div>

  )
}

function EditPostModal({ post, onClose, onSave }) {

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)
  const [location, setLocation] = useState(post.location || "")
  const [category, setCategory] = useState(post.category)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content can't be empty.")
      return
    }
    setSaving(true)
    await onSave({ title: title.trim(), content: content.trim(), location: location.trim(), category })
    setSaving(false)
  }

  return (

    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-[480px] p-5 max-h-[85vh] overflow-y-auto">

        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[15px] font-semibold text-[#111827] dark:text-gray-100">Edit Post</h3>
          <button onClick={onClose} className="text-[#9ca3af] dark:text-gray-500 hover:text-[#111827] dark:hover:text-gray-200">
            <FaTimes />
          </button>
        </div>

        <div className="flex flex-col gap-3">

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="h-[38px] bg-white dark:bg-gray-800 text-[#111827] dark:text-gray-100 border border-[#ececec] dark:border-gray-700 rounded-lg px-3 text-[13px] outline-none focus:border-[#2563eb]"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={4}
            className="bg-white dark:bg-gray-800 text-[#111827] dark:text-gray-100 border border-[#ececec] dark:border-gray-700 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#2563eb] resize-none"
          />

          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="h-[38px] bg-white dark:bg-gray-800 text-[#111827] dark:text-gray-100 border border-[#ececec] dark:border-gray-700 rounded-lg px-3 text-[13px] outline-none focus:border-[#2563eb]"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-[38px] bg-white dark:bg-gray-800 text-[#111827] dark:text-gray-100 border border-[#ececec] dark:border-gray-700 rounded-lg px-3 text-[13px] outline-none focus:border-[#2563eb]"
          >
            {POST_CATEGORIES.map((c) => (
              <option key={c.key} value={c.key}>{c.label}</option>
            ))}
          </select>

          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={handleSave}
              disabled={saving}
              className="h-[34px] px-4 rounded-lg bg-[#2563eb] text-white text-[12.5px] font-semibold hover:bg-[#1d4ed8] transition disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={onClose}
              className="h-[34px] px-4 rounded-lg border border-[#ececec] dark:border-gray-700 text-[12.5px] font-semibold text-[#374151] dark:text-gray-300 hover:bg-[#f5f7fb] dark:hover:bg-gray-800 transition"
            >
              Cancel
            </button>
          </div>

        </div>

      </div>

    </div>

  )
}

export default Profile