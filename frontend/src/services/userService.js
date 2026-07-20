import axios from "axios"

const API_BASE = "http://127.0.0.1:8000"

// Uploads a single image file (avatar / story) and returns its public URL.
export async function uploadImage(file) {
  const formData = new FormData()
  formData.append("file", file)

  const res = await axios.post(`${API_BASE}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })

  return res.data.image_url
}

// PUT /users/{id} — updates name / bio / avatar_url. Pass only the fields
// that changed; omitted fields are left untouched on the backend.
export async function updateProfile(userId, fields) {
  const res = await axios.put(`${API_BASE}/users/${userId}`, fields)
  return res.data
}

// GET /users/{id}/posts — all posts authored by this user, newest first.
export async function getUserPosts(userId) {
  const res = await axios.get(`${API_BASE}/users/${userId}/posts`)
  return res.data
}

// PUT /posts/{id}
export async function updatePost(postId, fields) {
  const res = await axios.put(`${API_BASE}/posts/${postId}`, fields)
  return res.data
}

// DELETE /posts/{id}
export async function deletePost(postId) {
  const res = await axios.delete(`${API_BASE}/posts/${postId}`)
  return res.data
}
