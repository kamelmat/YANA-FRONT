import { useMutation } from "@tanstack/react-query"
import { authService } from "../services/auth"

export const useCheckEmail = () => {
  return useMutation({
    mutationFn: (email: string) => authService.checkEmail(email),
    onError: (error: Error) => {
      console.error("Email check error:", error)
    },
  })
}
