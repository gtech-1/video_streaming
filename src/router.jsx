import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import SignIn from "./pages/Auth/SignIn";
import MenuPage from "./pages/MenuPage";
import HomePage from "./pages/HomePage";
import Dashboard from "./components/Dashboard";
import CourseVideos from "./components/CourseVideos";
import UserList from "./pages/Userlist"; // Ensure correct import path
import ProfilePage from "./pages/ProfilePage"; // Import the ProfilePage component

const router = createBrowserRouter([
  { path: "/", element: <SignIn /> },
  { path: "/login", element: <Login /> },
  {
    path: "/home",
    element: <Home />,
    children: [
      { path: "homepage", element: <HomePage /> },
      { path: "menu", element: <MenuPage /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "userlist", element: <UserList /> }, // Moved inside Home
      { path: "courses/:id", element: <CourseVideos /> },
      { path: "profile", element: <ProfilePage /> }, // Added ProfilePage as a child route
    ],
  },
]);

export default router;