import React from "react";
import WebGL from "../webGL/webgl";
import '../css/dash.css';

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
//
