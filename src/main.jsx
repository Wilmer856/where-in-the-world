import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import { ThemeProvider } from "./Context/ThemeProvider.jsx";
import Details from "./pages/Details.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <ThemeProvider>
        <Navbar />
        <Routes>
          <Route path="Home" element={<Home />} />
          <Route path="country">
            <Route path=":details" element={<Details />}/>
          </Route>
        </Routes>
      </ThemeProvider>
    </StrictMode>
  </BrowserRouter>
);
