// src/routes/AuthProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const AuthProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");

  if (!user || user === "undefined") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthProtectedRoute;
