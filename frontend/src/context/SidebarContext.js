import { createContext } from "react"

// Raw context object only — kept in its own file (no component exports here)
// so react-refresh/Fast Refresh doesn't complain. See SidebarProvider.jsx
// and hooks/useSidebar.js for the actual usage.
const SidebarContext = createContext(null)

export default SidebarContext