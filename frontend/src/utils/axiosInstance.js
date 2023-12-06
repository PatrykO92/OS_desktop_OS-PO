import axios from "axios";

const apiUrl = import.meta.env.VITE_APP_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
});

// Add a request interceptor to set the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
