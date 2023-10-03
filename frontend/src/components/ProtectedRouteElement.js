import React from "react";
import { Navigate } from "react-router-dom";
const ProtectedRouteElement = ({ element: Element, ...props }) => {
  return props.isLoggedIn ? (
    <Element {...props} />
  ) : (
    <Navigate to="/sign-in" replace />
  );
};

export default ProtectedRouteElement;
