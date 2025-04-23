import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { authService } from "../services/auth"
import { useAuthStore } from "../store/authStore"

export const useLogout = () => {
  const navigate = useNavigate()
  const accessToken = useAuthStore((state) => state.accessToken)
  const refreshToken = useAuthStore((state) => state.refreshToken)

  return useMutation({
    mutationFn: () => {
      if (!accessToken || !refreshToken) {
        throw new Error("No tokens available")
      }
      return authService.logout(accessToken, refreshToken)
    },
    onMutate: () => {
      useAuthStore.getState().clearAuth()
      navigate("/login")
    },
    onError: (error) => {
      console.error("Logout error:", error)
    },
  })
}
