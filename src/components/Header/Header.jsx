import React from "react";
import "./Header.css";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import {FaCrow} from "react-icons/fa6";

export default function Header() {
  return (
    <header>
      <div className="header-inner">
        <div className="brand">
          <div className="brand--logo">
            <FaCrow />
          </div>
          <div className="brand--name">BirdHub</div>
        </div>
        <div className="site-settings">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
