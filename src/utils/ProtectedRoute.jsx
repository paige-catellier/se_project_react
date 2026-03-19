import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isLoggedIn }) => {
  if (isLoggedIn) {
    return children;
  } else return <Navigate to="/" replace />;
};

export default ProtectedRoute;
