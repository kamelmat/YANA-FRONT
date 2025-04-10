import { useMutation } from "@tanstack/react-query"
import { authService, RegisterData } from "../services/auth"
import { useNavigate } from "react-router-dom"

export const useRegister = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: RegisterData) => authService.register(data),
    onSuccess: () => {
      navigate("/login")
    },
    onError: (error: Error) => {
      console.error("Registration error:", error.message)
    },
  })
}
