import React, {useEffect, useContext} from "react";
import {RecentContext} from "../../contexts/RecentContext.jsx";
import "./RecentResults.css";
import ResultItem from "./ResultItem.jsx";
import {LanguageContext} from "../../contexts/LanguageContext.jsx";

export default function RecentResults() {
  const {data, location, distance, timespan, selectedSpecies, getSpeciesData, speciesList} = useContext(RecentContext);
  const {language} = useContext(LanguageContext);
  useEffect(() => {
    if (location && selectedSpecies) {
      getSpeciesData(language);
    }
  }, [selectedSpecies, location, distance, timespan, speciesList]);
  return (
    <div className="recent-results-container">
      <div className="results-header">
        <span className="results-header--species comname">
          {Object.keys(selectedSpecies).length > 0 ? <>{selectedSpecies.comName}</> : language.code === "de" ? "keine Art gewählt" : "No species selected"}
        </span>
        <span className="results-header--species sciname">{Object.keys(selectedSpecies).length > 0 && <>{selectedSpecies.sciName}</>}</span>
        <span className="results-header--results">
          {language.code === "de" ? "Beobachtungen:" : "Observations:"} {data.length}
        </span>
      </div>
      <div className="results-inner">
        {data.length > 0 ? (
          <ul>
            {data.map((item, index) => {
              return <ResultItem key={index} item={item} className={"result-item-list"} />;
            })}
          </ul>
        ) : (
          <div className="error-message">
            {Object.keys(selectedSpecies).length > 0
              ? language.code === "de"
                ? "Leider keine Beobachtungen für deinen Standort mit diesen Einstellungen."
                : "Sorry, no recent observations for your location and settings."
              : language.code === "de"
              ? "Wähle eine Art."
              : "Choose a species from the list."}
          </div>
        )}
      </div>
    </div>
  );
}
