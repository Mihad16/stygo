import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// ✅ Attach token to every request
api.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem("accessToken");
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Handle token expiration and refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token expired and it's not already a retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refreshToken");

        // Try to get a new access token
        const res = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
          refresh,
        });

        const newAccessToken = res.data.access;
        localStorage.setItem("accessToken", newAccessToken);

        // Update the header and retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        console.warn("⚠️ Token refresh failed.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        // Redirect to login page or show logout
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
