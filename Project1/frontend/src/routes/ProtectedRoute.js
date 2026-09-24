import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const authToken = localStorage.getItem('authToken');

  if (!authToken) {
    // If no token is found, redirect to login page
    return <Navigate to="/" />;
  }

  // If token exists, render the children (protected page)
  return children;
};

export default ProtectedRoute;
