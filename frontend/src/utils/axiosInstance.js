import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const token = localStorage.getItem("authToken");

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Token ${token}`,
  },
});

export default axiosInstance;
