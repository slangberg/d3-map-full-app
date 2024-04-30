import axiosInstance from "../../utils/axios";
import { setMaps, setMapsLoading, setMapsMessage } from ".";
import { redirect } from "react-router-dom";
export const getList = () => async (dispatch, getState) => {
  // const { meta } = getState().maps;
  // dispatch(setMapsLoading(true));
  try {
    const response = await axiosInstance.get("/maps/list", {
      params: {},
    });
    dispatch(setMaps(response.data.maps));
  } catch (err) {
    // dispatch(setAuthError(err?.data?.error || "An unexpected error occurred"));
  }
};

export const createMap = (mapData) => async (dispatch) => {
  dispatch(setMapsLoading(true));
  try {
    await axiosInstance.post("/maps/create", mapData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(setMapsMessage(`${mapData.title} Created Successfully`));
    dispatch(getList());
  } catch (err) {
    console.error(err);
    // dispatch(setAuthError(err?.data?.error || "An unexpected error occurred"));
  }
};

export const deleteMap = (mapId) => async (dispatch) => {
  try {
    await axiosInstance.delete("/maps/delete", {
      params: {
        mapId,
      },
    });
    dispatch(getList());
  } catch (err) {
    console.error("delete fail", err);
  }
};
