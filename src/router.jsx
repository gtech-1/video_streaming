import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import SignIn from "./pages/Auth/SignIn";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import Userlist from "./pages/Userlist";
import Dashboard from "./components/Dashboard";
import CourseVideos from "./components/CourseVideos";

const router = createBrowserRouter([
  { path: "/", element: <SignIn /> },
  { path: "/login", element: <Login /> },
  {
    path: "/home",
    element: <Home />,
    children: [
      { path: "homepage", element: <HomePage /> },
      { path: "menu", element: <MenuPage /> },
      { path: "userlist", element: <Userlist /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "courses/:id", element: <CourseVideos /> },
    ],
  },
]);

export default router;
