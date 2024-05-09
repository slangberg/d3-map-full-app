import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMap } from "../../store/actions";
import { memoMap } from "../../store/selectors";
import ImageMapEditorWrapper from "../../components/ImageMapEditorWrapper";
import MarkerEditorModal from "./MarkerEditorModal/MarkerEditorModal";
import EditorToolbar from "./EditorToolbar";

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(() => ({ height: "calc(100vh - 64px)" }));

export default function EditorMapPage() {
  const dispatch = useDispatch();
  const activeMap = useSelector(memoMap);
  const { mapID } = useParams();
  const [markerDialogOpen, setMarkerDialogOpen] = useState(false);
  useEffect(() => {
    if ((!activeMap && mapID) || (activeMap && activeMap._id !== mapID)) {
      dispatch(getMap(mapID));
    }
  }, [mapID, activeMap]);
  return (
    <>
      <Main>
        <MarkerEditorModal
          open={markerDialogOpen}
          onClose={() => setMarkerDialogOpen(false)}
        />
        <EditorToolbar openNewMarker={() => setMarkerDialogOpen(true)} />
        {activeMap && <ImageMapEditorWrapper baseImage={activeMap.baseImage} />}
      </Main>
    </>
  );
}
