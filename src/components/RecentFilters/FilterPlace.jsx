import React, { useRef, useState, useEffect, useContext } from "react";
import { RecentContext } from "../../contexts/RecentContext.jsx";
import { LanguageContext } from "../../contexts/LanguageContext.jsx";
import "./FilterPlace.css";

export default function RecentFilters() {
  const { setLocation, distance, setDistance } = useContext(RecentContext);
  const { language } = useContext(LanguageContext);
  const [locVal, setLocVal] = useState("");

  function handleLoc(ev) {
    ev.preventDefault();
    if (locVal) {
      async function getLocation() {
        const param = locVal.replace(/\s,/, "%20");
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${param}&format=json&limit=5`);
          const result = await response.json();
          setLocation(result[0]);
        } catch (error) {
          console.log(error);
        } finally {
          // setLoading(!loading);
        }
      }
      getLocation();
    }
  }

  return (
    <div className="filter-place">
      <div className="filter-place--location">
        <form className="filter location--search" onSubmit={handleLoc}>
          <label htmlFor="location" className="filter-label">
            {language.code === "de" ? "Standort:" : "Location:"}
          </label>
          <div className="location--search-inner">
            <input type="text" name="location" id="location" placeholder="Search a place or address" val={locVal} onChange={(ev) => setLocVal(ev.target.value)} />
            <button id="searchLocBtn">{language.code === "de" ? "Suchen" : "Search"}</button>
          </div>
        </form>
        <div className="filter location--distance">
          <label htmlFor="distInput" className="filter-label">
            {language.code === "de" ? "Umkreis (1 - 50 km):" : "Distance (1 - 50 km):"}
          </label>
          <div className="distance-inner">
            <input type="range" id="distRange" name="distRange" min="1" max="50" value={distance} onChange={(ev) => setDistance(ev.target.value)} />
            <input type="number" name="distInput" id="distInput" min="1" max="50" value={distance} onChange={(ev) => setDistance(ev.target.value)} />
          </div>
        </div>
      </div>
      {/* <div className="filter-place--region"></div> */}
    </div>
  );
}
