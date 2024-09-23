import React, {useRef, useState, useEffect, useContext} from "react";
import ebirdKey from "../../../../../ebirdKey.js";
import {RecentContext} from "../../contexts/RecentContext.jsx";
import {LanguageContext} from "../../contexts/LanguageContext.jsx";
import "./RecentFilters.css";
import FilterPlace from "./FilterPlace.jsx";
import FilterTimeSpan from "./FilterTimeSpan.jsx";
import FilterSpecies from "./FilterSpecies.jsx";

export default function RecentFilters() {
  const {data, setData, location, setLocation, distance, setDistance, onlyNotable, setOnlyNotable, timeSpan, setTimeSpan} = useContext(RecentContext);
  const {language} = useContext(LanguageContext);
  const [locVal, setLocVal] = useState("");

  const ebirdHeaders = new Headers();
  ebirdHeaders.append("X-eBirdApiToken", ebirdKey);
  useEffect(() => {
    if (location) {
      async function getData() {
        // setLoading(true);
        try {
          const response = await fetch(
            `https://api.ebird.org/v2/data/obs/geo/recent${onlyNotable}?lat=${location.lat}&lng=${location.lon}&dist=${distance}&back=${timeSpan}&sppLocale=${language.code}`,
            {
              method: "GET",
              headers: ebirdHeaders,
              redirect: "follow",
            }
          );
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
  }, [location, distance, onlyNotable, timeSpan, language]);

  return (
    <div className="filters-container">
      <FilterPlace />
      <FilterTimeSpan />
      <FilterSpecies />
    </div>
  );
}
