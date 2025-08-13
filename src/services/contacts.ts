import { RESOURCES_ENDPOINTS } from '../config/apiEndpoints';
import { getAuthHeaders, handleApiError } from '../utils/apiUtils';

export interface Contact {
  id: number;
  name: string;
  description: string;
  url: string;
  location: string;
  category: string;
  phone?: string;
  email?: string;
}

class ContactsService {
  async getContacts(accessToken: string): Promise<Contact[]> {
    const response = await fetch(RESOURCES_ENDPOINTS.GET_RESOURCES, {
      headers: getAuthHeaders(accessToken),
    });

    if (!response.ok) {
      await handleApiError(response);
    }

    return response.json();
  }
}

export const contactsService = new ContactsService();
