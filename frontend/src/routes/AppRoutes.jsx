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

      </Routes>

    </BrowserRouter>

  )
}

export default AppRoutes