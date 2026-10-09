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

// Fast in-flight request deduping and memory cache for rapid public navigation
const requestCache = new Map();
const CACHE_TTL = 30000; // 30 seconds

const originalGet = API.get.bind(API);
API.get = async function (url, config = {}) {
  // CRITICAL SECURITY: Never cache admin or authentication requests!
  if (
    url.includes('/admin') ||
    url.includes('/auth') ||
    config.skipCache
  ) {
    return originalGet(url, config);
  }

  const cacheKey = `${url}_${JSON.stringify(config.params || {})}`;
  const now = Date.now();

  if (requestCache.has(cacheKey)) {
    const cached = requestCache.get(cacheKey);
    // Return cached data immediately if still fresh
    if (now - cached.timestamp < CACHE_TTL && cached.data) {
      return Promise.resolve(cached.data);
    }
    // Return pending in-flight promise if currently fetching
    if (cached.promise) {
      return cached.promise;
    }
  }

  const fetchPromise = originalGet(url, config)
    .then((response) => {
      requestCache.set(cacheKey, {
        timestamp: Date.now(),
        data: response,
        promise: null
      });
      return response;
    })
    .catch((err) => {
      requestCache.delete(cacheKey);
      throw err;
    });

  requestCache.set(cacheKey, {
    timestamp: now,
    data: null,
    promise: fetchPromise
  });

  return fetchPromise;
};

// Invalidate cache on mutations (POST, PUT, DELETE)
const clearApiCache = () => {
  requestCache.clear();
};

const originalPost = API.post.bind(API);
API.post = async function (url, data, config) {
  clearApiCache();
  return originalPost(url, data, config);
};

const originalPut = API.put.bind(API);
API.put = async function (url, data, config) {
  clearApiCache();
  return originalPut(url, data, config);
};

const originalDelete = API.delete.bind(API);
API.delete = async function (url, config) {
  clearApiCache();
  return originalDelete(url, config);
};

export { clearApiCache };
export default API;