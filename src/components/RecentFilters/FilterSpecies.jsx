import React, {useRef, useState, useEffect, useContext} from "react";
import {RecentContext} from "../../contexts/RecentContext.jsx";
import {LanguageContext} from "../../contexts/LanguageContext.jsx";
import "./FilterSpecies.css";
import {BACKEND_URL} from "../../config";

export default function FilterTimeSpan() {
  const {data, setData, onlyNotable, setOnlyNotable, speciesList, location, distance, timeSpan} = useContext(RecentContext);
  const {language} = useContext(LanguageContext);

  function getData(speciesCode) {
    const endpoint = onlyNotable ? "/ebirdData/oneNotable" : "/ebirdData/one";
    const fetchParams = `?speciesCode=${speciesCode}&lat=${location.lat}&lng=${location.lon}&dist=${distance}&back=${timeSpan}&sppLocale=${language.code}`;
    // setLoading(true);
    async function getSpeciesData() {
      try {
        const response = await fetch(`${BACKEND_URL}${endpoint}${fetchParams}`, {
          method: "GET",
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.log(error);
      } finally {
        // setLoading(!loading);
      }
    }
    getSpeciesData();
  }

  return (
    <div className="filter filter-species-container">
      <div className="filter-label">{language.code === "de" ? "Arten:" : "Species:"}</div>
      <div className="filter-notable">
        <div className="filter-notable--item">
          <input type="radio" name="onlyNotableRadio" id="onlyNotable-all" value="" checked={onlyNotable === ""} onChange={(ev) => setOnlyNotable(ev.target.value)} />
          <span className="custom-radio"></span>
          <label htmlFor="onlyNotable-all">{language.code === "de" ? "alle" : "all"}</label>
        </div>
        <div className="filter-notable--item">
          <input type="radio" name="onlyNotableRadio" id="onlyNotable-notable" value="/notable" checked={onlyNotable === "/notable"} onChange={(ev) => setOnlyNotable(ev.target.value)} />
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
                <li key={index} className="species-list-item" onClick={() => getData(spec.speciesCode)}>
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
