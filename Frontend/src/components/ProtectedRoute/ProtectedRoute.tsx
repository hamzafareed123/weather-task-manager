import { useAppSelector } from "../../store/hooks/useAppSelector";
import { Navigate } from "react-router-dom";
import LoadingBar from "../Common/LoadingBar";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return <LoadingBar />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
