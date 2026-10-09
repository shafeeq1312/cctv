import axios from 'axios';

// Dynamically select fast local server when developing locally or on local Wi-Fi
const getBaseURL = () => {
  if (typeof window !== 'undefined') {
    const { hostname, port } = window.location;
    // If frontend is directly served by Express on port 5000
    if (port === '5000') {
      return '/api';
    }
    // Local development machine or mobile device connected over local Wi-Fi / hotspot
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname.startsWith('192.168.') ||
      hostname.startsWith('10.') ||
      hostname.startsWith('172.') ||
      hostname.endsWith('.local')
    ) {
      return `http://${hostname}:5000/api`;
    }
  }
  return import.meta.env.VITE_API_URL || 'https://cctv-lftq.onrender.com/api';
};

const API = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
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