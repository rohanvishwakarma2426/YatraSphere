import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

// Wraps a route that should only be reached after the person has either
// logged in or explicitly chosen "Skip for now". Until then, visiting "/"
// bounces straight to /login.
function RequireAuth({ children }) {

  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default RequireAuth