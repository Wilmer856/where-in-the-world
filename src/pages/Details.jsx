import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../Context/ThemeProvider";
import { useFilters } from "../Context/FiltersProvider";

export default function Details() {
  const { isDarkMode } = useContext(ThemeContext);
  const { countries } = useFilters();
  const { name } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    findCountry(name);
  }, [name, countries]);

  const findCountry = (countryName) => {
    const found = countries.find(
      (c) => c.name.toLowerCase() === countryName.toLowerCase()
    );
    if (found) {
      setCountry(found);
    } else {
      setCountry("not-found");
    }
  };

  const getBorders = (country) => {
    let filtered = countries
      .filter((con) => country.borders.includes(con["alpha3Code"]))
      .map((con) => con.name);
    return filtered;
  };

  if (country === "not-found") {
    return (
      <main
        className={`details-page ${
          isDarkMode ? "dark-bg dark-text" : "light-bg light-text"
        }`}
      >
        <div className="back-btn-container">
          <Link to="/home" style={{ textDecoration: "none" }}>
            <button
              className={`back-btn shadow-btn ${
                isDarkMode
                  ? "dark-item-bg dark-text"
                  : "light-item-bg light-text"
              }`}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>Back</span>
            </button>
          </Link>
        </div>
        <h1 className="not-found-message">Country not found.</h1>
      </main>
    );
  }

  if (!country) {
    return <p>Loading country details...</p>;
  }

  return (
    <main
      className={`details-page ${
        isDarkMode ? "dark-bg dark-text" : "light-bg light-text"
      }`}
    >
      <div className="back-btn-container">
        <Link to="../../home" style={{ textDecoration: "none" }}>
          <button
            className={`back-btn shadow-btn ${
              isDarkMode ? "dark-item-bg dark-text" : "light-item-bg light-text"
            }`}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Back</span>
          </button>
        </Link>
      </div>
      <div className="grid details-container">
        <div>
          <img src={country.flag} alt={country.name} />
        </div>
        <div className="grid details-info">
          <div>
            <h1 className="country-data-heading">{country.name}</h1>
            <div className="flex details-list">
              <ul>
                <li>
                  <span>Native Name: </span>
                  {country.nativeName}
                </li>
                <li>
                  <span>Population: </span>
                  {country.population.toLocaleString()}
                </li>
                <li>
                  <span>Region: </span>
                  {country.region}
                </li>
                <li>
                  <span>Sub Region: </span>
                  {country.subregion}
                </li>
                <li>
                  <span>Capital: </span>
                  {country.capital || "N/A"}
                </li>
              </ul>
              <ul>
                <li>
                  <span>Top Level Domain: </span>
                  {country.topLevelDomain[0]}
                </li>
                <li>
                  <span>Currencies: </span>
                  {country.hasOwnProperty("currencies") ? country.currencies[0].name : "N/A"}
                </li>
                <li>
                  <span>Languages: </span>
                  {country.languages.map((lang) => lang.name).join(", ")}
                </li>
              </ul>
            </div>
          </div>
          {country.hasOwnProperty("borders") && (
            <div className="border-container">
              <span className="list-data-heading">Border Countries: </span>
              <div className="border-list flex">
                {getBorders(country).map((con, i) => (
                  <div key={i} className="shadow-btn">
                    <Link
                      to={`../country/${con}`}
                      state={[country, countries]}
                      style={{ textDecoration: "none" }}
                      className={`${isDarkMode ? "dark-text" : "light-text"}`}
                    >
                      {con}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
