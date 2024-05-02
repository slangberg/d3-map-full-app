import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  maps: [],
  tags: [],
  searchMeta: {
    search: "",
    tags: [],
    page: 1,
    sort: -1,
  },
  mapsMeta: {
    totalMaps: 0,
    totalPages: 0,
  },
  mapsMessage: null,
  loading: false,
  loaded: false,
  activeMap: null,
};

const authSlice = createSlice({
  name: "maps",
  initialState,
  reducers: {
    setSearchString: (state, action) => {
      state.searchMeta.search = action.payload;
    },
    setActiveMap: (state, action) => {
      state.activeMap = action.payload;
    },
    setSearchSort: (state, action) => {
      state.searchMeta.search = Number(action.payload);
    },
    setSearchPage: (state, action) => {
      state.searchMeta.page = Number(action.payload);
    },
    setMapsData: (state, action) => {
      state.maps = action.payload.maps;
      state.mapsMeta = action.payload.metaData;
      state.tags = action.payload.allTags;
      state.loading = false;
      state.loaded = true;
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
export const {
  setSearchMeta,
  setMapsData,
  setMapsLoading,
  setMapsMessage,
  setSearchString,
  setSearchSort,
  setSearchPage,
  setActiveMap,
} = authSlice.actions;

export default authSlice.reducer;
