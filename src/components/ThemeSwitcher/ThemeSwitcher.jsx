import React, {useRef, useState, useEffect, useContext} from "react";
import {ThemeContext} from "../../contexts/ThemeContext.jsx";
import {LanguageContext} from "../../contexts/LanguageContext.jsx";
import "./ThemeSwitcher.css";
import {CaretDown, SubtractSquare} from "@phosphor-icons/react";

export default function ThemeSwitcher() {
  const {theme, setTheme, themeList} = useContext(ThemeContext);
  const {language} = useContext(LanguageContext);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const themeContainerRef = useRef(null);

  function handleClick(themeItem) {
    setTheme(themeItem);
    localStorage.setItem("theme", JSON.stringify(themeItem));
  }

  function clickOutsideElement(ref) {
    useEffect(() => {
      function handleClickOutside(ev) {
        if (ref.current && !ref.current.contains(ev.target)) {
          setShowThemeMenu(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  clickOutsideElement(themeContainerRef);
  return (
    <div className="theme-switcher" ref={themeContainerRef}>
      <div className="theme-toggleButton" onClick={() => setShowThemeMenu(!showThemeMenu)}>
        <div className="theme--icon">
          <SubtractSquare size={24} />
        </div>
        <div className="theme hidden">{theme.display[language.code]}</div>
        <div className="theme--dropdown">
          <CaretDown size={24} />
        </div>
      </div>
      {showThemeMenu ? (
        <div className="theme-menu">
          <ul>
            {themeList.map((themeItem, index) => {
              return (
                <li key={index} className={themeItem.class === theme.class ? "theme-checked" : ""} onClick={() => handleClick(themeItem)}>
                  {themeItem.display[language.code]}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
