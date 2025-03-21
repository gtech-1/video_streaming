import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className="bg-gray-100 min-h-screen pt-16 flex relative">
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      {/* Sidebar remains fixed */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {/* 
          On screens >= xl (1280px), the main content will shift right
          when sidebar is open. On screens below xl, it won’t shift, so
          the sidebar overlays the content (like on mobile and iPad Pro).
      */}
      <div
        className={`flex-1 transition-all p-4 ${
          isSidebarOpen ? "xl:ml-64" : "xl:ml-20"
        }`}
      >
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Outlet />
        </motion.div>
      </div>
      {/* Overlay appears on screens smaller than xl */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 xl:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Home;
