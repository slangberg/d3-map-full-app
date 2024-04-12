import { useEffect, useRef } from "react";
import ImageMapEditor from "../image-map/editor/ImageMapEditor";
import mapUrl from "../image-map/map.jpeg";
import pinUrl from "../image-map/marker-2.svg";
import markerUrl from "../image-map/marker.svg";
import lock from "../image-map/lock.svg";
import unlock from "../image-map/unlock.svg";
import markersData from "../starter-data.json";
import { useMapAPI, useMapAPIEvent } from "../map-context";
import ApplicationHeader from "../components/ApplicationHeader";

function EditorMap() {
  const map = useRef();
  const { api, setAPI, callAPIMethod } = useMapAPI();
  useEffect(() => {
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
      lock: {
        url: lock,
      },
      unlock: {
        url: unlock,
      },
    };

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

  const unsubscribe = useMapAPIEvent("onAddSpace", () =>
    console.log("react event")
  );

  return (
    <div>
      <ApplicationHeader title="Map Editor" />
      <button
        onClick={() =>
          callAPIMethod("zoomToPosition", { x: 100, y: 100, zoomLevel: 3 })
        }
      >
        Pan and Zoom
      </button>
      <button onClick={() => api.centerMap()}>Center</button>
      <button onClick={() => api.zoomToMarker(0)}>Zoom To Marker</button>
      <button onClick={() => api.addSpace("poly")}>Add Space</button>
      <button onClick={() => api.addMarker()}>Add Marker</button>
      <button onClick={() => unsubscribe()}>Remove event</button>
      {/* 
        <button onClick={() => api.showTooltip(4)}>Show Tooltip</button>
        <button onClick={() => api.setData([])}>Set Data</button>
        <button onClick={() => api.setZoomLock(true)}>Lock</button>
        <button onClick={() => api.setZoomLock(false)}>Unlock</button> */}
      <svg id="map"></svg>
    </div>
  );
}

export default EditorMap;
