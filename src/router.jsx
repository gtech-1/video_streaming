import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import SignIn from "./pages/Auth/SignIn";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import UserList from "./pages/UserList"; // Updated to use your UserList component
import Dashboard from "./components/Dashboard";

const router = createBrowserRouter([
  { path: "/", element: <SignIn /> },
  { path: "/login", element: <Login /> },
  {
    path: "/home",
    element: <Home />,
    children: [
      { path: "homepage", element: <HomePage /> },
      { path: "menu", element: <MenuPage /> },
      // Removed the nested userlist route to avoid duplication
      { path: "dashboard", element: <Dashboard /> },
    ],
  },
  // New top-level route for User List
  { path: "/userlist", element: <UserList /> }
]);

export default router;
