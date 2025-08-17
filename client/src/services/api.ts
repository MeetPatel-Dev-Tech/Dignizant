import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosHeaders,
} from 'axios';
import { API_BASE_URL } from '@env';

const api = axios.create({
  baseURL: 'http://10.0.2.2:8080/api',
  headers: new AxiosHeaders({ 'Content-Type': 'application/json' }),
  timeout: 10000,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Ensure headers always exist
    if (!config.headers) {
      config.headers = new AxiosHeaders(); // ✅ Correct type
    }

    // const token = await AsyncStorage.getItem('token');
    // if (token) config.headers.set('Authorization', `Bearer ${token}`);

    console.log('[API REQUEST]', config);
    return config;
  },
  error => {
    console.log('[REQUEST ERROR]', JSON.stringify(error));
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(
      '[API RESPONSE]',
      response.status,
      response.config.url,
      response.data,
    );
    return response.data;
  },
  error => {
    if (error.response) {
      console.log(
        '[RESPONSE ERROR]',
        error.response.status,
        error.response.data,
      );
    } else if (error.request) {
      console.error('[NO RESPONSE]', error.request);
    } else {
      console.error('[AXIOS ERROR]', error.message);
    }
    return Promise.reject(error);
  },
);

export const registerUser = (data: any) => api.post('/auth/signup', data);
export const loginUser = (data: any) => api.post('/auth/login', data);

export default api;
