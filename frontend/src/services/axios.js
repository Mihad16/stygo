import axios from "axios";

// Determine API base URL
// Priority: explicit env > dev default localhost > production default
const envUrl = import.meta.env.VITE_API_BASE_URL;
const isValidEnvUrl = typeof envUrl === "string" && /^https?:\/\//i.test(envUrl);
const API_BASE_URL = isValidEnvUrl
  ? envUrl
  : (import.meta.env.DEV ? "http://127.0.0.1:8000" : "https://stygo.onrender.com");

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // send cookies if needed
});

// Attach token
api.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem("accessToken");
    if (access) config.headers.Authorization = `Bearer ${access}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Don't retry refresh token for login/signup requests
    if (originalRequest.url.includes('/api/auth/login/')) {
      return Promise.reject(error);
    }

    // Only attempt refresh on 401 and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refresh = localStorage.getItem("refreshToken");
        if (!refresh) {
          throw new Error('No refresh token available');
        }
        
        const response = await axios.post(`${API_BASE_URL}/api/token/refresh/`, { refresh });
        const { access } = response.data;
        
        localStorage.setItem("accessToken", access);
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (err) {
        // If refresh fails, clear auth and redirect to login
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user_id");
        localStorage.removeItem("phone");
        localStorage.removeItem("has_shop");
        
        // Only redirect if we're not already on the login page
        if (!window.location.pathname.includes('/login')) {
          window.location.href = "/login";
        }
        return Promise.reject(err);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
