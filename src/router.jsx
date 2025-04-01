import { createBrowserRouter, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import SignIn from "./pages/Auth/SignIn";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import Dashboard from "./components/Dashboard";
import CourseVideos from "./components/CourseVideos";
import UserList from "./pages/Userlist";

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },            
  { path: "/signin", element: <SignIn /> },           
  { path: "/login", element: <Login /> },
  {
    path: "/home",
    element: <Home />,
    children: [
      { index: true, element: <Navigate to="dashboard" /> },
      { path: "menu", element: <MenuPage /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "userlist", element: <UserList /> },
      { path: "courses/:id", element: <CourseVideos /> },
    ],
  },
]);

export default router;

