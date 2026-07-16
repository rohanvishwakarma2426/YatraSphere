import { createContext } from "react"

// Raw context object only — kept in its own file (no component exports here)
// so react-refresh/Fast Refresh doesn't complain. See AuthProvider.jsx and
// hooks/useAuth.js for the actual usage.
const AuthContext = createContext(null)

export default AuthContext