import axiosInstance from "../../utils/axios";
import {
  login as loginAction,
  setAuthError,
  logout as logoutAction,
  setRegisterSuccess,
} from "../features/authSlice";

export const login = (loginData, navigate) => async (dispatch) => {
  try {
    const response = await axiosInstance.post("/auth/login", loginData);
    localStorage.setItem("authToken", response.data.token);
    console.log("Login", response.data);
    dispatch(loginAction(response.data));
    navigate("/display");
  } catch (err) {
    dispatch(setAuthError(err?.data?.error || "An unexpected error occurred"));
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    console.log(userData);
    const response = await axiosInstance.post("/auth/register", userData);
    dispatch(setRegisterSuccess(response.data.message));
  } catch (err) {
    dispatch(setAuthError(err?.data?.error || "An unexpected error occurred"));
  }
};

export const logout = (navigate) => async (dispatch, getState) => {
  const { user } = getState().auth;
  try {
    await axiosInstance.post("/auth/logout", { userId: user.id });
    localStorage.removeItem("authToken");
    await dispatch(logoutAction(user));
    navigate("/login");
  } catch (err) {
    // Optionally handle errors specific to the logout process
    console.error("Logout failed", err);
  }
};
