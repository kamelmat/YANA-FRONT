import { useMutation } from "@tanstack/react-query"
import { authService, RegisterData } from "../services/auth"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"

export const useRegister = () => {
  const navigate = useNavigate()
  const setAccessToken = useAuthStore((state) => state.setAccessToken)

  return useMutation({
    mutationFn: async (data: RegisterData) => {
      const response = await authService.register(data)
      if (response.access_token) {
        setAccessToken(response.access_token)
      }
      return response
    },
    onSuccess: () => {
      navigate("/")
    },
    onError: (error: Error) => {
      console.error("Registration error:", error.message)
    },
  })
}
