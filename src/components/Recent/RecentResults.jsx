import React, {useRef, useState, useEffect, useContext} from "react";
import {RecentContext} from "../../contexts/RecentContext.jsx";

export default function RecentResults() {
  const {data, location, distance} = useContext(RecentContext);
  return (
    <div className="recent-results-container">
      <div className="results-header">
        <span className="results-header--place">
          {location ? (
            <>
              {location.name} ({distance} km)
            </>
          ) : (
            "Please chose a place"
          )}
        </span>
        <br></br>
        <span className="results-header--results">Results: {data.length}</span>
      </div>
      <div className="results-inner">
        {data ? (
          <ul>
            {data.map((item, index) => {
              return (
                <li key={index}>
                  <div className="result-item">
                    <div className="species-com-name">
                      {item.comName} {item.howMany ? <span className="species-count">({item.howMany})</span> : null}
                    </div>
                    <div className="species-sci-name">{item.sciName}</div>
                    <div className="observ-date">
                      {item.obsDt ? (
                        <>
                          <span className="observ-date">{item.obsDt.split(" ")[0]}</span>
                          <span className="observ-time">{item.obsDt.split(" ")[1]}</span>
                        </>
                      ) : null}
                    </div>
                    <div className="loc-name">{item.locName}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          "No search results"
        )}
      </div>
    </div>
  );
}
