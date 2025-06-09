import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, getCurrentUser } from '../utils/auth';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  const isAuth = isAuthenticated();
  const user = getCurrentUser();
  
  // If not authenticated, redirect to login with return path
  if (!isAuth || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user's role is not allowed, redirect to dashboard
  if (!allowedRoles.includes(user.userType)) {
    return <Navigate to="/home/dashboard" replace />;
  }

  // If we're using a render prop pattern, pass the userType
  if (typeof children === 'function') {
    return children({ userType: user.userType });
  }

  return children;
};

export default ProtectedRoute; 