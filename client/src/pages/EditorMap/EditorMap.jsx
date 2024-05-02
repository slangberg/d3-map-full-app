import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMap } from "../../store/actions";
import { getActiveMap } from "../../store/selectors";
export default function EditorMapPage() {
  const dispatch = useDispatch();
  const activeMap = useSelector(getActiveMap);
  const { mapID } = useParams();
  useEffect(() => {
    if (!activeMap) {
      dispatch(getMap(mapID));
    }
  }, [activeMap]);

  console.log(activeMap);
  return <Container component="main">Test</Container>;
}
