import { useMutation } from "@tanstack/react-query"
import { authService, RegisterData } from "../services/auth"
import { Stage } from "../pages/Register"

export const useRegister = (setStage: (stage: Stage) => void) => {
  return useMutation({
    mutationFn: (data: RegisterData) => authService.register(data),
    onSuccess: () => {
      setStage("done")
    },
    onError: (error: Error) => {
      console.error("Registration error:", error.message)
    },
  })
}
