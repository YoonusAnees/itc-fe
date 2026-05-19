import axios from "axios";
import { useAuthStore } from "./authStore";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // Send HttpOnly cookies
  xsrfCookieName: "XSRF-TOKEN", // Default for Double Submit Cookie CSRF
  xsrfHeaderName: "X-XSRF-TOKEN",
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle Rate Limiting
    if (error.response?.status === 429) {
      console.warn("Rate limit exceeded. Please slow down.");
      // Could show a toast notification here
      return Promise.reject(error);
    }

    // Handle Refresh Token logic
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Don't intercept refresh-token or login endpoints to prevent infinite loops
      if (originalRequest.url.includes("/auth/refresh-token") || originalRequest.url.includes("/auth/login")) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Backend handles refreshing the HttpOnly cookie
        await api.post("/auth/refresh-token");
        
        processQueue(null);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        // Force logout if refresh fails
        useAuthStore.getState().logout();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;