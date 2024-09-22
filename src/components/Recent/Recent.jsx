import RecentFilters from "./RecentFilters.jsx";
import RecentMap from "./RecentMap";
import RecentResults from "./RecentResults.jsx";
import RecentProvider from "../../contexts/RecentContext.jsx";
import "./Recent.css";

export default function Recent() {
  return (
    <RecentProvider>
      <div className="recent">
        <RecentFilters />
        <RecentMap />
        <RecentResults />
      </div>
    </RecentProvider>
  );
}
