import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { authService, LoginData } from "../services/auth"
import { useAuthStore } from "../store/authStore"

export const useLogin = () => {
  const navigate = useNavigate()
  const setAccessToken = useAuthStore((state) => state.setAccessToken)
  const setRefreshToken = useAuthStore((state) => state.setRefreshToken)
  const setName = useAuthStore((state) => state.setName)

  return useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await authService.login(data)
      console.log(response)
      if (response.access && response.refresh) {
        setAccessToken(response.access)
        setRefreshToken(response.refresh)
        // setName(response.user.name)
      }
      return response
    },
    onSuccess: () => navigate("/"),
    onError: (error) => console.log(error),
  })
}
