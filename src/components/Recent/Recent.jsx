import {useContext, useEffect, useState} from "react";
import RecentFilters from "../RecentFilters/RecentFilters.jsx";
import RecentMap from "../RecentMap/RecentMap.jsx";
import RecentResults from "../RecentResults/RecentResults.jsx";
import "./Recent.css";
import {RecentContext} from "../../contexts/RecentContext.jsx";
import {LanguageContext} from "../../contexts/LanguageContext.jsx";
import {BACKEND_URL} from "../../config";

export default function Recent() {
  const {data, setData, speciesList, setSpeciesList, location, distance, onlyNotable, timeSpan} = useContext(RecentContext);
  const {language} = useContext(LanguageContext);

  useEffect(() => {
    if (location) {
      //console.log(onlyNotable);
      const endpoint = onlyNotable ? "/ebirdData/notable" : "/ebirdData/all";
      const fetchParams = `?lat=${location.lat}&lng=${location.lon}&dist=${distance}&back=${timeSpan}&sppLocale=${language.code}`;
      async function getSpecies() {
        // setLoading(true);
        try {
          const response = await fetch(`${BACKEND_URL}${endpoint}${fetchParams}`, {
            method: "GET",
          });
          const result = await response.json();
          setSpeciesList(result);
        } catch (error) {
          console.log(error);
        } finally {
          // setLoading(!loading);
        }
      }
      getSpecies();
    }
    //empty result list again (for now)
    setData([]);
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
