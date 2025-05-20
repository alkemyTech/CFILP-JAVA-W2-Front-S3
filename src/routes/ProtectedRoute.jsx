import { Navigate } from "react-router";
import { isAuthenticated } from "../utils/auth";
import { PageContainer } from "../components";

export function ProtectedRoute({ children }) {
  return isAuthenticated() ? (
    <PageContainer>{children}</PageContainer>
  ) : (
    <Navigate to="/login" />
  );
}
