import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const PUBLIC_ROUTES = ['/auth/login', '/auth/register'];

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const isPublic = PUBLIC_ROUTES.some((route) => config.url?.includes(route));

  if (!isPublic && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Axios error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;