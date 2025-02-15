import React, { useState } from "react";
import "../styles/Navbar.css"; // Add Navbar CSS file

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            {/* Logo Section */}
            <div className="nav-logo">📚 Dashboard</div>

            {/* Centered Navigation Links */}
            <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
                <li><a href="/">Home</a></li>
                <li><a href="/courses">Courses</a></li>
                <li><a href="/assignments">Assignments</a></li>
                <li><a href="/profile">Profile</a></li>
                <li><a href="/"> </a></li>
                <li><a href="/"> </a></li>
            </ul>

            {/* Hamburger Menu (Mobile) */}
            <div className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </div>
        </nav>
    );
};

export default Navbar;
