import { useState } from "react"
import { useNavigate, Navigate } from "react-router-dom"
import axios from "axios"
import { FaEnvelope, FaLock } from "react-icons/fa"
import { useAdminAuth } from "../../hooks/useAdminAuth"

function AdminLogin() {

  const { isAdminAuthenticated, login } = useAdminAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  if (isAdminAuthenticated) return <Navigate to="/admin/dashboard" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await axios.post("http://127.0.0.1:8000/admin/login", { email, password })
      login(res.data.admin)
      navigate("/admin/dashboard")
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (

    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">

      <div className="w-full max-w-[380px] bg-white rounded-2xl p-7 shadow-xl">

        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-[38px] h-[38px] rounded-lg bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center font-bold text-white text-[16px]">
            Y
          </div>
          <div>
            <h1 className="text-[16px] font-bold text-[#111827] leading-tight">YatraSphere</h1>
            <p className="text-[11px] text-[#9ca3af] leading-tight">Admin Panel</p>
          </div>
        </div>

        <h2 className="text-[18px] font-bold text-[#111827]">Admin Login</h2>
        <p className="text-[12.5px] text-[#6b7280] mt-1 mb-5">Sign in with your admin account to continue.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          <div className="relative">
            <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[12px] text-[#9ca3af]" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full h-[42px] border border-[#ececec] rounded-xl pl-9 pr-3 outline-none text-[13px] focus:border-[#2563eb]"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[12px] text-[#9ca3af]" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full h-[42px] border border-[#ececec] rounded-xl pl-9 pr-3 outline-none text-[13px] focus:border-[#2563eb]"
            />
          </div>

          {error && (
            <p className="text-[12px] text-[#dc2626] bg-[#fdeaea] rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="h-[42px] mt-1 bg-[#2563eb] text-white rounded-xl font-semibold text-[13.5px] hover:bg-[#1d4ed8] transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>

      </div>

    </div>

  )
}

export default AdminLogin