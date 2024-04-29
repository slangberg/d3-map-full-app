import axiosInstance from "../../utils/axios";
import { setAuthError, setRegisterSuccess } from "../features/authSlice";
import { logout as logoutAction } from "../features/authSlice";
import { redirect } from "react-router-dom";
export const deleteAccount = () => async (dispatch) => {
  try {
    const response = await axiosInstance.delete("/users/delete", {});
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    await dispatch(logoutAction());
    dispatch(setRegisterSuccess(response.data.message));
    redirect("/login");
  } catch (err) {
    dispatch(setAuthError(err?.data?.error || "An unexpected error occurred"));
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    dispatch(setRegisterSuccess(response.data.message));
  } catch (err) {
    dispatch(setAuthError(err?.data?.error || "An unexpected error occurred"));
  }
};

export const updateProfile = (userData) => async (dispatch) => {
  try {
    const response = await axiosInstance.put("/users/update", userData);
    dispatch(setRegisterSuccess(response.data.message));
  } catch (err) {
    dispatch(setAuthError(err?.data?.error || "An unexpected error occurred"));
  }
};
