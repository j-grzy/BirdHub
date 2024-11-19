import React from "react";
import "./App.css";
import Main from "./components/Main";
import Header from "./components/Header/Header.jsx";

function App() {
  return (
    <>
      <div className="wrapper">
        <Header />
        <Main />
      </div>
    </>
  );
}

export default App;
