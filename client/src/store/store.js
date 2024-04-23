import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";

export const store = configureStore({
  devTools: true,
  reducer: {
    auth: authReducer,
  },
});
