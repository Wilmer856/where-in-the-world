import React, { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../Context/ThemeProvider";
import { useFilters } from "../Context/FiltersProvider";
import CountryCard from "../components/CountryCard";

export default function () {
  const { isDarkMode } = useContext(ThemeContext);
  const {
    search,
    setSearch,
    regionFilter,
    setRegionFilter,
    filteredCountries,
    countries,
  } = useFilters();
  const [dropdownActive, setDropdownActive] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownActive(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <main
        className={`main-background home ${
          isDarkMode ? "dark-bg" : "light-bg"
        }`}
      >
        <div className="flex filter-box">
          <div
            className={`filter-search flex ${
              isDarkMode ? "dark-item-bg dark-text" : "light-item-bg light-text"
            }`}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input
              className={`${isDarkMode ? "dark-text" : "light-text"}`}
              type="text"
              placeholder="Search for a country..."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
            />
          </div>
          <div
            className={`filter-dropdown flex ${
              isDarkMode ? "dark-item-bg dark-text" : "light-item-bg light-text"
            }`}
            onClick={() => setDropdownActive((prev) => !prev)}
            ref={dropdownRef}
          >
            <span>Filter by Region</span>
            <FontAwesomeIcon icon={faAngleDown} />
            {dropdownActive && (
              <div
                className={`filter-dropdown-box active ${
                  isDarkMode
                    ? "dark-item-bg dark-text"
                    : "light-item-bg light-text"
                }`}
              >
                <ul>
                  {["Africa", "Americas", "Asia", "Europe", "Oceania"].map(
                    (region) => (
                      <li key={region} onClick={() => setRegionFilter(region)}>
                        {region}
                      </li>
                    )
                  )}
                  <li onClick={() => setRegionFilter("")}>All Regions</li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="grid country-items">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country, index) => (
              <CountryCard
                key={index}
                country={country}
                countries={countries}
                isDarkMode={isDarkMode}
              />
            ))
          ) : (
            <p className={`${isDarkMode ? "dark-text" : "light-text"}`}>
              No countries match your search.
            </p>
          )}
        </div>
      </main>
    </>
  );
}
