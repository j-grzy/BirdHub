import {createContext, useState} from "react";
import {API_URL} from "../config";

export const RecentContext = createContext();

export default function RecentProvider({children}) {
  const [location, setLocation] = useState(null);
  const [distance, setDistance] = useState(25);
  const [subRegion, setSubRegion] = useState("");
  const [timeSpan, setTimeSpan] = useState(14);
  const [onlyNotable, setOnlyNotable] = useState("");
  const [speciesList, setSpeciesList] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState(null);

  const [data, setData] = useState([]);
  const [selectedResultItem, setSelectedResultItem] = useState("");

  async function getSpeciesList(language, setLoading) {
    setLoading(true);
    const endpoint = onlyNotable ? "/ebirdData/notable" : "/ebirdData/all";
    const fetchParams = `?lat=${location.lat}&lng=${location.lon}&dist=${distance}&back=${timeSpan}&sppLocale=${language.code}`;
    try {
      const response = await fetch(`${API_URL}${endpoint}${fetchParams}`, {
        method: "GET",
      });
      const result = await response.json();
      setSpeciesList(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function getSpeciesData(language, setLoading) {
    setLoading(true);
    const endpoint = onlyNotable ? "/ebirdData/oneNotable" : "/ebirdData/one";
    const fetchParams = `?speciesCode=${selectedSpecies.speciesCode}&lat=${location.lat}&lng=${location.lon}&dist=${distance}&back=${timeSpan}&sppLocale=${language.code}`;
    try {
      const response = await fetch(`${API_URL}${endpoint}${fetchParams}`, {
        method: "GET",
      });
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <RecentContext.Provider
      value={{
        location,
        setLocation,
        distance,
        setDistance,
        subRegion,
        setSubRegion,
        timeSpan,
        setTimeSpan,
        onlyNotable,
        setOnlyNotable,
        speciesList,
        setSpeciesList,
        data,
        setData,
        selectedSpecies,
        setSelectedSpecies,
        getSpeciesData,
        getSpeciesList,
        selectedResultItem,
        setSelectedResultItem,
      }}>
      {children}
    </RecentContext.Provider>
  );
}
