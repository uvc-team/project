// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // CSS 파일 import
import Logo from './Logo'; // Logo 컴포넌트 import

const Navbar = () => {
    return (
        <div className="navbar">
            <Link to="/" className="logo">
                <Logo /> {/* Logo 컴포넌트 사용 */}
            </Link>
            <div className="nav-links">
                <Link to="/Join">Join</Link>
                <Link to="/login">Login</Link>
            </div>
        </div>
    );
};

export default Navbar;
