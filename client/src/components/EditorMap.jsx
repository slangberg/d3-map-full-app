import { useEffect, useRef } from "react";
import ImageMapEditor from "../../image-map/editor/ImageMapEditor";
import mapUrl from "../../image-map/map.jpeg";
import pinUrl from "../../image-map/marker-2.svg";
import markerUrl from "../../image-map/marker.svg";
import markersData from "../../starter-data.json";
import { useMapAPI } from "../../map-context";
const imageData = {
  width: 1454,
  height: 1122,
  path: mapUrl,
};

const assets = {
  base: {
    url: pinUrl,
    id: "base",
    width: 60,
    height: 60,
    offset: [-31, -55],
    toolTipOffset: [0, 0],
  },
  side: {
    url: markerUrl,
    id: "side",
    width: 200,
    height: 200,
  },
};

export default function EditorMap() {
  const map = useRef();
  const { setAPI } = useMapAPI();
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
