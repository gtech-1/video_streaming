import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import SignIn from "./pages/Auth/SignIn";
import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/login" element={ <Login />} />
        <Route path="/home" element={ <Home />}/>
        {/* <Route path = "/Navbar" element ={<Navbar/>}/> */}
        {/* <Route path ="/Sidebar" element ={<Sidebar/>}/> */}
      </Routes>
    </BrowserRouter>
  )
  };


// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
// import Home from "./components/Home";


// function App() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <Router>
//       <div className="flex bg-blue-100 min-h-screen">
     
//         <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        
      
//         <div
//           className={`flex-1 flex flex-col justify-center items-center transition-all duration-300 ${
//             isSidebarOpen ? "ml-64" : "ml-0"
//           }`}
//         >
          
//           <Navbar />
          
         
//           <div className="max-w-4xl w-full p-6 mt-4 text-center">
//             <Routes>
//               <Route path="/" element={<Home />} />
            
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// }

export default App;
