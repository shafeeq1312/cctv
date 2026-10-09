import axios from 'axios';

// Dynamically select base URL (uses Vite proxy /api locally, fallback to Render in production)
const getBaseURL = () => {
  if (typeof window !== 'undefined') {
    const { hostname } = window.location;
    // On local machine or local Wi-Fi, use relative /api (proxied by Vite to port 5000, or served by Express)
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname.startsWith('192.168.') ||
      hostname.startsWith('10.') ||
      hostname.startsWith('172.') ||
      hostname.endsWith('.local')
    ) {
      return '/api';
    }
  }
  return import.meta.env.VITE_API_URL || 'https://cctv-lftq.onrender.com/api';
};

const API = axios.create({
  baseURL: getBaseURL(),
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor: Attach JWT Token from sessionStorage or localStorage
API.interceptors.request.use(
  (config) => {
    const token =
      sessionStorage.getItem('lucky_admin_token') ||
      localStorage.getItem('lucky_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Automatically handle 401 Unauthorized
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem('lucky_admin_token');
      localStorage.removeItem('lucky_admin_token');
      if (
        typeof window !== 'undefined' &&
        window.location.pathname.startsWith('/admin') &&
        window.location.pathname !== '/admin/login'
      ) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default API;