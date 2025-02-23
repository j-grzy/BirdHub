import React, {useContext, useState, useRef, useEffect} from "react";
import "./LanguageSwitcher.css";
import {LanguageContext} from "../../contexts/LanguageContext.jsx";
import {CaretDown, Globe} from "@phosphor-icons/react";

export default function LanguageSwitcher() {
  const {language, setLanguage, languageList} = useContext(LanguageContext);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const langContainerRef = useRef(null);

  function handleClick(lang) {
    setLanguage(lang);
    localStorage.setItem("language", JSON.stringify(lang));
  }
  function clickOutsideElement(ref) {
    useEffect(() => {
      function handleClickOutside(ev) {
        if (ref.current && !ref.current.contains(ev.target)) {
          setShowLangMenu(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  clickOutsideElement(langContainerRef);
  return (
    <div className="lang-container" ref={langContainerRef}>
      <div className="langMenu-toggleButton" onClick={() => setShowLangMenu(!showLangMenu)}>
        <div className="lang--icon">
          <Globe size={24} />
        </div>
        <div className="lang--code hidden">{language.code}</div>
        <div className="lang--dropdown">
          <CaretDown size={24} />
        </div>
      </div>
      {showLangMenu ? (
        <div className="lang-menu">
          <ul>
            {languageList.map((lang, index) => {
              return (
                <li key={index} className={lang.code === language.code ? "lang-checked" : ""} onClick={() => handleClick(lang)}>
                  {lang.name}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
