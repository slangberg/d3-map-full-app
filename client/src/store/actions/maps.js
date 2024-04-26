import axiosInstance from "../../utils/axios";
import { setMaps } from "../actions";
export const submitSearch = () => async (dispatch, getState) => {
  const { meta } = getState().maps;
  try {
    const response = await axiosInstance.get("/maps/list", {
      params: meta || {},
    });
    dispatch(setMaps(response.data.maps));
  } catch (err) {
    // dispatch(setAuthError(err?.data?.error || "An unexpected error occurred"));
  }
};
