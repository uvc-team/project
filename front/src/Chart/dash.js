import React from "react";
import WebGL from "../webGL/webgl";
import "../css/dash.css";
import Header from "../Header/header";
import GraphComponent from "./Graph";
import No3 from "./no3";
import VideoComponent from "./video";

function Dash() {
  return (
    <div>
      <Header />
      <div className="Dash">
        <div className="DashBoard">
          <WebGL />
          <div className="DashBox">
            {/* 상단 */}
            <div className="twice">
              <div className="Dash1">
                <GraphComponent />
              </div>
              <div className="Dash1-1">
                <div className="Dash1-11">
                  <div class="item">흰색 칩 : </div>
                  <div class="item">빨간색 칩 : </div>
                  <div class="item">주사위 수 : </div>
                </div>
              </div>
            </div>
            {/* 중단 */}
            <div className="Dash2">
              <VideoComponent />
            </div>
            {/* 하단 */}
            <div className="Dash3">
              <No3 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dash;
