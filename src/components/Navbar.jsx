import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import crowIcon from "../assets/icons/crow-solid.svg";
import bellIcon from "../assets/icons/bell-solid.svg";
import binoIcon from "../assets/icons/bino.svg";
import rssIcon from "../assets/icons/rss.svg";
import weatherIcon from "../assets/icons/weather.svg";
import diceIcon from "../assets/icons/dice.svg";
import chartIcon from "../assets/icons/chart-simple-solid.svg";
import calendarIcon from "../assets/icons/calendar.svg";
import menuIcon from "../assets/icons/bars.svg";
import gearIcon from "../assets/icons/gear.svg";
import closeIcon from "../assets/icons/close.svg";

export default function Navbar() {
  const [showNav, setShowNav] = useState(false);
  return (
    <div className={"nav-container" + (showNav ? " show-nav" : "")}>
      <div className="nav-toggle-container">
        <div className={"nav-toggle-button" + (showNav ? " close" : "")} role="button" onClick={() => setShowNav(!showNav)}>
          <img src={showNav ? closeIcon : menuIcon} alt="" />
        </div>
      </div>
      <nav>
        <ul className="nav-list">
          <li>
            <NavLink to="dashboard">
              <div className="nav-link--icon">
                <img src={chartIcon} alt="" />
              </div>
              <span className="nav-link--text">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="recent-observations">
              <div className="nav-link--icon">
                <img src={bellIcon} alt="" />
              </div>

              <span className="nav-link--text">Recent Observations</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="observations">
              <div className="nav-link--icon">
                <img src={binoIcon} alt="" />
              </div>

              <span className="nav-link--text">My Observations</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="species">
              <div className="nav-link--icon">
                <img src={crowIcon} alt="" />
              </div>

              <span className="nav-link--text">Species</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="weather">
              <div className="nav-link--icon">
                <img src={weatherIcon} alt="" />
              </div>

              <span className="nav-link--text">Weather</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="calendar">
              <div className="nav-link--icon">
                <img src={calendarIcon} alt="" />
              </div>

              <span className="nav-link--text">Calendar</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="news">
              <div className="nav-link--icon">
                <img src={rssIcon} alt="" />
              </div>

              <span className="nav-link--text">News</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="games">
              <div className="nav-link--icon">
                <img src={diceIcon} alt="" />
              </div>
              <span className="nav-link--text">Games</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="nav-settings-container">
        <div className="nav-settings-button" role="button">
          <img src={gearIcon} alt="" />
        </div>
        <span className="nav-settings--text">Settings</span>
      </div>
    </div>
  );
}
