// Navbar.js
import React, { useState } from "react";
import "../css/Navbar.css"; // CSS 파일 import
import Join from "./Join";
import Login from "./login";

const Navbar = () => {
  const [joinModalOpen, setjoinModalOpen] = useState(false);
  const [loginModalOpen, setloginModalOpen] = useState(false);

  const joinOpenModal = () => {
    setjoinModalOpen(true);
  };
  const loginOpenModal = () => {
    setloginModalOpen(true);
  };
  const joinCloseModal = () => {
    setjoinModalOpen(false);
  };
  const loginCloseModal = () => {
    setloginModalOpen(false);
  };
  return (
    <div className="navbar">
      <button className="buttonStyle" onClick={joinOpenModal}>
        Join
      </button>
      {joinModalOpen && (
        <div className="joinModal">
          <span className="close" onClick={joinCloseModal}>
            &times;
          </span>
          <Join />
        </div>
      )}

      <button className="buttonStyle" onClick={loginOpenModal}>
        Login
      </button>
      {loginModalOpen && (
        <div className="loginModal">
          <span className="close" onClick={loginCloseModal}>
            &times;
          </span>
          <Login />
        </div>
      )}
    </div>
  );
};

export default Navbar;
