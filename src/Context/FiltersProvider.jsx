import React, { createContext, useContext, useState, useEffect } from "react";

const FiltersContext = createContext();

export function FiltersProvider({ children }) {
  const [search, setSearch] = useState(localStorage.getItem("search") || "");
  const [regionFilter, setRegionFilter] = useState(
    localStorage.getItem("regionFilter") || ""
  );
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        applyFilters(data, search, regionFilter);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (countries.length > 0) {
      applyFilters(countries, search, regionFilter);
    }
    localStorage.setItem("search", search);
    localStorage.setItem("regionFilter", regionFilter);
  }, [search, regionFilter, countries]);

  function applyFilters(data, searchTerm, region) {
    if (!Array.isArray(data)) return;
    let filtered = [...data];

    if (region) {
      filtered = filtered.filter((country) => country.region === region);
    }

    if (searchTerm) {
      filtered = filtered.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCountries(filtered);
  }

  return (
    <FiltersContext.Provider
      value={{
        search,
        setSearch,
        regionFilter,
        setRegionFilter,
        filteredCountries,
        countries,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}

export function useFilters() {
  return useContext(FiltersContext);
}
