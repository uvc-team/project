import React, { useState } from "react";
import WebGL from "../webGL/webgl";
import "../css/dash.css";
import Header from "../Header/header";

function Dash() {
  const [numValue, setNumValue] = useState(1);
  return (
    <div className="DashContainer">
      <Header numValue={numValue} setNumValue={setNumValue} />
      <div className="LeftContainer">
        <WebGL />
      </div>
      <div className="RightContainer"></div>
    </div>
  );
}

export default Dash;
