import RecentFilters from "../RecentFilters/RecentFilters.jsx";
import RecentMap from "../RecentMap/RecentMap.jsx";
import RecentResults from "../RecentResults/RecentResults.jsx";
import "./Recent.css";

export default function Recent() {
  return (
    <div className="recent">
      <RecentFilters />
      <RecentResults />
      <RecentMap />
    </div>
  );
}
