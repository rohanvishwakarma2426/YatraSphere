import { useState } from "react"
import AuthContext from "./AuthContext"

function readStoredUser() {
  try {
    const raw = localStorage.getItem("user")
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

// Holds the logged-in user (or guest state) and keeps it in sync with
// localStorage, so a page refresh doesn't lose the session. Navbar reads
// this to show the right profile menu, and the /  route gate reads it to
// decide whether to redirect to /login.
function AuthProvider({ children }) {

  const [user, setUser] = useState(readStoredUser)
  const [isGuest, setIsGuest] = useState(() => localStorage.getItem("guestMode") === "true")

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData))
    localStorage.removeItem("guestMode")
    setUser(userData)
    setIsGuest(false)
  }

  const loginAsGuest = () => {
    localStorage.setItem("guestMode", "true")
    setIsGuest(true)
  }

  const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("guestMode")
    setUser(null)
    setIsGuest(false)
  }

  // Called after PUT /users/{id} succeeds — merges the updated fields into
  // the stored session so Navbar/Profile reflect the change immediately,
  // without needing a re-login.
  const updateUser = (updatedFields) => {
    setUser((prev) => {
      const merged = { ...prev, ...updatedFields }
      localStorage.setItem("user", JSON.stringify(merged))
      return merged
    })
  }

  const isAuthenticated = Boolean(user) || isGuest

  return (
    <AuthContext.Provider value={{ user, isGuest, isAuthenticated, login, loginAsGuest, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider