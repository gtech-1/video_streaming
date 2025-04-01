import React, { useState, useRef, useEffect } from "react";
import { Bell, ChevronDown, Globe, Search, User, Menu, X, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../redux/themeSlice";

// Custom hook for handling outside clicks
const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const notifRef = useRef(null);
  const langRef = useRef(null);
  const userRef = useRef(null);
  const searchRef = useRef(null);

  useOutsideClick(notifRef, () => setIsNotifOpen(false));
  useOutsideClick(langRef, () => setIsLangOpen(false));
  useOutsideClick(userRef, () => setIsUserOpen(false));
  useOutsideClick(searchRef, () => setIsSearchOpen(false));

  const handleHamburgerClick = () => {
    toggleSidebar();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="fixed w-full top-0 z-10 bg-gray-900 shadow-md text-white px-4 sm:px-6 py-2 flex items-center justify-between">
      {/* Left Side: Hamburger Toggle and Logo */}
      <div className="flex items-center">
        <button onClick={handleHamburgerClick} className="text-white mr-3 flex items-center">
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <img src={logo} alt="Logo" className="h-10 mt-1 ml-1" />
      </div>

      {/* Right Side Navbar Items */}
      <div className="flex items-center space-x-4 sm:space-x-6 ml-auto relative w-full justify-end">
        {/* Desktop Search */}
        {!isSearchOpen && (
          <div className="hidden sm:flex items-center bg-gray-800 rounded-full px-3 py-1 shadow-lg w-[300px] transition-all duration-300 ease-in-out hover:scale-105">
            <Search className="text-gray-400 mr-3" size={18} />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent focus:outline-none text-white placeholder-gray-400 rounded-md"
            />
          </div>
        )}

        {/* Mobile Search */}
        {isSearchOpen ? (
          <motion.div
            ref={searchRef}
            initial={{ width: "50px", opacity: 0 }}
            animate={{ width: "calc(100% - 80px)", opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute left-1/2 transform -translate-x-1/2 bg-gray-800 rounded-md px-3 py-1 shadow-lg flex items-center sm:hidden"
            style={{ maxWidth: "600px" }}
          >
            <Search className="text-gray-400 mr-2" size={18} />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent focus:outline-none text-white placeholder-gray-400"
              autoFocus
            />
            <button onClick={() => setIsSearchOpen(false)}>
              <X className="text-gray-400" size={20} />
            </button>
          </motion.div>
        ) : (
          <button onClick={() => setIsSearchOpen(true)} className="sm:hidden flex items-center justify-center">
            <Search size={18} />
          </button>
        )}

        {/* Other Icons (Hidden on Mobile When Search is Open) */}
        {!isSearchOpen && (
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button 
              onClick={() => dispatch(toggleDarkMode())} 
              className="p-2 rounded bg-gray-200 dark:bg-gray-700"
              >
               {darkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-gray-800" />}
              </button>

            

            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <button onClick={() => setIsNotifOpen(!isNotifOpen)} className="relative flex items-center justify-center">
                <Bell className="hover:text-gray-400 transition-all" size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              {isNotifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-[-20px] mt-2 min-w-[180px] bg-white text-gray-800 border rounded-lg shadow-lg p-3"
                >
                  <p className="text-sm">No new notifications</p>
                </motion.div>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center space-x-1 hover:text-gray-400 transition-all"
              >
                <Globe size={20} />
                <ChevronDown size={14} />
              </button>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 mt-2 min-w-[150px] bg-white text-gray-900 border rounded-lg shadow-lg"
                >
                  <ul className="p-2">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">English</li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Hindi</li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">French</li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Spanish</li>
                  </ul>
                </motion.div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative" ref={userRef}>
              <button onClick={() => setIsUserOpen(!isUserOpen)} className="flex items-center space-x-2">
                <User className="hover:text-gray-400 transition-all" size={22} />
              </button>
              {isUserOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 mt-2 min-w-[150px] bg-white text-gray-900 border rounded-lg shadow-lg"
                >
                  <ul className="p-2">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <Link to="/home/dashboard">Dashboard</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
                      Logout
                    </li>
                  </ul>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
