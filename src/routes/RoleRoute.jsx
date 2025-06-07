// RoleRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleRoute = ({ allowedRoles, children, fallback }) => {
  const { user } = useAuth(); 
  console.log("RoleRoute user:", user);
  if (!user) return <Navigate to="/login" replace />; // Not logged in

  if (allowedRoles.includes(user.role)) {
    return <>{children}</>; 
  }

  return fallback || <Navigate to="/home" replace />; // Unauthorized
};

export default RoleRoute;
