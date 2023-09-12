import React from "react";
import WebGL from "../webGL/webgl";
import "../css/dash.css";
import Header from "../Header/header";
import GraphComponent from "./Graph";
import No3 from "./no3";

function Dash() {
  return (
    <div>
      <Header />
      <div className="Dash">
        <div className="DashBoard">
            <WebGL />  
            <div className="DashBox" >
              {/* 3단중 처음 */}
            <div className="twice">
              <div className="bg-slate-800">
                <GraphComponent />
              </div>
              <div className="bg-slate-200"></div>
            </div>
            {/* 3단중 중간 */}
            <div className="bg-slate-900">
              <No3 />
            </div>
            {/* 3단중 밑단 */}
            <div className="twice">
              <div className="bg-slate-100"></div>
              <div className="bg-slate-200"></div>
            </div>

            </div>    
          </div>
        </div>
      </div>
  );
}

export default Dash;
