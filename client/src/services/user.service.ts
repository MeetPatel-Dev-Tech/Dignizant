import api from './api';
import { RegisterResponse } from '../types/auth';
import { FetchUsersResponse, UserData } from '../types/user';

export const fetchUsersApi = async (): Promise<UserData[]> => {
  const response: FetchUsersResponse = await api.get('/users/AllUsers');
  return response.data; // ✅ this is the actual array of users
};
