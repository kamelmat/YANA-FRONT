import { AUTH_ENDPOINTS } from "../config/apiEndpoints"
import { handleApiError, getAuthHeaders, getDefaultHeaders } from "../utils/apiUtils"

export interface RegisterData {
  name: string
  last_name: string
  email: string
  password: string
}

export interface LoginData {
  email: string
  password: string
}

export interface RegisterResponse {
  access_token: string
  refresh_token: string
  name: string
  avatar_id: string
}

export interface LoginResponse {
  access: string
  refresh: string
  user: {
    name: string
    avatar_id: string
  }
}

export interface PasswordResetRequest {
  email: string
}

export interface PasswordResetConfirmRequest {
  uidb64: string
  token: string
  new_password: string
  confirm_password: string
}

export const authService = {
  register: async (data: RegisterData): Promise<RegisterResponse> => {
    try {
      const response = await fetch(AUTH_ENDPOINTS.REGISTER, {
        method: "POST",
        headers: getDefaultHeaders(),
        body: JSON.stringify(data),
        credentials: "include",
        mode: "cors",
      })

      if (!response.ok) {
        await handleApiError(response)
      }

      return response.json()
    } catch (error) {
      console.error("Register error:", error)
      throw error
    }
  },

  login: async (data: LoginData): Promise<LoginResponse> => {
    try {
      const response = await fetch(AUTH_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: getDefaultHeaders(),
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        await handleApiError(response)
      }

      return response.json()
    } catch (error) {
      console.error(`Login error: ${error}`)
      throw error
    }
  },

  logout: async (accessToken: string, refreshToken: string) => {
    try {
      const response = await fetch(AUTH_ENDPOINTS.LOGOUT, {
        method: "POST",
        headers: getAuthHeaders(accessToken),
        body: JSON.stringify({ refresh: refreshToken }),
        credentials: "include",
      })

      if (!response.ok) {
        await handleApiError(response)
      }

      return response.json()
    } catch (error) {
      console.error(`Logout error: ${error}`)
      throw error
    }
  },

  checkEmail: async (email: string): Promise<boolean> => {
    try {
      const response = await fetch(AUTH_ENDPOINTS.CHECK_EMAIL, {
        method: "POST",
        headers: getDefaultHeaders(),
        body: JSON.stringify({ email }),
        credentials: "include",
      })

      if (!response.ok) {
        await handleApiError(response)
      }

      const responseData = await response.json()
      return responseData.email_exists
    } catch (error) {
      console.error(`Email check error: ${error}`)
      throw error
    }
  },

  refreshToken: async (refreshToken: string) => {
    try {
      const response = await fetch(AUTH_ENDPOINTS.REFRESH_TOKEN, {
        method: "POST",
        headers: getDefaultHeaders(),
        body: JSON.stringify({ refresh: refreshToken }),
      })

      if (!response.ok) {
        await handleApiError(response)
      }

      return response.json()
    } catch (error) {
      console.error(`Token refresh error: ${error}`)
      throw error
    }
  },

  requestPasswordReset: async (data: PasswordResetRequest) => {
    try {
      const response = await fetch(AUTH_ENDPOINTS.PASSWORD_RESET, {
        method: "POST",
        headers: getDefaultHeaders(),
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        await handleApiError(response)
      }

      return response.json()
    } catch (error) {
      console.error("Password reset request error:", error)
      throw error
    }
  },

  confirmPasswordReset: async (data: PasswordResetConfirmRequest) => {
    try {
      const response = await fetch(AUTH_ENDPOINTS.PASSWORD_RESET_CONFIRM, {
        method: "POST",
        headers: getDefaultHeaders(),
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        await handleApiError(response)
      }

      return response.json()
    } catch (error) {
      console.error("Password reset confirmation error:", error)
      throw error
    }
  },
}
