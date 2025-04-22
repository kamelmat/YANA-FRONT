import type React from "react"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Profile from "../pages/Profile"
import Register from "../pages/Register"
import Resources from "../pages/Resources"
import Contacts from "../pages/Contacts"
import AccountSettings from "../pages/profile/AccountSettings"
import ConfigurationSettings from "../pages/profile/ConfigurationSettings"
import InteractionsSettings from "../pages/profile/InteractionsSettings"
import FAQ from "../pages/FAQ"
import { Routes, Route, Navigate } from "react-router-dom"
import MapLayout from "./MapLayout"
import ProtectedRoute from "../components/ProtectedRoute"
import { useTokenRefresh } from "../hooks/useTokenRefresh"
import { useAuthStore } from "../store/authStore"
import Onboarding from "../pages/Onboarding"
import TrailingSlashRedirect from "../components/TrailingSlashRedirect"
import ResetPassword from "../pages/ResetPassword"
import ResetPasswordConfirm from "../pages/ResetPasswordConfirm"

const AppRoutes: React.FC = () => {
  useTokenRefresh();
  const accessToken = useAuthStore((state) => state.accessToken);

  return (
    <>
      <TrailingSlashRedirect />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-password/:uid/:token" element={<ResetPasswordConfirm />} />
        <Route element={<ProtectedRoute><MapLayout /></ProtectedRoute>}>
          <Route path="/" element={<Home />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/account" element={<AccountSettings />} />
          <Route path="/profile/configuration" element={<ConfigurationSettings />} />
          <Route path="/profile/interactions" element={<InteractionsSettings />} />
        </Route>
        <Route path="*" element={<Navigate to={accessToken ? "/" : "/login"} replace />} />
      </Routes>
    </>
  )
}

export default AppRoutes
