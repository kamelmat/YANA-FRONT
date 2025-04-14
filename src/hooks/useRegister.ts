import { useMutation } from "@tanstack/react-query"
import { authService, RegisterData } from "../services/auth"

import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"

import { Stage } from "../pages/Register"

export const useRegister = (setStage: (stage: Stage) => void) => {
  const navigate = useNavigate()
  const setAccessToken = useAuthStore((state) => state.setAccessToken)
  const setRefreshToken = useAuthStore((state) => state.setRefreshToken)
  const setName = useAuthStore((state) => state.setName)

  return useMutation({
    mutationFn: async (data: RegisterData) => {
      const response = await authService.register(data)
      if (response.access_token && response.refresh_token && response.name) {
        setAccessToken(response.access_token)
        setRefreshToken(response.refresh_token)
        setName(response.name)
      }
      return response
    },
    onSuccess: () => {
      navigate("/")
      setStage("done")
    },
    onError: (error: Error) => {
      console.error("Registration error:", error.message)
    },
  })
}
