import React from "react";
import WebGL from "../webGL/webgl";
import "../css/dash.css";
import Header from "../Header/header";

function Dash() {
  return (
    <div>
      <Header />
      <div className="DashContainer">
        <div className="LeftContainer">
          <WebGL />
        </div>
        <div className="RightContainer"></div>
      </div>
    </div>
  );
}

export default Dash;
