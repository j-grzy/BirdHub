import React, {useRef, useState, useEffect, useContext} from "react";
// import {RecentContext} from "../../contexts/RecentContext.jsx";
import "./ResultItem.css";
import {IoTimeOutline} from "react-icons/io5";
import {CiCalendar} from "react-icons/ci";
import {CiLocationOn} from "react-icons/ci";

export default function ResultItem({index, item}) {
  return (
    <li key={index}>
      <div className="result-item">
        <div className="species-com-name">
          {item.comName} {item.howMany ? <span className="species-count">({item.howMany})</span> : null}
        </div>
        <div className="species-sci-name">{item.sciName}</div>
        <div className="observ-date">
          {item.obsDt ? (
            <>
              <span className="observ-date--date item-info">
                <CiCalendar className="item-info--icon" />
                {item.obsDt.split(" ")[0]}
              </span>
              <span className="observ-date--time item-info">
                <IoTimeOutline className="item-info--icon" />
                {item.obsDt.split(" ")[1]}
              </span>
            </>
          ) : null}
        </div>
        <div className="loc-name item-info">
          <CiLocationOn className="item-info--icon" />
          {item.locName}
        </div>
      </div>
    </li>
  );
}
