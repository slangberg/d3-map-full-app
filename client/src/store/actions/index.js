// Auth Actions
import { login, logout } from "./auth.actions";
// User Actions
import { deleteAccount, register, updateProfile } from "./user.actions";
// Map Actions
import {
  setSearchMeta,
  setMaps,
  setMapsLoading,
  setMapsMessage,
} from "../features/mapSlice";
import { getList, createMap, deleteMap } from "./maps.actions";

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
  deleteMap,
};
