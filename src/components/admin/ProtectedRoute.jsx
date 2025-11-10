// src/components/admin/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import authService from "../../services/auth";

export default function ProtectedRoute({ children }) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

