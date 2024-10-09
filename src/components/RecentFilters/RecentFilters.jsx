import "./RecentFilters.css";
import FilterPlace from "./FilterPlace.jsx";
import FilterTimeSpan from "./FilterTimeSpan.jsx";
import FilterSpecies from "./FilterSpecies.jsx";

export default function RecentFilters() {
  return (
    <div className="filters-container">
      <FilterPlace />
      <FilterTimeSpan />
      <FilterSpecies />
    </div>
  );
}
