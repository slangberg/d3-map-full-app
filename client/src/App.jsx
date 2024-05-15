import "./App.css";
import "animate.css";
import EditorMap from "./pages/EditorMap/EditorMap";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp/SignUp";
import Profile from "./pages/Profile/Profile";
import MapList from "./pages/MapList/MapList";
import { MapAPIProvider } from "./components/MapContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProtectedRoute from "./components/ProtectedRoute";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/bayon";
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
            <Route
              path="/editor/:mapID"
              element={
                <ProtectedRoute>
                  <EditorMap />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/list"
              element={
                <ProtectedRoute>
                  <MapList />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate replace to="/login" />} />
          </Routes>
        </MapAPIProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
