
import React from "react";
import { useState, useRef, useEffect } from "react";
import { Bell, ChevronDown, Globe, Search, User } from "lucide-react";
import { motion } from "framer-motion";


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

const Navbar = () => {
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

  return (
    <nav className="fixed w-full top-0 z-10 bg-blue-500 text-white px-4 sm:px-6 py-3 flex items-center justify-between shadow-lg">

      <div className="w-16 sm:w-20"></div>

     <div className="flex items-center space-x-4 sm:space-x-6 ml-auto w-full justify-end">
        
        <div className="relative flex items-center" ref={searchRef}>
         
          <div className="sm:hidden">
            {isSearchOpen ? (
              <motion.input
                type="text"
                placeholder="Search"
                className="w-40 max-w-xs py-2 pl-10 pr-4 bg-white text-gray-800 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all text-sm"
                initial={{ width: 40 }}
                animate={{ width: 160 }}
                transition={{ duration: 0.4 }}
              />
            ) : (
              <button onClick={() => setIsSearchOpen(true)} className="sm:hidden">
                <Search className="text-white" size={18} />
              </button>
            )}
          </div>

          <div className="hidden sm:flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="w-56 md:w-64 lg:w-72 xl:w-80 py-1.5 pl-8 pr-3 bg-white text-gray-800 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm border border-gray-300 hover:bg-gray-100"
            />
          </div>
        </div>

        <div className="relative flex items-center" ref={notifRef}>
          <button onClick={() => setIsNotifOpen(!isNotifOpen)} className="relative">
            <Bell className="text-white hover:text-gray-200 transition-all" size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          {isNotifOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 mt-3 w-48 sm:w-64 bg-white text-gray-800 border rounded-lg shadow-lg p-4"
              style={{ top: "100%" }}
            >
              <p className="text-sm">No new notifications</p>
            </motion.div>
          )}
        </div>

        
        <div className="relative" ref={langRef}>
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center space-x-1 text-white hover:text-gray-200 transition-all"
          >
            <Globe size={20} />
            <ChevronDown size={14} />
          </button>
          {isLangOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 mt-3 w-40 sm:w-48 bg-white text-gray-800 border rounded-lg shadow-lg"
            >
              <ul className="p-2">
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">English</li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Hindi</li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">French</li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Spanish</li>
              </ul>
            </motion.div>
          )}
        </div>

      
        <div className="relative" ref={userRef}>
          <button onClick={() => setIsUserOpen(!isUserOpen)} className="flex items-center space-x-2">
            <User className="text-white hover:text-gray-200 transition-all" size={22} />
          </button>
          {isUserOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 mt-3 w-48 sm:w-56 bg-white text-gray-800 border rounded-lg shadow-lg"
            >
              <ul className="p-2">
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Profile</li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Dashboard</li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Settings</li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Logout</li>
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

