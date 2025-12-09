import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useContext(AuthContext);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
