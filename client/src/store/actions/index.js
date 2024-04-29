// Auth Actions
import { login, logout } from "./auth";
// User Actions
import { deleteAccount, register, updateProfile } from "./user";
// Map Actions
import {
  setSearchMeta,
  setMaps,
  setMapsLoading,
  setMapsMessage,
} from "../features/mapSlice";
import { getList, createMap } from "./maps";

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
  getList,
  createMap,
  setMapsMessage,
};
