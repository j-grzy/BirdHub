import {useContext, useEffect, useState} from "react";
import RecentFilters from "../RecentFilters/RecentFilters.jsx";
import RecentMap from "../RecentMap/RecentMap.jsx";
import RecentResults from "../RecentResults/RecentResults.jsx";
import "./Recent.css";
import {RecentContext} from "../../contexts/RecentContext.jsx";
import {LanguageContext} from "../../contexts/LanguageContext.jsx";
import {BACKEND_URL} from "../../config";

export default function Recent() {
  const {location, distance, onlyNotable, timeSpan, getSpeciesList} = useContext(RecentContext);
  const {language} = useContext(LanguageContext);

  useEffect(() => {
    if (location) {
      getSpeciesList(language);
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
