import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../Context/ThemeProvider";
import { Link } from "react-router";

export default function () {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [countries, setCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [dropdownActive, setDropdownActive] = useState(false);

  useEffect(() => {
    fetch("../../data.json")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
      });
  }, []);

  useEffect(() => {
    if (countries) {
      let filtered = countries;

      // Apply region filter
      if (regionFilter) {
        filtered = filtered.filter(
          (country) => country.region === regionFilter
        );
      }

      // Apply search filter
      if (search) {
        filtered = filtered.filter((country) =>
          country.name.toLowerCase().startsWith(search.toLowerCase())
        );
      }

      setFilteredCountries(filtered);
    }
  }, [search, regionFilter, countries]);

  const handleRegionClick = (region) => {
    setRegionFilter(region);
    setDropdownActive(false);
  };

  const toggleDropdown = () => {
    setDropdownActive((prev) => !prev);
  };



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
            onClick={(e) => setDropdownActive(!dropdownActive)}
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
                      <li
                        key={region}
                        onClick={() => handleRegionClick(region)}
                      >
                        {region}
                      </li>
                    )
                  )}
                  <li onClick={() => handleRegionClick("")}>All Regions</li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="grid country-items">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country, index) => (
              <Link to={`../country/${country.name}`} state={[country, countries]} style={{ textDecoration: 'none' }}>
                <div
                  key={index}
                  className={`flex country-item ${
                    isDarkMode ? "dark-item-bg" : "light-item-bg"
                  }`}
                >
                  <img src={country.flag} alt={`${country.name} flag`} />
                  <div className={`${isDarkMode ? "dark-text" : "light-text"}`}>
                    <h2>{country.name}</h2>
                    <p><span>Population: </span>{country.population.toLocaleString()}</p>
                    <p><span>Region: </span>{country.region}</p>
                    <p><span>Capital: </span>{country.capital}</p>
                  </div>
                </div>
              </Link>
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
