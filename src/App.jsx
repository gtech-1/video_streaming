// import "./App.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Auth/Login";
// import SignIn from "./pages/Auth/SignIn";
// import HomePage from "./pages/HomePage";
// import MenuPage from "./pages/MenuPage";
// import Userlist from "./pages/Userlist";
// import Dashboard from "./components/Dashboard";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<SignIn />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/home" element={<Home />}>
//           <Route path="homepage" element={<HomePage />} />
//           <Route path="menu" element={<MenuPage />} />
//           <Route path="userlist" element={<Userlist />} />
//           <Route path="Dashboard" element={<Dashboard/>} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router"; // Import the router

function App() {
  return <RouterProvider router={router} />;
}

export default App;

