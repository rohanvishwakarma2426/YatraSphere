import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import Home from "../pages/home/Home"
import Login from "../pages/Login/Login"
import Signup from "../pages/Signup/Signup"
import Community from "../pages/Community/Community"
import Trips from "../pages/Trips/Trips"
import Alerts from "../pages/Alerts/Alerts"
import Packages from "../pages/Packages/Packages"
import BudgetCalculator from "../pages/BudgetCalculator/BudgetCalculator"
import OffersDeals from "../pages/OffersDeals/OffersDeals"
import ShareExperience from "../pages/ShareExperience/ShareExperience"
import BlogsGuides from "../pages/BlogsGuides/BlogsGuides"
import Explore from "../pages/Explore/Explore"

function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        {/* HOME */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* LOGIN */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* SIGNUP */}

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* COMMUNITY */}

        <Route
          path="/community"
          element={<Community />}
        />

        {/* TRIPS */}

        <Route
          path="/trips"
          element={<Trips />}
        />

        {/* ALERTS */}

        <Route
          path="/alerts"
          element={<Alerts />}
        />

        {/* PACKAGES */}

        <Route
          path="/packages"
          element={<Packages />}
        />

        {/* BUDGET CALCULATOR */}

        <Route
          path="/budget-calculator"
          element={<BudgetCalculator />}
        />

        {/* OFFERS & DEALS */}

        <Route
          path="/offers"
          element={<OffersDeals />}
        />

        {/* SHARE EXPERIENCE */}

        <Route
          path="/share-experience"
          element={<ShareExperience />}
        />

        {/* BLOGS & GUIDES */}

        <Route
          path="/blogs-guides"
          element={<BlogsGuides />}
        />
        {/* EXPLORE PLACES */}

        <Route
          path="/explore"
          element={<Explore />}
        />

      </Routes>

    </BrowserRouter>

  )
}

export default AppRoutes