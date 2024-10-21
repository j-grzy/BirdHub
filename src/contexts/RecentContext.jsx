import {createContext, useState, useRef} from "react";

export const RecentContext = createContext();

export default function RecentProvider({children}) {
  const [location, setLocation] = useState(null);
  const [distance, setDistance] = useState(25);
  const [subRegion, setSubRegion] = useState("");
  const [timeSpan, setTimeSpan] = useState(14);
  const [onlyNotable, setOnlyNotable] = useState("");
  const [speciesList, setSpeciesList] = useState([]);

  const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);

  return (
    <RecentContext.Provider
      value={{location, setLocation, distance, setDistance, subRegion, setSubRegion, timeSpan, setTimeSpan, onlyNotable, setOnlyNotable, speciesList, setSpeciesList, data, setData}}>
      {children}
    </RecentContext.Provider>
  );
}
