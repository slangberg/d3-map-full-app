import axiosInstance from "../../utils/axios";
import {
  login as loginAction,
  setAuthError,
  logout as logoutAction,
} from "../features/authSlice";

export const login = (loginData, navigate) => async (dispatch) => {
  try {
    const { remember, ...userInfo } = loginData;
    const response = await axiosInstance.post("/auth/login", userInfo);
    if (remember) {
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("datalousUser", JSON.stringify(response.data));
    } else {
      sessionStorage.setItem("authToken", response.data.token);
      sessionStorage.setItem("datalousUser", JSON.stringify(response.data));
    }

    dispatch(loginAction(response.data));
    navigate("/display");
  } catch (err) {
    dispatch(setAuthError(err?.data?.error || "An unexpected error occurred"));
  }
};

export const logout = (navigate) => async (dispatch) => {
  try {
    localStorage.removeItem("datalousUser");
    sessionStorage.removeItem("datalousUser");
    await dispatch(logoutAction());
    await axiosInstance.put("/auth/logout");

    navigate("/login");
  } catch (err) {
    // Optionally handle errors specific to the logout process
    console.error("Logout failed", err);
  }
};
