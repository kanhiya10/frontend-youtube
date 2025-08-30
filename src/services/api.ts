import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:8001/api/v1",
  withCredentials: true, // ✅ so cookies (access + refresh) are sent automatically
  headers: {
    "Content-Type": "application/json",
  },
});

// Track refresh request so multiple calls don’t trigger multiple refreshes
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach(cb => cb(token));
  refreshSubscribers = [];
}

// Response interceptor: catch 401 errors and try refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(
          "http://localhost:8001/api/v1/users/refresh-token",
          {},
          { withCredentials: true }
        );

        console.log("AccessToken refreshed");

        return api(originalRequest); // retry original request
      } catch (refreshError: any) {
        console.error("Refresh token expired or invalid:", refreshError);

         window.location.href = "/profile/index";

      }
    }

    return Promise.reject(error);
  }
);

export default api;
