import { Navigate, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { useAppSelector } from "./store/hooks/useAppSelector";
import { useAppDispatch } from "./store/hooks/useAppDispatch";
import { useEffect } from "react";
import { checkAuthStatus } from "./store/thunks/authThunks";
import LoadingBar from "./components/Common/LoadingBar";
import WeatherPage from "./pages/WeatherPage";

function App() {
  const { isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingBar />;
  }

  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/weather"
          element={
            <ProtectedRoute>
              <WeatherPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
}

export default App;
