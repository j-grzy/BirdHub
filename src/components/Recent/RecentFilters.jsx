import React, {useRef, useState, useEffect, useContext} from "react";
import ebirdKey from "../../../../../ebirdKey.js";
import {RecentContext} from "../../contexts/RecentContext.jsx";

export default function RecentFilters() {
  const {data, setData, location, setLocation, distance, setDistance, onlyNotable, setOnlyNotable, timeSpan, setTimeSpan} = useContext(RecentContext);
  const [locVal, setLocVal] = useState("");
  const [speciesList, setSpeciesList] = useState([]);

  const ebirdHeaders = new Headers();
  ebirdHeaders.append("X-eBirdApiToken", ebirdKey);
  useEffect(() => {
    if (location) {
      async function getData() {
        // setLoading(true);
        try {
          const response = await fetch(`https://api.ebird.org/v2/data/obs/geo/recent${onlyNotable}?lat=${location.lat}&lng=${location.lon}&dist=${distance}&back=${timeSpan}&sppLocale=de`, {
            method: "GET",
            headers: ebirdHeaders,
            redirect: "follow",
          });
          const result = await response.json();

          setData(result);
        } catch (error) {
          console.log(error);
        } finally {
          // setLoading(!loading);
        }
      }
      getData();
    }
  }, [location, distance, onlyNotable, timeSpan]);

  useEffect(() => {
    if (data) {
      const birdSet = [...new Set(data.map((item) => item.comName))].sort();

      const arr = [];
      for (let bird of birdSet) {
        arr.push({name: bird, checked: false});
      }
      arr.sort();

      setSpeciesList(arr);
    }
  }, [data]);

  function handleLoc() {
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
    <div className="filters-container">
      <div className="filter-place filter">
        <div className="filter-place--location">
          <div className="location--search">
            <label htmlFor="location">Location:</label>
            <input type="text" name="location" id="location" placeholder="Search a place or address" val={locVal} onChange={(ev) => setLocVal(ev.target.value)} />
            <button id="searchLocBtn" onClick={handleLoc}>
              Find
            </button>
          </div>
          <div className="location--distance">
            <label htmlFor="distInput">Distance (1 - 50 km): </label>
            <input type="number" name="distInput" id="distInput" min="1" max="50" value={distance} onChange={(ev) => setDistance(ev.target.value)} />
            <input type="range" id="distRange" name="distRange" min="1" max="50" value={distance} onChange={(ev) => setDistance(ev.target.value)} />
          </div>
        </div>
        <div className="filter-place--region"></div>
      </div>
      <div className="filter-timespan filter">
        <div className="timespan-inner">
          <label htmlFor="timespanInput">Days back (1 - 30): </label>
          <input type="number" name="timespanInput" id="timespanInput" min="1" max="30" value={timeSpan} onChange={(ev) => setTimeSpan(ev.target.value)} />
          <input type="range" id="timespanRange" name="timespanRange" min="1" max="30" value={timeSpan} onChange={(ev) => setTimeSpan(ev.target.value)} />
        </div>
      </div>
      <div className="filter-species-container filter">
        <div className="filter-notbale">
          <div className="filter-notable--item">
            <input type="radio" name="onlyNotableRadio" id="onlyNotable-all" value="" checked={onlyNotable === ""} onChange={(ev) => setOnlyNotable(ev.target.value)} />
            <label htmlFor="onlyNotable-all">all</label>
          </div>
          <div className="filter-notable--item">
            <input type="radio" name="onlyNotableRadio" id="onlyNotable-notable" value="/notable" checked={onlyNotable === "/notable"} onChange={(ev) => setOnlyNotable(ev.target.value)} />
            <label htmlFor="onlyNotable-notable">only notable</label>
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
    </div>
  );
}
