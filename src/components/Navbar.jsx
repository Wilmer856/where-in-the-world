import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { ThemeContext } from "../Context/ThemeProvider";

export default function Navbar() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <nav
      className={`flex navbar ${isDarkMode ? "dark-item-bg dark-text" : ""}`}
    >
      <h1>Where in the wold?</h1>
      <button
        className={`color-mode-btn ${isDarkMode ? "dark-text" : ""}`}
        onClick={toggleTheme}
      >
        <FontAwesomeIcon icon={faMoon} />
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
}
