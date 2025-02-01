import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  HashRouter,
} from "react-router";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import { ThemeProvider } from "./Context/ThemeProvider.jsx";
import Details from "./pages/Details.jsx";
import { FiltersProvider } from "./Context/FiltersProvider.jsx";

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <StrictMode>
      <ThemeProvider>
        <FiltersProvider>
          <Navbar />
          <Routes>
            <Route index path="/" element={<Navigate to={"/home"} replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/country/:name" element={<Details />} />
          </Routes>
        </FiltersProvider>
      </ThemeProvider>
    </StrictMode>
  </HashRouter>
);
