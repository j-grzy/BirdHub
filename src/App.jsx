import React from "react";
import "./App.css";
//import Main from "./components/Main";
import Header from "./components/Header/Header.jsx";
import Recent from "./components/Recent/Recent";
import RecentProvider from "./contexts/RecentContext.jsx";

function App() {
  return (
    <>
      <div className="wrapper">
        <Header />
        {/* <Main /> */}
        <main>
          <RecentProvider>
            <Recent />
          </RecentProvider>
        </main>
      </div>
    </>
  );
}

export default App;
