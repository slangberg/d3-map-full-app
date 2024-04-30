import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  maps: [],
  tags: [],
  searchMeta: {
    search: "",
    selectedTags: [],
    page: 1,
  },
  mapsMeta: {
    totalMaps: 0,
    totalPages: 0,
  },
  mapsMessage: null,
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
      // state.loading = false;
    },
    setMapsMessage: (state, action) => {
      state.mapsMessage = action.payload;
    },
    setMapsLoading: (state, action) => {
      state.mapsMessage = null;
      state.loading = action.payload;
    },
  },
});
export const { setSearchMeta, setMaps, setMapsLoading, setMapsMessage } =
  authSlice.actions;

export default authSlice.reducer;
