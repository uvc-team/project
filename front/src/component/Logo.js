import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/home">
      <img
        src={`${process.env.PUBLIC_URL}/hamLogo.png`}
        alt="Logo"
        style={{ width: "180px", height: "100px" }} // 원하는 크기로 조정
      />
    </Link>
  );
};

export default Logo;
