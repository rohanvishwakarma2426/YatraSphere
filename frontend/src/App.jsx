import AppRoutes from "./routes/AppRoutes"
import SidebarProvider from "./context/SidebarProvider"

function App() {
  return (
    <SidebarProvider>
      <AppRoutes />
    </SidebarProvider>
  )
}

export default App