import axiosInstance from "../../utils/axios";
import {
  login as loginAction,
  setAuthError,
  logout as logoutAction,
  setRegisterSuccess,
} from "../features/authSlice";
import { redirect } from "react-router-dom";
export const login = (loginData) => async (dispatch) => {
  try {
    const { remember, ...userInfo } = loginData;
    const response = await axiosInstance.post("/auth/login", userInfo);
    if (remember) {
      localStorage.setItem("datalousUser", JSON.stringify(response.data));
    } else {
      sessionStorage.setItem("datalousUser", JSON.stringify(response.data));
    }

    dispatch(loginAction(response.data));
    redirect("/list");
  } catch (err) {
    dispatch(setAuthError(err?.data?.error || "An unexpected error occurred"));
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axiosInstance.put("/auth/logout");
    localStorage.removeItem("datalousUser");
    sessionStorage.removeItem("datalousUser");

    await dispatch(logoutAction());
    await dispatch(setRegisterSuccess("Logged Out"));
    redirect("/login");
  } catch (err) {
    console.error("Logout failed", err);
  }
};
