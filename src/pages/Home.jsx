import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="bg-gray-100 min-h-screen pt-16 flex">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div className={`flex-1 transition-all ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <Dashboard />
      </div>
    </div>
  );
};

export default Home;


// import { useState } from "react";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";

// const Home = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

//   return (
//     <div className="bg-gray-100 min-h-screen pt-16">
//       <Navbar toggleSidebar={toggleSidebar} />
//       <Sidebar isSidebarOpen={isSidebarOpen} />
//     </div>
//   );
// };

// export default Home;
