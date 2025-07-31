import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// Attach access token to request
instance.interceptors.request.use(
  async (config) => {
    const access = localStorage.getItem("access");
    config.headers.Authorization = access ? `Bearer ${access}` : "";
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 errors (access token expired)
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refresh")
    ) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem("refresh");

      try {
        const res = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
          refresh,
        });

        const newAccess = res.data.access;
        localStorage.setItem("access", newAccess);

        // Retry with new token
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return instance(originalRequest);
      } catch (refreshError) {
        console.warn("⚠️ Token refresh failed. Seller still stays on site.");

        // ✅ Do NOT logout or redirect
        // Optionally: Show toast/snackbar message to seller here
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
