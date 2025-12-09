import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedMemberRoute = ({ children, adminRoute = false }) => {

  const fullName = sessionStorage.getItem('fullName');

  // For regular member routes, check if the user is authenticated
  if (fullName) {
    return children;  // Member authenticated, allow access
  } else {
    return <Navigate to="/membershiplogin" />;  // Redirect to membership login
  }
};

export default ProtectedMemberRoute;