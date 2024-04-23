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

export const logout = () => async (dispatch, getState) => {
  const {
    auth: { user },
  } = getState();

  try {
    await axiosInstance.post("/auth/logout", { userId: user.id });
    localStorage.removeItem("authToken");
    dispatch(logoutAction(user));
  } catch (err) {
    // Optionally handle errors specific to the logout process
    console.error("Logout failed", err);
  }
};
