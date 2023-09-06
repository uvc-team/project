import React from "react";
import "../css/main.css";
import Navbar from "./navbar";

const MainPage = () => {
  return (
    <header>
      <div className="background">
        <div className="background-image">
          <div className="boxBlack">
            <div className="boxW">
              <p style={{ fontSize: "64px" }} className="textStyleW">
                (주)함박오이{" "}
              </p>
              <p className="textStyleY">Safety first Smart Factory</p>
              <Navbar />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainPage;
