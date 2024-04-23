import "./App.css";
import DisplayMap from "./pages/DisplayMap/display-map";
import EditorMap from "./pages/EditorMap/editor-map";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp/SignUp";
import { MapAPIProvider } from "./map-context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/display" element={<DisplayMap />} />
            <Route path="/editor" element={<EditorMap />} />
          </Routes>
        </MapAPIProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
