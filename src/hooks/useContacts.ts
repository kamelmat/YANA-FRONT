import { useQuery } from '@tanstack/react-query';
import { contactsService } from '../services/contacts';
import { useAuthStore } from '../store/authStore';
import { useContactsStore } from '../store/contactsStore';
import { useUserLocationStore } from '../store/userLocationStore';

// Helper function to detect user's country based on actual geographic location
const getUserCountryFromCoordinates = async (latitude: number, longitude: number): Promise<string> => {
  try {
    // Use reverse geocoding to get country from coordinates
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );
    const data = await response.json();
    
    // Map country codes/names to our supported countries
    const countryCode = data.countryCode?.toLowerCase();
    const countryName = data.countryName?.toLowerCase();
    
    if (countryCode === 'es' || countryName?.includes('spain')) return 'España';
    if (countryCode === 'fr' || countryName?.includes('france')) return 'France';
    if (countryCode === 'pt' || countryName?.includes('portugal')) return 'Portugal';
    if (countryCode === 'de' || countryName?.includes('germany')) return 'Germany';
    if (countryCode === 'us' || countryName?.includes('united states')) return 'United States';
    if (countryCode === 'gb' || countryName?.includes('united kingdom')) return 'United Kingdom';
    
    return data.countryName || 'España'; // Fallback to actual country name or España
  } catch (error) {
    console.error('Error detecting country from coordinates:', error);
    // Fallback to browser language detection only if geolocation fails
    const browserLanguage = navigator.language.toLowerCase();
    if (browserLanguage.includes('es')) return 'España';
    if (browserLanguage.includes('fr')) return 'France';
    if (browserLanguage.includes('pt')) return 'Portugal';
    if (browserLanguage.includes('de')) return 'Germany';
    if (browserLanguage.includes('en-us')) return 'United States';
    if (browserLanguage.includes('en-gb')) return 'United Kingdom';
    return 'España';
  }
};

export const useContacts = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const userLocation = useUserLocationStore((state) => state.userLocation);
  const { setContacts } = useContactsStore();

  const query = useQuery({
    queryKey: ['contacts', userLocation?.latitude, userLocation?.longitude],
    queryFn: async () => {
      if (!accessToken) throw new Error('No access token available');
      const allContacts = await contactsService.getContacts(accessToken);
      
      // Set all contacts in store for backward compatibility
      setContacts(allContacts);
      
      // Detect user's country from existing location coordinates (no new geolocation call)
      let userCountry = 'España'; // Default fallback
      if (userLocation?.latitude && userLocation?.longitude) {
        userCountry = await getUserCountryFromCoordinates(
          userLocation.latitude, 
          userLocation.longitude
        );
      } else {
        // If no location available, use browser language as fallback
        const browserLanguage = navigator.language.toLowerCase();
        if (browserLanguage.includes('es')) userCountry = 'España';
        else if (browserLanguage.includes('fr')) userCountry = 'France';
        else if (browserLanguage.includes('pt')) userCountry = 'Portugal';
        else if (browserLanguage.includes('de')) userCountry = 'Germany';
        else if (browserLanguage.includes('en-us')) userCountry = 'United States';
        else if (browserLanguage.includes('en-gb')) userCountry = 'United Kingdom';
      }
      
      // Filter and prioritize by user's actual geographic location
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
        allContacts, // Keep for backward compatibility
        userCountry
      };
    },
    enabled: !!accessToken,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes since location doesn't change often
    gcTime: 10 * 60 * 1000,
  });

  return {
    // New location-aware properties
    localContacts: query.data?.localContacts ?? [],
    internationalContacts: query.data?.internationalContacts ?? [],
    userCountry: query.data?.userCountry ?? 'España',
    
    // Backward compatibility
    contacts: query.data?.allContacts ?? [],
    isLoading: query.isLoading && !query.data,
    error: query.error,
  };
};
