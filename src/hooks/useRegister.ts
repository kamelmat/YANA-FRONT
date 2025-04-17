import { useMutation } from "@tanstack/react-query"
import { authService } from "../services/auth"
import type { RegisterData } from "../services/auth"
import type { Stage } from "../pages/Register"
import { useAuthStore } from "../store/authStore"

export const useRegister = (setStage: (stage: Stage) => void) => {
  const setAccessToken = useAuthStore(
    (state: { setAccessToken: (token: string | null) => void }) => state.setAccessToken
  )
  const setRefreshToken = useAuthStore(
    (state: { setRefreshToken: (token: string | null) => void }) => state.setRefreshToken
  )
  const setName = useAuthStore((state: { setName: (name: string | null) => void }) => state.setName)
  const setAvatarId = useAuthStore(
    (state: { setAvatarId: (id: string | null) => void }) => state.setAvatarId
  )

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
