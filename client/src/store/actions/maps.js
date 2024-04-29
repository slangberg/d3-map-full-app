import axiosInstance from "../../utils/axios";
import { setMaps, setMapsLoading, setMapsMessage } from "../actions";
export const getList = () => async (dispatch, getState) => {
  const { meta } = getState().maps;
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
  const formData = new FormData();
  formData.append("file", mapData.file[0]);
  formData.append("title", mapData.title);
  formData.append("description", mapData.description);
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
