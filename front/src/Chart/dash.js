import React from "react";
import WebGL from "../webGL/webgl";
import "../css/dash.css";
import Header from "../Header/header";

function Dash() {
  return (
    <div className="DashContainer">
      <Header />
      <div className="LeftContainer">
        <WebGL />
      </div>
      <div className="RightContainer"></div>
    </div>
  );
}

export default Dash;
