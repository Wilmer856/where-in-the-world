import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Navbar() {
  return (
    <nav className="flex navbar">
      <h1>Where in the wold?</h1>
      <button className="color-mode-btn">
        <FontAwesomeIcon icon={faMoon} /> Dark Mode
      </button>
    </nav>
  );
}
