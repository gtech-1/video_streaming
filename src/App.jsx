import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router"; // Import the updated router

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// import React from "react";
// import Dashboard from "./components/Dashboard";

// function App() {
//   return (
//     <div className="flex justify-center items-center bg-gray-100 min-h-screen">
//       <Dashboard />
//     </div>
//   );
// }

// export default App;


