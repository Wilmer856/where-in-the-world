import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import { ThemeProvider } from "./Context/ThemeProvider.jsx";
import Details from "./pages/Details.jsx";
import { FiltersProvider } from "./Context/FiltersProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <ThemeProvider>
        <FiltersProvider>
          <Navbar />
          <Routes>
            <Route path="Home" element={<Home />} />
            <Route path="country">
              <Route path=":details" element={<Details />}/>
            </Route>
          </Routes>
        </FiltersProvider>
      </ThemeProvider>
    </StrictMode>
  </BrowserRouter>
);
