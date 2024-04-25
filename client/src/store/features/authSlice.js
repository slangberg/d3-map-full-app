import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  user: null,
  error: null,
  success: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.error = null;
      state.loggedIn = true;
    },
    setAuthError: (state, action) => {
      state.error = action.payload;
    },
    setRegisterSuccess: (state, action) => {
      state.success = action.payload;
      state.error = null;
    },
    clearLoginError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.user = null;
      state.error = null;
    },
  },
});
export const {
  login,
  setAuthError,
  logout,
  clearLoginError,
  setRegisterSuccess,
} = authSlice.actions;

export default authSlice.reducer;
