import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  maps: [],
  tags: [],
  meta: {
    search: "",
    selectedTags: [],
    limit: 15,
    page: 1,
    totalMaps: 0,
    totalPages: 0,
  },
  loading: false,
};

const authSlice = createSlice({
  name: "maps",
  initialState,
  reducers: {
    setSearchMeta: (state, action) => {
      state.meta = action.payload;
    },
    setMaps: (state, action) => {
      state.maps = action.payload;
    },
    setMapsLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
export const { setSearchMeta, setMaps, setMapsLoading } = authSlice.actions;

export default authSlice.reducer;
