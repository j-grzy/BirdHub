import React, {useRef, useState, useEffect, useContext} from "react";
import "leaflet/dist/leaflet.css";
import {MapContainer, Marker, Popup, TileLayer, ZoomControl, useMap} from "react-leaflet";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import {MapLibreTileLayer} from "./MapLibreTileLayer.tsx";
// import outdoors from "../../assets/map-styles/outdoors.json";

import {RecentContext} from "../../contexts/RecentContext.jsx";
import customMarker from "../../assets/icons/marker-icon.png";
import customMarkerShadow from "../../assets/icons/marker-shadow.png";
import "./RecentMap.css";

// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: import("leaflet/dist/images/marker-icon-2x.png"),
//   iconUrl: import("leaflet/dist/images/marker-icon.png"),
//   shadowUrl: import("leaflet/dist/images/marker-shadow.png"),
// });

export default function RecentMap() {
  const {data, location, distance} = useContext(RecentContext);

  const myIcon = L.icon({
    iconUrl: customMarker,
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
          <Marker icon={myIcon} key={index} position={[item.lat, item.lng]}>
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
