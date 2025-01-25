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
      .then((data) => console.log(data));
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
          <div>
            {/* <img src={countries[0]["flag"]} alt="" /> */}
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
              officia nisi odio ipsa assumenda ad maiores possimus tempora a
              fugiat?
            </div>
          </div>
          <div>Hello World</div>
          <div>Hello World</div>
          <div>Hello World</div>
        </div>
      </main>
    </>
  );
}
