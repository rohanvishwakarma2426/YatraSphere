import { useState, useEffect } from "react"
import { AdminAuthContext } from "./AdminAuthContext"

export default function AdminAuthProvider({ children }) {

  const [admin, setAdmin] = useState(() => {
    const stored = localStorage.getItem("admin")
    return stored ? JSON.parse(stored) : null
  })

  useEffect(() => {
    if (admin) localStorage.setItem("admin", JSON.stringify(admin))
    else localStorage.removeItem("admin")
  }, [admin])

  const login = (adminData) => setAdmin(adminData)
  const logout = () => setAdmin(null)

  return (
    <AdminAuthContext.Provider value={{ admin, isAdminAuthenticated: Boolean(admin), login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}