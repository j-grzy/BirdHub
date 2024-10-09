import React from "react";
import {Outlet} from "react-router-dom";
import Recent from "./Recent/Recent";
import RecentProvider from "../contexts/RecentContext.jsx";

export default function Main() {
  return (
    <main>
      {/* <Outlet /> */}
      <RecentProvider>
        <Recent />
      </RecentProvider>
    </main>
  );
}
