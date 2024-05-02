import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import mapsReducer from "./features/mapSlice";
import globalReducer from "./features/globalSlice";
export const store = configureStore({
  devTools: true,
  reducer: {
    auth: authReducer,
    maps: mapsReducer,
    global: globalReducer,
  },
});
