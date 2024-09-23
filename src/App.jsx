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
import LanguageProvider from "./contexts/LanguageContext";

function App() {
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

        <LanguageProvider>
          <Header />
          <Main />
        </LanguageProvider>
      </div>
    </>
  );
}

export default App;
