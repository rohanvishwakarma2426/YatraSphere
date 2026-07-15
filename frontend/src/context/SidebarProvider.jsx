import { useState } from "react"
import SidebarContext from "./SidebarContext"

// Shared open/close state for the mobile drawer sidebar. Navbar's hamburger
// button and Sidebar's close button / backdrop both read from this so they
// don't need to be nested inside each other or pass props through pages.
function SidebarProvider({ children }) {

  const [isOpen, setIsOpen] = useState(false)

  const openSidebar = () => setIsOpen(true)
  const closeSidebar = () => setIsOpen(false)
  const toggleSidebar = () => setIsOpen((v) => !v)

  return (
    <SidebarContext.Provider value={{ isOpen, openSidebar, closeSidebar, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}

export default SidebarProvider