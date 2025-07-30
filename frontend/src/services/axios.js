import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

instance.interceptors.request.use(
  async (config) => {
    let access = localStorage.getItem("access");
    config.headers.Authorization = access ? `Bearer ${access}` : "";
    return config;
  },
  (error) => Promise.reject(error)
);

// Auto refresh token if access expired
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token expired and not already retried
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refresh")
    ) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh");
      try {
        const res = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
          refresh: refresh,
        });
        const newAccess = res.data.access;
        localStorage.setItem("access", newAccess);

        // Retry the original request
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return instance(originalRequest);
      } catch (refreshError) {
        // Refresh failed → logout user
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
