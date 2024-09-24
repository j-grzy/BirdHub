import React, { useRef, useState, useEffect, useContext } from "react";
import "./App.css";
// import {Routes, Route} from "react-router-dom";
// import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Header from "./components/Header/Header.jsx";
// import Dashboard from "./components/Dashboard";
// import Recent from "./components/Recent/Recent";
// import Observations from "./components/Observations";
// import News from "./components/News";
// import Games from "./components/Games";
// import Weather from "./components/Weather";
// import Species from "./components/Species";

import { LanguageContext } from "./contexts/LanguageContext.jsx";
import { ThemeContext } from "./contexts/ThemeContext.jsx";

function App() {
  /*   const { setTheme } = useContext(ThemeContext);
  const { setLanguage } = useContext(LanguageContext);
  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setTheme(JSON.parse(localStorage.getItem("theme")));
    } else {
      setTheme({ display: { en: "dark", de: "dunkel" }, class: "dark" });
    }
    if (localStorage.getItem("language")) {
      setLanguage(localStorage.getItem("language"));
    }
  }, []); */
  return (
    <>
      <div className="wrapper">
        {/* <Navbar />
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="recent-observations" element={<Recent />} />
            <Route path="weather" element={<Weather />} />
            <Route path="observations" element={<Observations />} />
            <Route path="news" element={<News />} />
            <Route path="games" element={<Games />} />
            <Route path="species" element={<Species />} />
            <Route path="*" element={<Dashboard />} />
          </Route>
        </Routes> */}

        <Header />
        <Main />
      </div>
    </>
  );
}

export default App;
