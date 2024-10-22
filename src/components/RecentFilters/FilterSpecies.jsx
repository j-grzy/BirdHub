import React, {useContext} from "react";
import {RecentContext} from "../../contexts/RecentContext.jsx";
import {LanguageContext} from "../../contexts/LanguageContext.jsx";
import "./FilterSpecies.css";

export default function FilterTimeSpan() {
  const {onlyNotable, setOnlyNotable, speciesList, location, selectedSpecies, setSelectedSpecies} = useContext(RecentContext);
  const {language} = useContext(LanguageContext);

  function handleChange(ev) {
    setOnlyNotable(ev.target.value);
    // const empty = {};
    // setSelectedSpecies((prev) => empty);
  }

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
          {/* add explanantion here */}
        </div>
      </div>

      <div className="filter-species">
        {speciesList.length > 0 ? (
          <ul className="species-list">
            {speciesList.map((spec, index) => {
              return (
                <li key={index} className={"species-list-item " + (spec.speciesCode === selectedSpecies.speciesCode ? "selected" : "")} onClick={() => setSelectedSpecies(spec)}>
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
        )}
      </div>
    </div>
  );
}
