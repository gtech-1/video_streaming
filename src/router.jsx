import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import SignIn from "./pages/Auth/SignIn";
import MenuPage from "./pages/MenuPage";
import HomePage from "./pages/HomePage"
import Dashboard from "./components/Dashboard";
import CourseVideos from "./components/CourseVideos";
import UserList from "./pages/Userlist";

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
      { path: "courses/:id", element: <CourseVideos /> },
    ],
  },
 
  { path: "/userlist", element: <UserList /> }
]);

export default router;


