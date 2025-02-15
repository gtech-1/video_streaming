import React, { useState } from "react";
import { FaBars, FaHome, FaUsers } from "react-icons/fa";
import { HiOutlineViewGrid } from "react-icons/hi";
import { IoMdListBox } from "react-icons/io";
import "../styles/Sidebar.css"; // Import Sidebar CSS

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true); // State for sidebar visibility

    return (
        <>
            {/* Sidebar Toggle Button (Appears when sidebar is hidden) */}
            {!isOpen && (
                <button className="sidebar-toggle-btn" onClick={() => setIsOpen(true)}>
                    <FaBars size={20} />
                </button>
            )}

            {/* Sidebar */}
            <div className={`sidebar ${isOpen ? "open" : "hidden"}`}>
                {/* Toggle Button inside Sidebar */}
                <div className="sidebar-toggle" onClick={() => setIsOpen(false)}>
                    <FaBars size={20} />
                </div>

                {/* Sidebar Content */}
                <nav>
                    <ul>
                        <li><a href="#"><FaHome className="icon" /> {isOpen && "Home"}</a></li>
                        <li><a href="#"><HiOutlineViewGrid className="icon" /> {isOpen && "Dashboard"}</a></li>
                        <li><a href="#"><IoMdListBox className="icon" /> {isOpen && "Menu"}</a></li>
                        <li><a href="#"><FaUsers className="icon" /> {isOpen && "Users"}</a></li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default Sidebar;
