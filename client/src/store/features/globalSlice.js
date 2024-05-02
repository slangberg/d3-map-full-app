import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: null,
  error: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setGlobalSuccess: (state, action) => {
      state.success = action.payload;
      state.error = null;
    },
    setGlobalError: (state, action) => {
      state.error = action.payload;
      state.success = null;
    },
    clearGlobalMessage: (state) => {
      state.success = null;
      state.error = null;
    },
  },
});
export const { setGlobalSuccess, setGlobalError, clearGlobalMessage } =
  globalSlice.actions;

export default globalSlice.reducer;
