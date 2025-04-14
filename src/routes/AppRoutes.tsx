import React from "react"
import Map from "../pages/Map"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Profile from "../pages/Profile"
import Register from "../pages/Register"
import Resources from "../pages/Resources"
import Contacts from "../pages/Contacts"
import { Routes, Route } from "react-router-dom"
import MapLayout from "./MapLayout"
import ProtectedRoute from "../components/ProtectedRoute"
import { useTokenRefresh } from "../hooks/useTokenRefresh"

const AppRoutes: React.FC = () => {
  useTokenRefresh();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute><MapLayout /></ProtectedRoute>}>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/FAQ" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
