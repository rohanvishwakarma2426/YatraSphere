import { BrowserRouter, Routes, Route } from "react-router-dom";

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
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HOME — protected, redirects to /login if not authenticated or guest */}

        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />

        {/* LOGIN */}

        <Route path="/login" element={<Login />} />

        {/* SIGNUP */}

        <Route path="/signup" element={<Signup />} />

        {/* COMMUNITY */}

        <Route path="/community" element={<Community />} />

        {/* TRIPS */}

        <Route path="/trips" element={<Trips />} />

        {/* ALERTS */}

        <Route path="/alerts" element={<Alerts />} />

        {/* PACKAGES */}

        <Route path="/packages" element={<Packages />} />

        {/* BUDGET CALCULATOR */}

        <Route path="/budget-calculator" element={<BudgetCalculator />} />

        {/* OFFERS & DEALS */}

        <Route path="/offers" element={<OffersDeals />} />

        {/* SHARE EXPERIENCE */}

        <Route path="/share-experience" element={<ShareExperience />} />

        {/* BLOGS & GUIDES */}

        <Route path="/blogs-guides" element={<BlogsGuides />} />

        {/* EXPLORE PLACES */}

        <Route path="/explore" element={<Explore />} />

        {/* EXPERIENCES */}

        <Route path="/experiences" element={<Experiences />} />

        {/* GUIDES */}

        <Route path="/guides" element={<Guides />} />

        {/* LOCATION DASHBOARD */}

        <Route path="/location/:name" element={<LocationDashboard />} />

        {/* PROFILE DASHBOARD — protected, own posts + profile edit */}

        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;