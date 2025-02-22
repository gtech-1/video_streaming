import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className="bg-gray-100 min-h-screen pt-16 flex">
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Dashboard moves only on desktop, stays fixed on mobile */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "lg:ml-64" : "ml-0"}`}>
        <Dashboard />
      </div>

      {/* Background overlay when sidebar is open on mobile */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 lg:hidden" onClick={toggleSidebar}></div>}
    </div>
  );
};

export default Home;