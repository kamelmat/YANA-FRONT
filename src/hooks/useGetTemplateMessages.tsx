import { useQuery } from '@tanstack/react-query';
import { emotionsService } from '../services/emotions';
import { useAuthStore } from '../store/authStore';

export const useGetTemplateMessages = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ['templateMessages'],
    queryFn: () => {
      if (!accessToken) {
        throw new Error('Access token required');
      }
      return emotionsService.getTemplateMessages(accessToken);
    },
    enabled: !!accessToken,
    gcTime: 0,
  });
};
