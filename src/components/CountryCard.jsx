import React from "react";
import { Link } from "react-router";

export default function CountryCard({ country, countries, isDarkMode }) {
  return (
    <Link
      to={`/country/${country.name}`}
      state={[country, countries]}
      style={{ textDecoration: "none" }}
    >
      <div
        className={`flex country-item ${
          isDarkMode ? "dark-item-bg" : "light-item-bg"
        }`}
      >
        <img src={country.flag} alt={`${country.name} flag`} />
        <div className={`${isDarkMode ? "dark-text" : "light-text"}`}>
          <h2>{country.name}</h2>
          <p>
            <span>Population: </span>
            {country.population.toLocaleString()}
          </p>
          <p>
            <span>Region: </span>
            {country.region}
          </p>
          <p>
            <span>Capital: </span>
            {country.capital}
          </p>
        </div>
      </div>
    </Link>
  );
}
