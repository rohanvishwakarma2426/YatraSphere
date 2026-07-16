import AppRoutes from "./routes/AppRoutes"
import SidebarProvider from "./context/SidebarProvider"
import AuthProvider from "./context/AuthProvider"

function App() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <AppRoutes />
      </SidebarProvider>
    </AuthProvider>
  )
}

export default App