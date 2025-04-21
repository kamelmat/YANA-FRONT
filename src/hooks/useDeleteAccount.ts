import { useMutation } from "@tanstack/react-query"
import { useAuthStore } from "../store/authStore"
import { useNavigate } from "react-router-dom"
import { AUTH_ENDPOINTS } from "../config/apiEndpoints"

export function useDeleteAccount() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (password: string) => {
      const response = await fetch(AUTH_ENDPOINTS.DELETE_ACCOUNT, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ password }),
        credentials: "include",
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to delete account")
      }

      return responseData
    },
    onSuccess: () => {
      clearAuth()
      navigate("/login")
    },
  })
}
