import api from './api';
import { RegisterResponse } from '../types/auth';

export const registerUser = (data: any): Promise<RegisterResponse> =>
  api.post('/auth/signup', data);

export const loginUser = (data: any): Promise<RegisterResponse> =>
  api.post('/auth/login', data);
