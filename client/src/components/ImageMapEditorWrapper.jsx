import { useEffect, useRef } from "react";
import ImageMapEditor from "../image-map/editor/ImageMapEditor";
import pinUrl from "../image-map/marker-2.svg";
import defaultMarker from "../image-map/marker-default.svg";
import markerUrl from "../image-map/marker.svg";
import markersData from "../starter-data.json";
import { useMapAPI } from "./MapContext";

const assets = {
  base: {
    url: pinUrl,
    id: "base",
    width: 60,
    height: 60,
    offset: [0, -0.3143],
    toolTipOffset: [0, 0],
  },
  test: {
    url: defaultMarker,
    id: "defaultMarker",
    width: 40,
    height: 40,
    offset: [0, -9],
    toolTipOffset: [0, 0],
  },
  side: {
    url: markerUrl,
    id: "side",
    width: 200,
    height: 200,
  },
};

export default function EditorMap({ baseImage }) {
  const map = useRef();
  const { setAPI } = useMapAPI();

  const imageData = {
    width: baseImage.width,
    height: baseImage.height,
    path: baseImage.url,
  };
  useEffect(() => {
    if (!map.current) {
      map.current = new ImageMapEditor({
        containerId: "map",
        imageData,
        markersData,
        spacesData: [],
        assets,
        editMode: true,
      });
      setAPI(map.current.getEventApi());
    }
  }, []);

  return <svg id="map" />;
}
