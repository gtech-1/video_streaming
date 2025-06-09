// router.jsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import SignIn from "./pages/Auth/SignIn";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home";
//import MenuPage from "./pages/MenuPage";
import Dashboard from "./components/Dashboard";
import DashboardAdmin from "./components/Dashboard_Admin";
import CourseVideos from "./components/CourseVideos";
import CourseVideosAdmin from "./components/CourseVideosAdmin";
import UserList from "./pages/Userlist";
import UserListAdmin from "./pages/UserlistAdmin";
import ProfilePage from "./pages/ProfilePage";
import OrganisationPage from "./pages/OrganisationPage";
import MenuPage from "./pages/MenuPage";
import MenuPageAdmin from "./pages/MenuPageAdmin";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/signin", element: <SignIn /> },
  { path: "/login", element: <Login /> },
  {
    path: "/home",
    element: <Home />,
    children: [
      { index: true, element: <Navigate to="dashboard" /> },
      {
        path: "menu",
        element: (
          <ProtectedRoute allowedRoles={["admins", "members"]}>
            {({ userType }) => userType === "admins" ? <MenuPageAdmin /> : <MenuPage />}
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute allowedRoles={["admins", "members"]}>
            {({ userType }) => userType === "admins" ? <DashboardAdmin /> : <Dashboard />}
          </ProtectedRoute>
        ),
      },
      {
        path: "userlist",
        element: (
          <ProtectedRoute allowedRoles={["admins", "members"]}>
            {({ userType }) => userType === "admins" ? <UserListAdmin /> : <UserList />}
          </ProtectedRoute>
        ),
      },
      {
        path: "courses/:id",
        element: (
          <ProtectedRoute allowedRoles={["admins", "members"]}>
            {({ userType }) => userType === "admins" ? <CourseVideosAdmin /> : <CourseVideos />}
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute allowedRoles={["admins", "members"]}>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "organisation",
        element: (
          <ProtectedRoute allowedRoles={["admins", "members"]}>
            <OrganisationPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
