import React, {useRef, useState, useEffect, useContext} from "react";
import "leaflet/dist/leaflet.css";
import {MapContainer, Marker, Popup, TileLayer, ZoomControl, useMap} from "react-leaflet";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import {MapLibreTileLayer} from "./MapLibreTileLayer.tsx";
import {RecentContext} from "../../contexts/RecentContext.jsx";
import {ThemeContext} from "../../contexts/ThemeContext.jsx";
import customMarker from "../../assets/icons/marker-icon.png";
import customMarkerRetina from "../../assets/icons/marker-icon-2x.png";
import customMarkerShadow from "../../assets/icons/marker-shadow.png";
import "./RecentMap.css";
import ResultItem from "../RecentResults/ResultItem.jsx";

export default function RecentMap() {
  const {data, location, distance} = useContext(RecentContext);
  const {theme} = useContext(ThemeContext);
  const [mapStyleUrl, setMapStyleUrl] = useState("https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json");
  const [mapStyleAttribution, setMapStyleAttribution] = useState(
    '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
  );

  useEffect(() => {
    if (theme.class === "dark") {
      setMapStyleUrl("https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json");
      setMapStyleAttribution(
        '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
      );
    }
    if (theme.class === "light") {
      setMapStyleUrl("https://tiles.stadiamaps.com/styles/alidade_smooth.json");
      setMapStyleAttribution(
        '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
      );
    }
    if (theme.class === "high-contrast") {
      setMapStyleUrl("https://tiles.stadiamaps.com/styles/stamen_toner.json");
      setMapStyleAttribution(
        '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
      );
    }
  }, [theme]);

  const myIcon = L.icon({
    iconUrl: customMarker,
    iconRetinaUrl: customMarkerRetina,
    iconSize: [25, 41],
    iconAnchor: [12, 0],
    popupAnchor: [0, 0],
    shadowUrl: customMarkerShadow,
    shadowSize: [41, 41],
    shadowAnchor: [12, 0],
  });

  const ChangeView = () => {
    const map = useMap();
    useEffect(() => {
      if (location) {
        const bbox = L.latLng(parseFloat(location.lat), parseFloat(location.lon)).toBounds(parseFloat(distance) * 1000);
        map.flyToBounds(bbox);
      }
    }, [location, distance]);
    return null;
  };
  // TODO: track center-coords and zoomlevel on-map-change; on theme or language change, keep map view
  return (
    <MapContainer
      className="recent-map"
      center={[51.3406321, 12.3747329]}
      zoom={13}
      zoomControl={false}
      minZoom={3}
      maxZoom={19}
      maxBounds={[
        [-85.06, -180],
        [85.06, 180],
      ]}
      scrollWheelZoom={true}>
      <ZoomControl position="bottomright" />
      <ChangeView />
      <MapLibreTileLayer attribution={mapStyleAttribution} url={mapStyleUrl} />
      <MarkerClusterGroup>
        {data.map((item, index) => (
          <Marker icon={myIcon} key={index} position={[item.lat, item.lng]}>
            <Popup maxWidth="100 px" maxHeight="auto">
              <ul>
                {/* TODO: merge items at exact same location to list in one popup; but keep marker-number for clustering */}
                <ResultItem item={item} className={"result-item-popup"} />
              </ul>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
