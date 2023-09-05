// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./css/Navbar.css"; // CSS 파일 import

const Footer = () => {
  return (
    <div className="footerBackground">
      <p className="textStyleB">
        010-000-000 | 031-000-000 | 서울특별시 강남구{" "}
      </p>
      <Link to="/">HOME</Link>
    </div>
  );
};

export default Footer;
