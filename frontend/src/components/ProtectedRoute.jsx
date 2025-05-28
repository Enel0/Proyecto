import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, roles }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  let userData;
  try {
    userData = JSON.parse(token); // Decodificar el token (JSON string)
  } catch (error) {
    console.error("Error al decodificar el token:", error.message);
    return <Navigate to="/login" />;
  }

  if (!roles.includes(userData.rol)) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
