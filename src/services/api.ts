// api.ts
import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: `http://localhost:9000/target/api/v1`,
  withCredentials: true, // ✅ so cookies (access + refresh) are sent automatically
  headers: {
    "Content-Type": "application/json",
  },
});

// --- Token refresh handling state ---
let isRefreshing = false;
let refreshSubscribers: ((token?: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token?: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token?: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

// --- Helper to detect if refresh token cookie exists ---
function hasRefreshToken(): boolean {
  return document.cookie.split("; ").some((c) => c.startsWith("refreshToken="));
}

// --- Response interceptor ---
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If request failed with 401 (Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      // 🚫 Guest user case: no refresh token cookie
      if (!hasRefreshToken()) {
        return Promise.reject(error);
      }

      // --- Authenticated user case ---
      if (isRefreshing) {
        // Already refreshing → queue the request until refresh finishes
        return new Promise((resolve) => {
          subscribeTokenRefresh(() => {
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const {data}=await axios.post(
          `/target/api/v1/users/refresh-token`,
          {},
          { withCredentials: true }
        );


        const newToken = data?.accessToken; // depends on backend implementation

        // Notify all subscribers
        onRefreshed(newToken);
        isRefreshing = false;

        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token expired or invalid:", refreshError);

        isRefreshing = false;
        window.location.href = "/auth/index"; // force login

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
