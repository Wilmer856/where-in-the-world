import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

// TODO fetch the countries and place data in cards
export default function () {
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    fetch("../../data.json")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);
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
            />
          </div>
          <div className="filter-dropdown flex">
            <span>Filter by Region</span>
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
        </div>
        <div className="grid country-items">
          {countries ? (
            countries.map((country, index) => (
              <div key={index} className="flex country-item">
                <img src={country.flag} alt={`${country.name} flag`} />
                <div className="">
                  <h2>{country.name}</h2>
                  <p>Population: {country.population}</p>
                  <p>Region: {country.region}</p>
                  <p>Capital: {country.capital}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Loading countries...</p>
          )}
        </div>
      </main>
    </>
  );
}
