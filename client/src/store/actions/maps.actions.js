import axiosInstance from "../../utils/axios";
import { setMapsData, setMapsLoading, setMapsMessage, setGlobalError } from ".";
export const getList = () => async (dispatch, getState) => {
  const { searchMeta } = getState().maps;
  dispatch(setMapsLoading(true));
  try {
    const { data } = await axiosInstance.get("/maps/list", {
      params: searchMeta,
    });
    dispatch(setMapsData(data));
  } catch (err) {
    dispatch(setGlobalError("Error Fetching maps"));
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
    dispatch(
      setGlobalError(
        err?.data?.error || "An unexpected error occurred when creating map"
      )
    );
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
    dispatch(
      setGlobalError(
        err?.data?.error || "An unexpected error occurred when deleting map"
      )
    );
  }
};
