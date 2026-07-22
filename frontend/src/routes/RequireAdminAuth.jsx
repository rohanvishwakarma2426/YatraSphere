import { Navigate } from "react-router-dom"
import { useAdminAuth } from "../hooks/useAdminAuth"

function RequireAdminAuth({ children }) {

  const { isAdminAuthenticated } = useAdminAuth()

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

export default RequireAdminAuth