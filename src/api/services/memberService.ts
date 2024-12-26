import { fetchClient } from '../fetchClient';
import { API_BASE_URL, ENDPOINTS } from '../apiEndpoints';

export interface Member {
    id: number;
    name: string;
    email: string;
  }

  export const fetchMembers = async (): Promise<Member[]> => {
    return fetchClient<Member[]>(`${API_BASE_URL}/${ENDPOINTS.members}`);
  };

export const createMember = async (name: string, email: string): Promise<Member> => {
    return fetchClient<Member>(`${API_BASE_URL}/${ENDPOINTS.createMember}`, {
      method: 'POST',
      body: JSON.stringify({ name, email }),
    });
  };