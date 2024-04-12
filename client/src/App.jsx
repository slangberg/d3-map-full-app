import "./App.css";
import DisplayMap from "./display-map/display-map";
import EditorMap from "./editor-map/editor-map";
import { MapAPIProvider } from "./map-context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const defaultTheme = createTheme();

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <MapAPIProvider>
          <Routes>
            <Route path="/" element={<DisplayMap />} />
            <Route path="/editor" element={<EditorMap />} />
          </Routes>
        </MapAPIProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
