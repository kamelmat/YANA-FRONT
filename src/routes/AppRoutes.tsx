import type React from "react"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Profile from "../pages/Profile"
import Register from "../pages/Register"
import Resources from "../pages/Resources"
import Contacts from "../pages/Contacts"
import { Routes, Route, Navigate } from "react-router-dom"
import MapLayout from "./MapLayout"
import ProtectedRoute from "../components/ProtectedRoute"
import { useTokenRefresh } from "../hooks/useTokenRefresh"
import { useAuthStore } from "../store/authStore"

const AppRoutes: React.FC = () => {
  useTokenRefresh();
  const accessToken = useAuthStore((state) => state.accessToken);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute><MapLayout /></ProtectedRoute>}>
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/FAQ" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to={accessToken ? "/" : "/login"} replace />} />
    </Routes>
  )
}

export default AppRoutes
