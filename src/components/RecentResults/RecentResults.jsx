import React, {useEffect, useContext, useState} from "react";
import {RecentContext} from "../../contexts/RecentContext.jsx";
import "./RecentResults.css";
import ResultItem from "./ResultItem.jsx";
import {LanguageContext} from "../../contexts/LanguageContext.jsx";
import ScrollToSelectedListItem from "./ScrollToSelectedListItem";
import Loader from "../Loader/Loader.jsx";

export default function RecentResults() {
  const {data, location, distance, timespan, selectedSpecies, getSpeciesData, selectedResultItem, setSelectedResultItem} = useContext(RecentContext);
  const {language} = useContext(LanguageContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSelectedResultItem("");
  }, [selectedSpecies]);

  useEffect(() => {
    if (location && selectedSpecies) {
      getSpeciesData(language, setLoading);
    }
  }, [selectedSpecies, location, distance, timespan, language]);

  return (
    <div className="recent-results-container">
      <div className="results-header">
        <span className="results-header--species comname">{selectedSpecies ? <>{selectedSpecies.comName}</> : language.code === "de" ? "keine Art gewählt" : "No species selected"}</span>
        <span className="results-header--species sciname">{selectedSpecies && <>{selectedSpecies.sciName}</>}</span>
        <span className="results-header--results">
          {language.code === "de" ? "Beobachtungen:" : "Observations:"} {data.length}
        </span>
      </div>
      <div className="results-inner">
        {loading && <Loader />}
        {!loading &&
          (data.length > 0 ? (
            <ul className="result-item-list">
              {data.map((item, index) => {
                return (
                  <ScrollToSelectedListItem key={index} isChosen={item === selectedResultItem}>
                    <ResultItem key={index} item={item} />
                  </ScrollToSelectedListItem>
                );
              })}
            </ul>
          ) : (
            <div className="error-message">
              {selectedSpecies
                ? language.code === "de"
                  ? "Leider keine Beobachtungen für deinen Standort mit diesen Einstellungen."
                  : "Sorry, no recent observations for your location and settings."
                : language.code === "de"
                ? "Wähle eine Art."
                : "Choose a species from the list."}
            </div>
          ))}
      </div>
    </div>
  );
}
