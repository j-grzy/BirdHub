import React from "react";
import {Outlet} from "react-router-dom";
import Recent from "./Recent/Recent";

export default function Main() {
  return (
    <main>
      {/* <Outlet /> */}
      <Recent />
    </main>
  );
}
