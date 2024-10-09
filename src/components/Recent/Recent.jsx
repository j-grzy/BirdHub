import {useContext, useEffect, useState} from "react";
import ebirdKey from "../../../../../ebirdKey.js";
import RecentFilters from "../RecentFilters/RecentFilters.jsx";
import RecentMap from "../RecentMap/RecentMap.jsx";
import RecentResults from "../RecentResults/RecentResults.jsx";
import "./Recent.css";
import {RecentContext} from "../../contexts/RecentContext.jsx";
import {LanguageContext} from "../../contexts/LanguageContext.jsx";

export default function Recent() {
  const {data, setData, location, distance, onlyNotable, timeSpan} = useContext(RecentContext);
  const {language} = useContext(LanguageContext);
  const API_KEY = import.meta.env.VITE_EBIRD_API_KEY;
  const ebirdHeaders = new Headers();
  ebirdHeaders.append("X-eBirdApiToken", ebirdKey);
  useEffect(() => {
    if (location) {
      async function getData() {
        // setLoading(true);
        try {
          // Amsel speciesCode for testing: eurbla
          // UHU: eueowl1
          //Waldkauz: tawowl1
          //Waldohreule: loeowl
          const response = await fetch(
            `https://api.ebird.org/v2/data/obs/geo/recent${onlyNotable}?lat=${location.lat}&lng=${location.lon}&dist=${distance}&back=${timeSpan}&sppLocale=${language.code}`,
            // `https://api.ebird.org/v2/data/nearest/geo/recent/eurbul?lat=${location.lat}&lng=${location.lon}&back=${timeSpan}&sppLocale=${language.code}`,
            {
              method: "GET",
              headers: ebirdHeaders,
              redirect: "follow",
            }
          );
          const result = await response.json();
          console.log(result);
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
    <div className="recent">
      <div className="recent-column">
        <RecentFilters />
      </div>
      <div className="map-column">
        <RecentResults />
        <RecentMap />
      </div>
    </div>
  );
}
