import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className="bg-gray-100 min-h-screen pt-16 flex">
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      {/* Sidebar (fixed on desktop, overlays on mobile) */}
      <div className="fixed top-0 left-0 h-full z-50 lg:relative">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Content area - Sidebar only shifts content on large screens */}
      <div className={`flex-1 transition-all ${isSidebarOpen ? "lg:ml-64" : ""} p-4`}>
        <Outlet />
      </div>

      {/* Background overlay when sidebar is open on mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 lg:hidden" onClick={toggleSidebar}></div>
      )}
    </div>
  );
};

export default Home;



