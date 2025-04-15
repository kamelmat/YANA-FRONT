const API_URL = "http://127.0.0.1:8000"

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
  name: string
  avatar_id: string
}

export const authService = {
  register: async (data: RegisterData): Promise<RegisterResponse> => {
    try {
      const response = await fetch(`${API_URL}/usuario/api/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
        mode: "cors",
      })

      const responseData = await response.json()
      if (!response.ok) {
        throw new Error(responseData.message || "Registration failed")
      }

      return responseData
    } catch (error) {
      console.error("Register error:", error)
      throw error
    }
  },

  login: async (data: LoginData) => {
    try {
      const response = await fetch(`${API_URL}/usuario/api/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.detail || "Login failed")
      }

      return responseData
    } catch (error) {
      console.error(`Login error: ${error}`)
      throw error
    }
  },

  logout: async (accessToken: string, refreshToken: string) => {
    try {
      const response = await fetch(`${API_URL}/usuario/api/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refresh: refreshToken }),
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Logout failed")
      }

      return response.json()
    } catch (error) {
      console.error(`Logout error: ${error}`)
      throw error
    }
  },

  checkEmail: async (email: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/usuario/api/check-email/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "include",
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.message || "Email check failed")
      }

      return responseData.email_exists
    } catch (error) {
      console.error(`Email check error: ${error}`)
      throw error
    }
  },

  refreshToken: async (refreshToken: string) => {
    try {
      const response = await fetch(`${API_URL}/usuario/api/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.message || "Token refresh failed")
      }

      return responseData
    } catch (error) {
      console.error(`Token refresh error: ${error}`)
      throw error
    }
  },
}
