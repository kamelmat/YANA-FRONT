import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';
import type { PasswordResetRequest } from '../services/auth';

export const usePasswordReset = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: PasswordResetRequest) => {
      return await authService.requestPasswordReset(data);
    },
    onSuccess: () => {
      navigate('/login');
    },
  });
};
