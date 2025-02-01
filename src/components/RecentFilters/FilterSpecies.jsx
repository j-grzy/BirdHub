import React, {useContext, useEffect, useState} from "react";
import {RecentContext} from "../../contexts/RecentContext.jsx";
import {LanguageContext} from "../../contexts/LanguageContext.jsx";
import "./FilterSpecies.css";
import Loader from "../Loader/Loader.jsx";

export default function FilterSpecies() {
  const {onlyNotable, setOnlyNotable, speciesList, location, selectedSpecies, setSelectedSpecies, distance, timeSpan, getSpeciesList} = useContext(RecentContext);
  const {language} = useContext(LanguageContext);
  const [loading, setLoading] = useState(false);

  const [currentSpecies, setCurrentSpecies] = useState(null);

  function handleChange(ev) {
    setOnlyNotable(ev.target.value);
  }

  useEffect(() => {
    if (location) {
      getSpeciesList(language, setLoading);
    }
  }, [location, distance, onlyNotable, timeSpan, language]);

  useEffect(() => {
    if (speciesList && currentSpecies) {
      setSelectedSpecies(speciesList.find((item) => item.speciesCode === currentSpecies));
    }
  }, [speciesList]);

  return (
    <div className="filter filter-species-container">
      <div className="filter-label">{language.code === "de" ? "Arten:" : "Species:"}</div>
      <div className="filter-notable">
        <div className="filter-notable--item">
          <input type="radio" name="onlyNotableRadio" id="onlyNotable-all" value="" checked={onlyNotable === ""} onChange={(ev) => handleChange(ev)} />
          <span className="custom-radio"></span>
          <label htmlFor="onlyNotable-all">{language.code === "de" ? "alle" : "all"}</label>
        </div>
        <div className="filter-notable--item">
          <input type="radio" name="onlyNotableRadio" id="onlyNotable-notable" value="/notable" checked={onlyNotable === "/notable"} onChange={(ev) => handleChange(ev)} />
          <span className="custom-radio"></span>
          <label htmlFor="onlyNotable-notable">{language.code === "de" ? "nur seltene" : "only notable"}</label>
        </div>
      </div>

      <div className="filter-species">
        {!loading ? (
          speciesList.length > 0 ? (
            <ul className="species-list">
              {speciesList.map((spec, index) => {
                return (
                  <li
                    key={index}
                    className={"species-list-item " + (spec.speciesCode === selectedSpecies?.speciesCode ? "selected" : "")}
                    onClick={() => {
                      setSelectedSpecies(spec);
                      setCurrentSpecies(spec.speciesCode);
                    }}>
                    {spec.comName}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="error-message">
              {location
                ? language.code === "de"
                  ? "Leider keine Suchergebnisse für deinen Standort mit diesen Einstellungen."
                  : "Sorry, no search results for your location and settings."
                : language.code === "de"
                ? "Wähle deinen Standort."
                : "Choose your location."}
            </div>
          )
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
