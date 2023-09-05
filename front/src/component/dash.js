import React from "react";
import "../css/dash.css";
import WebGL from "./webgl";

function Dash() {
  return (
    <div className="DashContainer">
      <div className="LeftContainer">
        <WebGL />
      </div>
      <div className="RightContainer"></div>
    </div>
  );
}

export default Dash;
