// RoleRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleRoute = ({ allowedRoles, children, fallback }) => {
  const auth = useAuth();

  if (!auth) return <Navigate to="/login" replace />; // Not logged in

  if (allowedRoles.includes(auth.role)) {
    return <>{children}</>; // Authorized
  }

  return fallback || <Navigate to="/home" replace />; // Unauthorized
};

export default RoleRoute;
