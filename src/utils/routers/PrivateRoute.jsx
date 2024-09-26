import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuthContext();

  // navigate to home page if user is not logged in
  return isLoggedIn ? children : <Navigate to="/" />;
};

export default PrivateRoute;
