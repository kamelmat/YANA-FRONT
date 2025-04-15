import { useMutation } from "@tanstack/react-query"
import { authService, RegisterData } from "../services/auth"
import { Stage } from "../pages/Register"

export const useRegister = (setStage: (stage: Stage) => void) => {
  const navigate = useNavigate()
  const setAccessToken = useAuthStore((state) => state.setAccessToken)
  const setRefreshToken = useAuthStore((state) => state.setRefreshToken)
  const setName = useAuthStore((state) => state.setName)
  const setAvatarId = useAuthStore((state) => state.setAvatarId)

  return useMutation({
    mutationFn: async (data: RegisterData) => {
      const response = await authService.register(data)

      if (response.access_token) setAccessToken(response.access_token)
      if (response.refresh_token) setRefreshToken(response.refresh_token)
      if (response.name) setName(response.name)
      if (response.avatar_id) setAvatarId(response.avatar_id)

      return response
    },
    onSuccess: () => {
      setStage("done")
    },
    onError: (error: Error) => {
      console.error("Registration error:", error.message)
    },
  })
}
