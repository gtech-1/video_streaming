import { createBrowserRouter, Navigate } from "react-router-dom";
import Landing from "../pages/Landing";
import SignIn from "../pages/Auth/SignIn";
import Login from "../pages/Auth/Login";
import Home from "../pages/Home";
import MenuPage from "../pages/MenuPage";
import ProfilePage from "../pages/ProfilePage"; // Import the ProfilePage component
import RoleRoute from "./RoleRoute";
import OrganisationPage from "../pages/OrganisationPage"
import CourseVideosAdmin from "../components/CourseVideosAdmin";
import UserListWrapper from "./UserListWrapper";
import AuthProtectedRoute from "./AuthProtectedRoute";
import DashboardWrapper from "./DashboardWrapper";

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/signUp", element: <SignIn /> },
  { path: "/login", element: <Login /> },
  {
    path: "/home",
    element: (
      <AuthProtectedRoute>
        <Home />
      </AuthProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" /> },
      { path: "menu", element: <MenuPage /> },
      { path: "dashboard", element: 
      (<RoleRoute allowedRoles={["admin", "user"]}>
            <DashboardWrapper />
          </RoleRoute>) },
      {
        path: "userlist",
        element: (
          <RoleRoute allowedRoles={["admin", "user"]}>
            <UserListWrapper />
          </RoleRoute>
        ),
      },
      { path: "courses/:id", element: <CourseVideosAdmin /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "organisation", element: <OrganisationPage /> },
    ],
  },
]);

export default router;
