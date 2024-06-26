// Global Actions
import {
  setGlobalSuccess,
  setGlobalError,
  clearGlobalMessage,
} from "../features/globalSlice";
// Auth Actions
import { login, logout } from "./auth.actions";
// User Actions
import { deleteAccount, register, updateProfile } from "./user.actions";
// Map Actions
import {
  setSearchMeta,
  setMapsData,
  setMapsLoading,
  setMapsMessage,
  setSearchString,
  setSearchSort,
  setSearchPage,
  setActiveMap,
  setMapLoading,
} from "../features/mapSlice";
import { getList, createMap, deleteMap, getMap } from "./maps.actions";

import {
  clearAuthError,
  setAuthError,
  login as loginAction,
  clearAuthBanner,
} from "../features/authSlice";

export {
  setGlobalSuccess,
  setGlobalError,
  clearGlobalMessage,
  login,
  logout,
  clearAuthError,
  register,
  setAuthError,
  updateProfile,
  deleteAccount,
  loginAction,
  clearAuthBanner,
  setSearchMeta,
  setMapsData,
  setMapsLoading,
  getList,
  createMap,
  setMapsMessage,
  deleteMap,
  setSearchString,
  setSearchSort,
  setSearchPage,
  setActiveMap,
  getMap,
  setMapLoading,
};
