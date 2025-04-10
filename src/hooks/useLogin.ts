import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { authService, LoginData } from "../services/auth"

export const useLogin = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: LoginData) => authService.login(data),
    onSuccess: () => navigate("/"),
    onError: (error) => console.log(error),
  })
}
