import React, {useRef, useState, useEffect, useContext} from "react";
import {RecentContext} from "../../contexts/RecentContext.jsx";
import {LanguageContext} from "../../contexts/LanguageContext.jsx";
import "./FilterSpecies.css";

export default function FilterTimeSpan() {
  const {data, setData, onlyNotable, setOnlyNotable} = useContext(RecentContext);
  const {language} = useContext(LanguageContext);

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
          {/* <div className="filter-species">
              <ul className="species-list">
                {speciesList.map((spec, index) => {
                  return <li key={index}>{spec.name}</li>;
                })}
              </ul>
            </div> */}
        </div>
      </div>
    </div>
  );
}
