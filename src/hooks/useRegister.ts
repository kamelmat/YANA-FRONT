import { useMutation } from "@tanstack/react-query"
import { authService, RegisterData } from "../services/auth"
import { Stage } from "../pages/Register"

export const useRegister = (
  setStage: (stage: Stage) => void,
  setAccessToken: (token: string | null) => void,
  setRefreshToken: (token: string | null) => void,
  setName: (name: string | null) => void
) => {
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
      setStage("done")
    },
    onError: (error: Error) => {
      console.error("Registration error:", error.message)
    },
  })
}
