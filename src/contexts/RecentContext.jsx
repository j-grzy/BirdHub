import {createContext, useState} from "react";
import {API_URL} from "../config";
import Cookies from "js-cookie";

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

  const [rateLimitActive, setRateLimitActive] = useState(false);

  async function getSpeciesList(language, setLoading) {
    if (rateLimitActive) return;
    setLoading(true);
    const endpoint = onlyNotable ? "/ebirdData/notable" : "/ebirdData/all";
    const fetchParams = `?lat=${location.lat}&lng=${location.lon}&dist=${distance}&back=${timeSpan}&sppLocale=${language.code}`;
    try {
      const response = await fetch(`${API_URL}${endpoint}${fetchParams}`, {
        method: "GET",
      });
      if (!response.ok) {
        if (response.status === 429) {
          const data = await response.json();
          if (data.retryAfter) {
            handleRateLimitExceeded(data.retryAfter);
          }
        } else {
          const errorData = await response.json();
          console.error(errorData.error);
        }
      } else {
        const result = await response.json();
        setSpeciesList(result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function getSpeciesData(language, setLoading) {
    if (rateLimitActive) return;
    setLoading(true);
    const endpoint = onlyNotable ? "/ebirdData/oneNotable" : "/ebirdData/one";
    const fetchParams = `?speciesCode=${selectedSpecies.speciesCode}&lat=${location.lat}&lng=${location.lon}&dist=${distance}&back=${timeSpan}&sppLocale=${language.code}`;
    try {
      const response = await fetch(`${API_URL}${endpoint}${fetchParams}`, {
        method: "GET",
      });
      if (!response.ok) {
        if (response.status === 429) {
          const data = await response.json();
          if (data.retryAfter) {
            handleRateLimitExceeded(data.retryAfter);
          }
        } else {
          const errorData = await response.json();
          console.error(errorData.error);
        }
      } else {
        const result = await response.json();
        setData(result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function handleRateLimitExceeded(retryAfter) {
    const expiresAt = Date.now() + retryAfter * 1000;
    Cookies.set("rate_limit_expires", expiresAt, {expires: retryAfter / 86400});
    setRateLimitActive(true);
    setTimeout(() => {
      setRateLimitActive(false);
    }, retryAfter * 1000);
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
        rateLimitActive,
      }}>
      {children}
    </RecentContext.Provider>
  );
}
