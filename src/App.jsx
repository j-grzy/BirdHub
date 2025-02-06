import React from "react";
import "./App.css";
import Header from "./components/Header/Header.jsx";
import Recent from "./components/Recent/Recent";
import RecentProvider from "./contexts/RecentContext.jsx";
import RateLimitOverlay from "./components/RateLimitOverlay/RateLimitOverlay.jsx";

function App() {
  return (
    <>
      <RecentProvider>
        <RateLimitOverlay />
        <div className="wrapper">
          <Header />
          <main>
            <Recent />
          </main>
        </div>
      </RecentProvider>
    </>
  );
}

export default App;
