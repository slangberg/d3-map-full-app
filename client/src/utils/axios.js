import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

// Use an interceptor to add auth token to requests dynamically
axiosInstance.interceptors.request.use(
  (config) => {
    const useSession = localStorage.getItem("useSession");
    const token = useSession
      ? sessionStorage.getItem("authToken")
      : localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // localStorage.removeItem("authToken");
      // sessionStorage.removeItem("authToken");
      // localStorage.removeItem("useSession");
      // window.location.href = "/login";
    }
    return Promise.reject(error.response);
  }
);

export default axiosInstance;
