import RecentFilters from "../RecentFilters/RecentFilters.jsx";
import RecentMap from "../RecentMap/RecentMap.jsx";
import RecentResults from "../RecentResults/RecentResults.jsx";
import "./Recent.css";

export default function Recent() {
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
