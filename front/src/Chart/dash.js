import React from "react";
import WebGL from "../webGL/webgl";
import "../css/dash.css";
import Header from "../Header/header";
import GraphComponent from "./Graph";
import No3 from "./no3";

import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  LineController,
  PointElement,
  LineElement,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement
);
function Dash() {
  return (
    <div>
      <Header />
      <div className="DashContainer">
        <div className="LeftContainer">
          <WebGL />
        </div>
        <div className="RightContainer">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <GraphComponent />
            <No3 />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dash;
