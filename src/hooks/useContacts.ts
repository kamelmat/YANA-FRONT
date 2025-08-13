import { useQuery } from '@tanstack/react-query';
import { contactsService } from '../services/contacts';
import { useAuthStore } from '../store/authStore';
import { useContactsStore } from '../store/contactsStore';

// Helper function to detect user's country
const getUserCountry = (): string => {
  // You can implement geolocation-based detection or use IP geolocation
  // For now, we'll detect based on browser language or manual selection
  const browserLanguage = navigator.language.toLowerCase();
  
  if (browserLanguage.includes('es')) return 'España';
  if (browserLanguage.includes('fr')) return 'France';
  if (browserLanguage.includes('pt')) return 'Portugal';
  if (browserLanguage.includes('de')) return 'Germany';
  if (browserLanguage.includes('en-us')) return 'United States';
  if (browserLanguage.includes('en-gb')) return 'United Kingdom';
  
  return 'España'; // Default fallback
};

export const useContacts = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const { setContacts } = useContactsStore();
  
  const userCountry = getUserCountry();

  const query = useQuery({
    queryKey: ['contacts', userCountry],
    queryFn: async () => {
      if (!accessToken) throw new Error('No access token available');
      const allContacts = await contactsService.getContacts(accessToken);
      
      // Set all contacts in store for backward compatibility
      setContacts(allContacts);
      
      // Filter and prioritize by user's location
      const localContacts = allContacts.filter(contact => 
        contact.location?.toLowerCase().includes(userCountry.toLowerCase()) ||
        (userCountry === 'España' && contact.location?.toLowerCase().includes('valencia')) ||
        (userCountry === 'España' && contact.location?.toLowerCase().includes('spain'))
      );
      
      const internationalContacts = allContacts.filter(contact => 
        !localContacts.some(local => local.id === contact.id)
      );
      
      return { 
        localContacts, 
        internationalContacts,
        allContacts // Keep for backward compatibility
      };
    },
    enabled: !!accessToken,
    staleTime: 0,
    gcTime: 0,
  });

  return {
    // New location-aware properties
    localContacts: query.data?.localContacts ?? [],
    internationalContacts: query.data?.internationalContacts ?? [],
    userCountry,
    
    // Backward compatibility
    contacts: query.data?.allContacts ?? [],
    isLoading: query.isLoading && !query.data,
    error: query.error,
  };
};
