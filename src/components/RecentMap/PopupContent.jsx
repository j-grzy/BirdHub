import React from "react";
import "./PopupContent.css";
import {CalendarBlank, MapPin, Clock} from "@phosphor-icons/react";

export default function PopupContent({item}) {
  return (
    <div className="popup-content">
      <div className="species-com-name">
        {item.comName} {item.howMany ? <span className="species-count">({item.howMany})</span> : null}
      </div>
      <div className="species-sci-name">{item.sciName}</div>
      <div className="observ-date">
        {item.obsDt ? (
          <>
            <span className="observ-date--date item-info">
              <CalendarBlank size={32} className="item-info--icon" />
              {item.obsDt.split(" ")[0]}
            </span>
            <span className="observ-date--time item-info">
              <Clock size={32} className="item-info--icon" />
              {item.obsDt.split(" ")[1]}
            </span>
          </>
        ) : null}
      </div>
      <div className="loc-name item-info">
        <MapPin size={32} className="item-info--icon" />
        {item.locName}
      </div>
    </div>
  );
}
