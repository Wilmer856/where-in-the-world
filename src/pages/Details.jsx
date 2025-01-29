import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { ThemeContext } from '../Context/ThemeProvider'

export default function Details() {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext)
    const location = useLocation()
    const country = location.state[0] || {}
    const countries = location.state[1] || []


    if(!country) {
        return <p>No country data found.</p>
    }

    const getBorders = (country) => {
        let filtered = countries.filter((con) => country.borders.includes(con["alpha3Code"])).map((con) => con.name)
        return filtered
      }

  return (
    <main className={`details-page ${
        isDarkMode ? "dark-bg" : "light-bg"
      }`}>
        <div className="back-btn-container">
            <Link to="../../Home" style={{textDecoration: 'none'}}>
                <button className="back-btn">
                    <FontAwesomeIcon icon={faArrowLeft}/>
                    <span>Back</span>
                </button>
            </Link>
        </div>
        <div className="grid details-container">
            <div>
                <img src={country.flag} alt={country.name} />
            </div>
            <div className="grid details-info">
                <div className="">
                    <h1>{country.name}</h1>
                    <div className="flex details-list">
                        <ul>
                            <li><span>Native Name: </span>{country.nativeName}</li>
                            <li><span>Population: </span>{country.population}</li>
                            <li><span>Region: </span>{country.region}</li>
                            <li><span>Sub Region: </span>{country.subregion}</li>
                            <li><span>Capital: </span>{country.capital}</li>
                        </ul>
                        <ul>
                            <li><span>Top Level Domain: </span>{country.topLevelDomain[0]}</li>
                            <li><span>Currencies: </span>{country.currencies.map((curr) => curr.name).join(", ")}</li>
                            <li><span>Languages: </span>{country.languages.map((lang) => lang.name).join(", ")}</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <span>Border Countries: {getBorders(country).map((con) => <div>{con}</div>)}</span>
                </div>
            </div>
        </div>
    </main>
  )
}
