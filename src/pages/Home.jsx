import React, { useState } from "react";
import Sidebar from "../components/Sidebar"; // Update the path to Sidebar if necessary
import Navbar from "../components/Navbar"; // Update the path to Navbar if necessary

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {/* Other content of your Home page */}
    </div>
  );
};

export default Home;