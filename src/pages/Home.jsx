import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

export default function () {
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
    setRegionFilter(region); // Set region filter
    setDropdownActive(false); // Close dropdown
  };

  const toggleDropdown = () => {
    setDropdownActive((prev) => !prev);
  };

  return (
    <>
      <main className="main-background grid home">
        <div className="flex filter-box">
          <div className="filter-search flex">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input
              className=""
              type="text"
              placeholder="Search for a country..."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
            />
          </div>
          <div
            className={"filter-dropdown flex"}
            onClick={(e) => setDropdownActive(!dropdownActive)}
          >
            <span>Filter by Region</span>
            <FontAwesomeIcon icon={faAngleDown} />
            {dropdownActive && (
              <div className="filter-dropdown-box active">
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
              <div key={index} className="flex country-item">
                <img src={country.flag} alt={`${country.name} flag`} />
                <div>
                  <h2>{country.name}</h2>
                  <p>Population: {country.population.toLocaleString()}</p>
                  <p>Region: {country.region}</p>
                  <p>Capital: {country.capital}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No countries match your search.</p>
          )}
        </div>
      </main>
    </>
  );
}
