import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { authService, LoginData } from "../services/auth"
import { useAuthStore } from "../store/authStore"

export const useLogin = () => {
  const navigate = useNavigate()
  const setAccessToken = useAuthStore((state) => state.setAccessToken)

  return useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await authService.login(data)
      if (response.access_token) {
        setAccessToken(response.access_token)
      }
      return response
    },
    onSuccess: () => navigate("/"),
    onError: (error) => console.log(error),
  })
}
