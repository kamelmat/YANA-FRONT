import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Register from "../pages/Register"
import Login from "../pages/Login"
import Map from "../pages/Map"
import Resources from "../pages/Resources"
import Profile from "../pages/Profile"

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/map" element={<Map />} />
    <Route path="/resources" element={<Resources />} />
    <Route path="/profile" element={<Profile />} />
  </Routes>
)

export default AppRoutes
