import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Community from "../pages/Community/Community";
import Trips from "../pages/Trips/Trips";
import Alerts from "../pages/Alerts/Alerts";
import Packages from "../pages/Packages/Packages";
import BudgetCalculator from "../pages/BudgetCalculator/BudgetCalculator";
import OffersDeals from "../pages/OffersDeals/OffersDeals";
import ShareExperience from "../pages/ShareExperience/ShareExperience";
import BlogsGuides from "../pages/BlogsGuides/BlogsGuides";
import Explore from "../pages/Explore/Explore";
import Experiences from "../pages/Experiences/Experiences";
import Guides from "../pages/Guides/Guides";
import Profile from "../pages/Profile/Profile";
import RequireAuth from "./RequireAuth";
import LocationDashboard from "../pages/Location/LocationDashboard";
import AdminLayout from "../layouts/AdminLayout";
import AdminLogin from "../pages/Admin/AdminLogin";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminComingSoon from "../pages/Admin/AdminComingSoon";
import RequireAdminAuth from "./RequireAdminAuth";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/community" element={<Community />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/budget-calculator" element={<BudgetCalculator />} />
        <Route path="/offers" element={<OffersDeals />} />
        <Route path="/share-experience" element={<ShareExperience />} />
        <Route path="/blogs-guides" element={<BlogsGuides />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/location/:name" element={<LocationDashboard />} />

        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />

        {/* ================= ADMIN PANEL ================= */}

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <RequireAdminAuth>
              <AdminLayout />
            </RequireAdminAuth>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminComingSoon title="Users" />} />
          <Route path="destinations" element={<AdminComingSoon title="Destinations" />} />
          <Route path="trips-packages" element={<AdminComingSoon title="Trips & Packages" />} />
          <Route path="bookings" element={<AdminComingSoon title="Bookings" />} />
          <Route path="blog-guides" element={<AdminComingSoon title="Blog & Guides" />} />
          <Route path="community-posts" element={<AdminComingSoon title="Community Posts" />} />
          <Route path="reviews-ratings" element={<AdminComingSoon title="Reviews & Ratings" />} />
          <Route path="offers-deals" element={<AdminComingSoon title="Offers & Deals" />} />
          <Route path="reports-analytics" element={<AdminComingSoon title="Reports & Analytics" />} />
          <Route path="site-settings" element={<AdminComingSoon title="Site Settings" />} />
          <Route path="notifications" element={<AdminComingSoon title="Notifications" />} />
          <Route path="support-tickets" element={<AdminComingSoon title="Support Tickets" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;