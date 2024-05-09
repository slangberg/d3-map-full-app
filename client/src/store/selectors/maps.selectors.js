import { createSelector } from "@reduxjs/toolkit";

export const getMaps = (state) => state.maps.maps;

export const getPageCount = (state) => state.maps.mapsMeta.totalPages;

export const getMapSearchMeta = (state) => state.maps.searchMeta;

export const getActiveMap = (state) => state.maps.activeMap;

export const getActiveMapLoading = (state) => state.maps.loading;

export const memoMap = createSelector(
  [getActiveMapLoading, getActiveMap],
  (loading, activeMap) => {
    if (!loading) {
      return activeMap;
    }
    return null;
  }
);

const getTotalPages = (state) => state.maps.mapsMeta.totalPages;
const getCurrentPage = (state) => state.maps.searchMeta.page;
export const getPaginationButtons = createSelector(
  [getTotalPages, getCurrentPage],
  (totalPages, currentPage) => {
    let pageArray = [];
    for (let i = 1; i <= totalPages; i++) {
      pageArray.push({
        label: i,
        current: i === currentPage,
      });
    }
    return pageArray;
  }
);
