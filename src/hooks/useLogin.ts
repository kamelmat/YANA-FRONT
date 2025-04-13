import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { authService, LoginData } from "../services/auth"
import { useAuthStore } from "../store/authStore"

export const useLogin = () => {
  const navigate = useNavigate()
  const setAccessToken = useAuthStore((state) => state.setAccessToken)
  const setRefreshToken = useAuthStore((state) => state.setRefreshToken)

  return useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await authService.login(data)
      if (response.access) {
        setAccessToken(response.access)
        setRefreshToken(response.refresh)
      }
      return response
    },
    onSuccess: () => navigate("/"),
    onError: (error) => console.log(error),
  })
}
