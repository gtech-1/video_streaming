// sidebar.jsx
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineViewGrid } from "react-icons/hi";
import { IoMdListBox } from "react-icons/io";
import { LuUsers } from "react-icons/lu";
import { FaBuildingUser } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

// Custom hook to detect desktop (≥1280px)
const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1280);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isDesktop;
};

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const isDesktop = useIsDesktop();
  const sidebarRef = useRef(null);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const sidebarBg = darkMode ? "bg-gray-800" : "bg-gray-200";
  const textColor = darkMode ? "text-white" : "text-gray-900";

  const variants = isDesktop
    ? {
        open: { x: 0, width: 250, transition: { type: "spring", stiffness: 250, damping: 25 } },
        closed: { x: 0, width: 60, transition: { type: "spring", stiffness: 250, damping: 25 } },
      }
    : {
        open: { x: 0, width: 250, transition: { type: "spring", stiffness: 250, damping: 30, bounce: 0 } },
        closed: { x: -250, width: 60, transition: { type: "spring", stiffness: 250, damping: 30, bounce: 0 } },
      };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (window.innerWidth < 640) {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isSidebarOpen) {
          toggleSidebar();
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen, toggleSidebar]);

  // On small screens, if closed, render a slim hidden sidebar for AnimatePresence
  if (!isDesktop && !isSidebarOpen) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          ref={sidebarRef}
          initial="open"
          animate="closed"
          exit="closed"
          variants={variants}
          className={`fixed top-[56px] left-0 bottom-0 ${sidebarBg} ${textColor} pb-3 z-50 flex flex-col`}
        >
          <SidebarContent
            darkMode={darkMode}
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        </motion.div>
      </AnimatePresence>
    );
  }

  return isDesktop ? (
    <motion.div
      ref={sidebarRef}
      initial={false}
      animate={isSidebarOpen ? "open" : "closed"}
      variants={variants}
      className={`fixed top-[56px] left-0 bottom-0 ${sidebarBg} ${textColor} pb-3 z-50 flex flex-col`}
    >
      <SidebarContent
        darkMode={darkMode}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
    </motion.div>
  ) : (
    <AnimatePresence mode="wait">
      {isSidebarOpen && (
        <motion.div
          ref={sidebarRef}
          initial="closed"
          animate="open"
          exit="closed"
          variants={variants}
          className={`fixed top-[56px] left-0 bottom-0 ${sidebarBg} ${textColor} pb-3 z-50 flex flex-col`}
        >
          <SidebarContent
            darkMode={darkMode}
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SidebarContent = ({ darkMode, isSidebarOpen, toggleSidebar }) => {
  return (
    <div className="overflow-y-auto flex-1 mt-2 px-2">
      <nav className="space-y-2">
        <NavItem
          darkMode={darkMode}
          icon={<HiOutlineViewGrid size={18} />}
          text="Dashboard"
          isSidebarOpen={isSidebarOpen}
          path="/home/dashboard"
          toggleSidebar={toggleSidebar}
        />
        <NavItem
          darkMode={darkMode}
          icon={<IoMdListBox size={18} />}
          text="Menu Page"
          isSidebarOpen={isSidebarOpen}
          path="/home/menu"
          toggleSidebar={toggleSidebar}
        />
        <NavItem
          darkMode={darkMode}
          icon={<LuUsers size={18} />}
          text="User List"
          isSidebarOpen={isSidebarOpen}
          path="/home/userlist"
          toggleSidebar={toggleSidebar}
        />
        <NavItem
          darkMode={darkMode}
          icon={<FaBuildingUser size={18} />}
          text="Organisation"
          isSidebarOpen={isSidebarOpen}
          path="/home/organisation"
          toggleSidebar={toggleSidebar}
        />
      </nav>
    </div>
  );
};

const NavItem = ({ darkMode, icon, text, isSidebarOpen, path, toggleSidebar }) => {
  const handleClick = () => {
    if (window.innerWidth < 640 && toggleSidebar) {
      toggleSidebar();
    }
  };

  const link = (
    <NavLink
      to={path}
      onClick={handleClick}
      className={({ isActive }) =>
        `flex items-center p-[6px] rounded transition-all ${
          isSidebarOpen ? "justify-start" : "justify-center"
        } ${
          isActive
            ? darkMode
              ? "bg-gray-700 border-l-4 border-gray-500"
              : "bg-gray-100 border-l-4 border-gray-400"
            : darkMode
            ? "hover:bg-gray-700"
            : "hover:bg-gray-300"
        }`
      }
    >
      <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
      {isSidebarOpen && <span className="ml-3 text-[15px]">{text}</span>}
    </NavLink>
  );

  return !isSidebarOpen ? <Tippy content={text} placement="right">{link}</Tippy> : link;
};

export default Sidebar;
