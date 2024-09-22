import React, {useRef, useState, useEffect, useContext} from "react";
import "leaflet/dist/leaflet.css";
import {MapContainer, Marker, Popup, TileLayer, ZoomControl, useMap} from "react-leaflet";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import {MapLibreTileLayer} from "./MapLibreTileLayer.tsx";
// import outdoors from "../../assets/map-styles/outdoors.json";

import {RecentContext} from "../../contexts/RecentContext.jsx";

// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: import("leaflet/dist/images/marker-icon-2x.png"),
//   iconUrl: import("leaflet/dist/images/marker-icon.png"),
//   shadowUrl: import("leaflet/dist/images/marker-shadow.png"),
// });

export default function RecentMap() {
  const {data, location, distance} = useContext(RecentContext);

  // Set initials
  // const center = [51.3406321, 12.3747329];
  // const zoom = 13;

  // recenter map to new coordinates
  const ChangeView = () => {
    const map = useMap();
    useEffect(() => {
      // Fly to coordinates and set new zoom level
      // map.flyTo([location.lat, location.lon], 13);

      // with bounds:
      if (location) {
        const bbox = L.latLng(parseFloat(location.lat), parseFloat(location.lon)).toBounds(distance * 1000);
        map.flyToBounds(bbox);
      }
    }, [location, distance]);
    return null;
  };
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
      <MapLibreTileLayer
        attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
        url="https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json"
      />
      <MarkerClusterGroup>
        {data.map((item, index) => (
          <Marker key={index} position={[item.lat, item.lng]}>
            <Popup>
              {item.comName}
              <br />
              {item.locName}
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
