// Auth Actions
import { login, logout } from "./auth";
// User Actions
import { deleteAccount, register, updateProfile } from "./user";
// Map Actions
import { setSearchMeta, setMaps, setMapsLoading } from "../features/mapSlice";

import {
  clearLoginError,
  setAuthError,
  login as loginAction,
  clearAuthBanner,
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
  clearAuthBanner,
  setSearchMeta,
  setMaps,
  setMapsLoading,
};
