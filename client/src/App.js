import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "layout/homePage";
import LoginPage from "layout/loginPage";
import ProfilePage from "layout/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
function App() {
  const isAuthenticated = Boolean(useSelector((state) => state.token));
  const theme = useSelector((state) => state.theme);
  const themeSet = useMemo(() => createTheme(themeSettings(theme)), [theme]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={themeSet}>
          <CssBaseline />
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <HomePage /> : <LoginPage />}
            ></Route>
            <Route
              path="/home"
              element={
                isAuthenticated ? <HomePage /> : <Navigate to="/"></Navigate>
              }
            ></Route>
            <Route
              path="/profile/:id"
              element={
                isAuthenticated ? <ProfilePage /> : <Navigate to="/"></Navigate>
              }
            ></Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
