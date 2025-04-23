export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export const handleApiError = async (response: Response): Promise<never> => {
  let errorMessage = 'An error occurred';
  let errorCode: string | undefined;

  try {
    const errorData = await response.json();
    errorMessage = errorData.message || errorData.detail || errorMessage;
    errorCode = errorData.code;
  } catch {
    // If we can't parse the error response, use the status text
    errorMessage = response.statusText || errorMessage;
  }

  const error: ApiError = {
    message: errorMessage,
    status: response.status,
    code: errorCode,
  };

  throw error;
};

export const getAuthHeaders = (accessToken: string) => ({
  Authorization: `Bearer ${accessToken}`,
  'Content-Type': 'application/json',
});

export const getDefaultHeaders = () => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
});
