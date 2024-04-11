import "./App.css";
import DisplayMap from "./display-map/display-map";
import EditorMap from "./editor-map/editor-map";
import { MapAPIProvider } from "./map-context";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

let router = createBrowserRouter([
  {
    path: "/",
    element: <DisplayMap />,
  },
  {
    path: "/editor",
    element: <EditorMap />,
  },
]);

function App() {
  return (
    <div>
      <MapAPIProvider>
        <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
      </MapAPIProvider>
    </div>
  );
}

export default App;
