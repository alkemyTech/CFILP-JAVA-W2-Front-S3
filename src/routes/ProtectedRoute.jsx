import { Navigate } from "react-router";
import { isAuthenticated } from "../utils/auth";

export function ProtectedRoute({ children }) {
  return isAuthenticated() ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" />
  );
}
