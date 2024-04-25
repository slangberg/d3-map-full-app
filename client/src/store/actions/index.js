// Auth Actions
import { login, logout } from "./auth";
// User Actions
import { deleteAccount, register, updateProfile } from "./user";
import {
  clearLoginError,
  setAuthError,
  login as loginAction,
} from "../features/authSlice";

export {
  login,
  logout,
  clearLoginError,
  register,
  setAuthError,
  updateProfile,
  deleteAccount,
  loginAction,
};
