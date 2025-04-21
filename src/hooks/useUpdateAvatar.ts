import { useMutation } from "@tanstack/react-query"
import { useAuthStore } from "../store/authStore"
import { AUTH_ENDPOINTS } from "../config/apiEndpoints"

interface UpdateAvatarResponse {
  success: boolean
  message: string
}

export const useUpdateAvatar = () => {
  const accessToken = useAuthStore((state) => state.accessToken)
  const setAvatarId = useAuthStore((state) => state.setAvatarId)

  return useMutation<UpdateAvatarResponse, Error, number>({
    mutationFn: async (avatarId: number) => {
      const response = await fetch(AUTH_ENDPOINTS.UPDATE_AVATAR, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ avatar_id: avatarId }),
        credentials: "include",
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to update avatar")
      }

      return responseData
    },
    onSuccess: (_, avatarId) => {
      setAvatarId(avatarId.toString())
    },
  })
}
