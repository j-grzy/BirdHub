import React from "react";
import Recent from "./Recent/Recent";
import RecentProvider from "../contexts/RecentContext.jsx";

export default function Main() {
  return (
    <main>
      <RecentProvider>
        <Recent />
      </RecentProvider>
    </main>
  );
}
