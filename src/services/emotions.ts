const API_URL = "http://127.0.0.1:8000"

export interface CreateEmotionRequest {
  emotion_id: string
  latitude: number
  longitude: number
}

export interface CreateEmotionResponse {
  id: string
  emotion_id: string
  userId: string
  latitude: number
  longitude: number
  createdAt: string
  updatedAt: string
}

export interface AvailableEmotion {
  id: string
  name: string
}

export const emotionsService = {
  createEmotion: async (
    data: CreateEmotionRequest,
    accessToken: string
  ): Promise<CreateEmotionResponse> => {
    try {
      const response = await fetch(`${API_URL}/emociones/user/emotions/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to create emotion")
      }

      return responseData
    } catch (error) {
      console.error("Create emotion error:", error)
      throw error
    }
  },

  getAvailableEmotions: async (accessToken: string): Promise<AvailableEmotion[]> => {
    try {
      const response = await fetch(`${API_URL}/emociones/emotions/available/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to get available emotions")
      }

      return responseData
    } catch (error) {
      console.error("Get available emotions error:", error)
      throw error
    }
  },
}
