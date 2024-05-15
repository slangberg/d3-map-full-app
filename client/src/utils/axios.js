import axios from "axios";
import qs from "qs";
import { redirect } from "react-router-dom";

const baseURL = `${window.location.protocol}//${window.location.hostname}:8080`;
const axiosInstance = axios.create({
  baseURL,
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

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      config.headers.Authorization = `Bearer ${parsedUser.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

const nonRedirectUrls = ["/auth/login", "/users/register"];
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("datalousUser");
      sessionStorage.removeItem("datalousUser");

      if (!nonRedirectUrls.includes(error.config.url)) {
        redirect("/login");
      }
    }

    return Promise.reject(error.response);
  }
);

export default axiosInstance;
