import axios from "axios";

// Determine API base URL
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://api.stygo.in";

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
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refresh = localStorage.getItem("refreshToken");
        const res = await axios.post(`${API_BASE_URL}/api/token/refresh/`, { refresh });
        const newAccessToken = res.data.access;
        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
