import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <Navbar />
      <Routes>
        <Route path="Home" element={<Home />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>
);
