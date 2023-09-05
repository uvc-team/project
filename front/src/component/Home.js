import React, { useState } from "react";
import "../css/Home.css";

const HomePage = (props) => {
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);

  const handleMouseEnter1 = () => {
    setIsHovered1(true);
  };

  const handleMouseLeave1 = () => {
    setIsHovered1(false);
  };

  const handleMouseEnter2 = () => {
    setIsHovered2(true);
  };

  const handleMouseLeave2 = () => {
    setIsHovered2(false);
  };

  const handleMouseEnter3 = () => {
    setIsHovered3(true);
  };

  const handleMouseLeave3 = () => {
    setIsHovered3(false);
  };

  const divStyle = {
    backgroundImage: "url(./img3.jpg)",
  };
  const divStyle2 = {
    backgroundImage: "url(./img4.jpg)",
  };
  const divStyle3 = {
    backgroundImage: "url(./img6.jpg)",
  };

  return (
    <div className="homeBackground">
      <div className="homeBackgroundImg">
        <div className="boxY">
          <p
            style={{
              textAlign: "left",
              fontSize: "35px",
              marginTop: "10px",
            }}
            className="textStyleW"
          >
            안전을 우선으로
            <br />
            정확한 진단 빠른 대처
          </p>
        </div>
      </div>

      <div className="container">
        <div
          style={divStyle}
          className={`homePageBox ${isHovered1 ? "hover" : ""}`}
          onMouseEnter={handleMouseEnter1}
          onMouseLeave={handleMouseLeave1}
        >
          <p className={`text ${isHovered1 ? "show" : ""}`}>회사소개</p>
        </div>
        <div
          style={divStyle2}
          className={`homePageBox ${isHovered2 ? "hover" : ""}`}
          onMouseEnter={handleMouseEnter2}
          onMouseLeave={handleMouseLeave2}
        >
          <p className={`text ${isHovered2 ? "show" : ""}`}>직원소개</p>
        </div>

        <div
          style={divStyle3}
          className={`homePageBox ${isHovered3 ? "hover" : ""}`}
          onMouseEnter={handleMouseEnter3}
          onMouseLeave={handleMouseLeave3}
        >
          <p className={`text ${isHovered3 ? "show" : ""}`}>아이디어</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
