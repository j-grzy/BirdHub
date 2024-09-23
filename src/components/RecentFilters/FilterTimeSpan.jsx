import React, {useRef, useState, useEffect, useContext} from "react";
import {RecentContext} from "../../contexts/RecentContext.jsx";
import {LanguageContext} from "../../contexts/LanguageContext.jsx";
import "./RecentFilters.css";

export default function FilterTimeSpan() {
  const {timeSpan, setTimeSpan} = useContext(RecentContext);
  const {language} = useContext(LanguageContext);

  return (
    <div className="filter filter-timespan">
      <label htmlFor="timespanInput" className="filter-label">
        {language.code === "de" ? "Zeitraum (1 - 30 Tage):" : "Timespan (1 - 30 days):"}
      </label>
      <div className="timespan-inner">
        <input type="range" id="timespanRange" name="timespanRange" min="1" max="30" value={timeSpan} onChange={(ev) => setTimeSpan(ev.target.value)} />
        <input type="number" name="timespanInput" id="timespanInput" min="1" max="30" value={timeSpan} onChange={(ev) => setTimeSpan(ev.target.value)} />
      </div>
    </div>
  );
}
