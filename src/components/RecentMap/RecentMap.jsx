import React, {useRef, useState, useEffect, useContext} from "react";
import "leaflet/dist/leaflet.css";
import {MapContainer, Marker, Popup, ZoomControl, useMap} from "react-leaflet";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import {MapLibreTileLayer} from "./MapLibreTileLayer.tsx";
import {RecentContext} from "../../contexts/RecentContext.jsx";
import {ThemeContext} from "../../contexts/ThemeContext.jsx";
import "./RecentMap.css";
import PopupContent from "./PopupContent.jsx";

export default function RecentMap() {
  const {data, location, distance, selectedResultItem, setSelectedResultItem, selectedSpecies} = useContext(RecentContext);
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

  //TODO PNG Fallback
  const defaultIcon = L.divIcon({
    html: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z"/></svg>`,
    className: "svg-icon",
    iconSize: [40, 80],
    iconAnchor: [20, 0],
  });
  const selectedIcon = L.divIcon({
    html: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z"/></svg>`,
    className: "svg-icon-selected",
    iconSize: [40, 80],
    iconAnchor: [20, 0],
  });

  const ChangeView = () => {
    const map = useMap();
    useEffect(() => {
      if (location && !selectedResultItem) {
        const bbox = L.latLng(parseFloat(location.lat), parseFloat(location.lon)).toBounds(parseFloat(distance) * 1000);
        map.flyToBounds(bbox);
      }
    }, [location, distance]);
    return null;
  };

  const FocusSelectedMarker = () => {
    const map = useMap();
    useEffect(() => {
      if (selectedResultItem) {
        map.flyTo([parseFloat(selectedResultItem.lat), parseFloat(selectedResultItem.lng)], 13, [{duration: 0.25}]);
      }
    }, [selectedResultItem]);
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
      <MarkerClusterGroup disableClusteringAtZoom={13} spiderfyOnMaxZoom={false}>
        {data.map((item, index) => (
          <Marker
            icon={item.locId === selectedResultItem.locId && item.speciesCode === selectedSpecies.speciesCode ? selectedIcon : defaultIcon}
            key={index}
            position={[item.lat, item.lng]}
            eventHandlers={{
              click: () => {
                setSelectedResultItem(item);
              },
            }}>
            <Popup maxWidth="100 px" maxHeight="auto">
              <PopupContent item={item} />
            </Popup>
          </Marker>
        ))}
        <FocusSelectedMarker />
      </MarkerClusterGroup>
    </MapContainer>
  );
}
