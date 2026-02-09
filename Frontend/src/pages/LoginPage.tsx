import { useNavigate } from "react-router-dom";
import AuthForm from "../components/Auth/AuthForm";
import { useAppDispatch } from "../store/hooks/useAppDispatch";
import { useAppSelector } from "../store/hooks/useAppSelector";
import { useEffect } from "react";
import { loginUser } from "../store/thunks/authThunks";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, isAuthenticated, error } = useAppSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (data: Record<string, string>) => {
    await dispatch(loginUser({ email: data.email, password: data.password }));
  };

  return (
    <>
      <AuthForm
        title="Login"
        submitText="Login"
        fields={[
          { name: "email", label: "Enter Email", type: "email" },
          { name: "password", label: "Enter Password", type: "password" },
        ]}
        onSubmit={handleLogin}
        footerLink={{
          text: "Don't have an account?",
          linkText: "Create Account",
          onClick: () => navigate("/signup"),
        }}
        error={error}
        isLoading={isLoading}
      />
    </>
  );
};

export default LoginPage;
