// import React, { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import Dashboard from "../components/Dashboard";

// const Home = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsSidebarOpen((prevState) => !prevState);
//   };


//   return (
//     <div className="bg-gray-100 min-h-screen pt-16 flex">
//       <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
//       <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//       <div className={`flex-1 transition-all ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
//         <Dashboard />
//       </div>
//     </div>
//   );
// };

// export default Home;


import React, { useState } from "react";
import { Outlet } from "react-router-dom";
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
      <div className={`flex-1 transition-all ${isSidebarOpen ? "ml-64" : "ml-0"} p-4`}>
      {/* <Dashboard /> */}
        <Outlet /> {/* This will render the selected page */}
      </div>

      {/* Background overlay when sidebar is open on mobile */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 lg:hidden" onClick={toggleSidebar}></div>}
    </div>
  );
};

export default Home;
