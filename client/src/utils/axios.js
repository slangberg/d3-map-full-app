import axios from "axios";
import qs from "qs";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  paramsSerializer: (params) =>
    qs.stringify(params, {
      arrayFormat: "brackets",
      allowDots: true,
    }),
});

// Use an interceptor to add auth token to requests dynamically
axiosInstance.interceptors.request.use(
  (config) => {
    const storedUser =
      localStorage.getItem("datalousUser") ||
      sessionStorage.getItem("datalousUser");
    if (storedUser && storedUser.token) {
      config.headers.Authorization = `Bearer ${storedUser.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

const nonRedirectUrls = ["/auth/login", "/auth/register"];
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("datalousUser");
      sessionStorage.removeItem("datalousUser");
    }

    if (!nonRedirectUrls.includes(error.config.url)) {
      window.location.href = "/login";
    }

    return Promise.reject(error.response);
  }
);

export default axiosInstance;
