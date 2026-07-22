import AppRoutes from "./routes/AppRoutes"
import SidebarProvider from "./context/SidebarProvider"
import AuthProvider from "./context/AuthProvider"
import AdminAuthProvider from "./context/AdminAuthProvider"

function App() {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <SidebarProvider>
          <AppRoutes />
        </SidebarProvider>
      </AdminAuthProvider>
    </AuthProvider>
  )
}

export default App