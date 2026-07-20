import axios from "axios"

const API_BASE = "http://127.0.0.1:8000"

// GET /stories — only active (non-expired) stories, newest first.
export async function getActiveStories() {
  const res = await axios.get(`${API_BASE}/stories`)
  return res.data
}

// POST /stories — image_url must already be uploaded (use uploadImage
// from userService.js first).
export async function createStory(userId, imageUrl) {
  const res = await axios.post(`${API_BASE}/stories`, {
    user_id: userId,
    image_url: imageUrl,
  })
  return res.data
}

export async function deleteStory(storyId) {
  const res = await axios.delete(`${API_BASE}/stories/${storyId}`)
  return res.data
}
