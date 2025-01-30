import React, { useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { ThemeContext } from '../Context/ThemeProvider'

export default function Details() {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext)
    const location = useLocation()
    const country = location.state[0] || {}
    const countries = location.state[1] || []

    useEffect(() => {
        window.scrollTo(0,0)
    }, [location])


    if(!country) {
        return <p>No country data found.</p>
    }

    const getBorders = (country) => {
        let filtered = countries.filter((con) => country.borders.includes(con["alpha3Code"])).map((con) => con.name)
        return filtered
      }

  return (
    <main className={`details-page ${
        isDarkMode ? "dark-bg dark-text" : "light-bg light-text"
      }`}>
        <div className="back-btn-container">
            <Link to="../../Home" style={{textDecoration: 'none'}}>
                <button className={`back-btn shadow-btn ${isDarkMode ? "dark-item-bg dark-text" : "light-item-bg light-text"}`}>
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
                <div>
                    <h1 className="country-data-heading">{country.name}</h1>
                    <div className="flex details-list">
                        <ul>
                            <li><span>Native Name: </span>{country.nativeName}</li>
                            <li><span>Population: </span>{country.population.toLocaleString()}</li>
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
                {country.hasOwnProperty("borders") && 
                <div className="border-container">
                    <span className="list-data-heading">Border Countries: </span>
                    <div className="border-list flex">
                    {getBorders(country).map((con,i) => <div key={i} className="shadow-btn">{con}</div>)}
                    </div>
                </div>
                }
            </div>
        </div>
    </main>
  )
}
