import React from "react"
import Map from "../pages/Map"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Profile from "../pages/Profile"
import Register from "../pages/Register"
import Resources from "../pages/Resources"
import Contacts from "../pages/Contacts"
import { Routes, Route } from "react-router-dom"

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/map" element={<Map />} />
    <Route path="/login" element={<Login />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/register" element={<Register />} />
    <Route path="/resources" element={<Resources />} />
    <Route path="/contacts" element={<Contacts />} />
  </Routes>
)

export default AppRoutes
