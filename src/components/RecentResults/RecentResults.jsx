import React, { useRef, useState, useEffect, useContext } from "react";
import { RecentContext } from "../../contexts/RecentContext.jsx";
import "./RecentResults.css";
import ResultItem from "./ResultItem.jsx";
import { LanguageContext } from "../../contexts/LanguageContext.jsx";

export default function RecentResults() {
  const { data, location, distance } = useContext(RecentContext);
  const { language } = useContext(LanguageContext);
  return (
    <div className="recent-results-container">
      <div className="results-header">
        <span className="results-header--place">
          {location ? (
            <>
              {location.name} ({distance} km)
            </>
          ) : language.code === "de" ? (
            "kein Standort gewählt"
          ) : (
            "No location selected"
          )}
        </span>

        <span className="results-header--results">
          {language.code === "de" ? "Suchergebnisse:" : "Results:"} {data.length}
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
          <div className="error-message">{location ? (language.code === "de" ? "Leider keine Suchergebnisse für deinen Standort mit diesen Einstellungen." : "Sorry, no search results for your location and settings.") : language.code === "de" ? "Wähle deinen Standort." : "Choose your location."}</div>
        )}
      </div>
    </div>
  );
}
