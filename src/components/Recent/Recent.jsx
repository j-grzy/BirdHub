import RecentFilters from "../RecentFilters/RecentFilters.jsx";
import RecentMap from "../RecentMap/RecentMap.jsx";
import RecentResults from "../RecentResults/RecentResults.jsx";
import RecentProvider from "../../contexts/RecentContext.jsx";
import "./Recent.css";

export default function Recent() {
  return (
    <RecentProvider>
      <div className="recent">
        <div className="recent-column">
          <RecentFilters />
          <RecentResults />
        </div>
        <div className="map-column">
          <RecentMap />
        </div>
      </div>
    </RecentProvider>
  );
}
