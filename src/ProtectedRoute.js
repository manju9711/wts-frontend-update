import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Retrieve token and role_name from sessionStorage
  const token = sessionStorage.getItem('token');
  const roleName = sessionStorage.getItem('role_name');

  // Check if the user is an admin and has a valid token
  if (token && roleName === 'admin') {
    return children;  // If authenticated and admin, allow access
  } else {
    // Redirect to the login page if not authenticated or not an admin
    return <Navigate to="/wtsadmin" />;
  }
};

export default ProtectedRoute;


