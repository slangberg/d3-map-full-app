import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../store/actions";
// import { getAuthUser } from "../store/selectors";
import Button from "@mui/material/Button";
import { useMapAPI, useMapAPIEvent } from "../../components/MapContext";

export default function EditorToolbar({ openNewMarker }) {
  const { api } = useMapAPI();
  useMapAPIEvent("onSvgClick", (e) => console.log("react event", e));
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => api.addMarker()}
        >
          Add Marker
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => openNewMarker()}
        >
          Add New Marker Type
        </Button>
      </Toolbar>
    </AppBar>
  );
}
