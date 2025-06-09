import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  console.log('ProtectedRoute - User:', user);
  console.log('ProtectedRoute - Allowed Roles:', allowedRoles);
  
  if (!user) {
    console.log('ProtectedRoute - No user found, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.userType)) {
    console.log('ProtectedRoute - User not authorized, redirecting to dashboard');
    return <Navigate to="/home/dashboard" replace />;
  }

  console.log('ProtectedRoute - User authorized, rendering children');
  // If we're using a render prop pattern, we need to pass the userType
  if (typeof children === 'function') {
    return children({ userType: user.userType });
  }

  return children;
};

export default ProtectedRoute; 