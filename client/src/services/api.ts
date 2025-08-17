import axios, { AxiosResponse, AxiosError } from 'axios';
import { API_BASE_URL } from '@env';
import { store } from '../redux/store';

const api = axios.create({
  baseURL: 'http://10.0.2.2:8080/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  async config => {
    // Add Authorization token if exists
    const state = store.getState();
    const token = state.auth.token; // 👈 adjust based on your slice structure

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    console.log('[API REQUEST]', config);
    return config;
  },
  error => Promise.reject(error),
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('[API RESPONSE]', response.data);
    return response.data; // ⚡ Only return response.data
  },
  (error: AxiosError) => {
    console.error('[API ERROR]', error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default api;
