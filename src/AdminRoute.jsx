import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export function AdminRoute({ children }) {
  const { loading, isAdmin } = useContext(AuthContext);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
