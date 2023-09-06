import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faDisplay, faUser, faUserPlus,faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import './Navebar.css'; // Import the CSS file
import {  } from '@fortawesome/free-solid-svg-icons';

const navbarItems = [
  { to: "/", icon: faHome, text: "Home" },
  { to: "/webgl", icon: faDisplay, text: "Dashboard" },
  { to: "/profile", icon: faUser, text: "Profile" }, // 이 부분은 실제 라우트에 맞게 변경해주세요.
  { to: "/join", icon: faUserPlus , text:"Join" },   // 이 부분은 실제 라우트에 맞게 변경해주세요.
  { to: "/login", icon: faSignInAlt , text:"Login" },
];

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar_logo">
                {navbarItems.map((item, index) => (
                    <Link key={index} to={item.to}>
                        <FontAwesomeIcon icon={item.icon} />
                        {" "+item.text}
                    </Link>
                ))}
            </div>
        </nav>
    );
}

export default Navbar;