import { useNavigate } from "react-router-dom";
import AuthForm from "../components/Auth/AuthForm";
import { signupUser } from "../store/thunks/authThunks";
import { useAppDispatch } from "../store/hooks/useAppDispatch";
import { useAppSelector } from "../store/hooks/useAppSelector";
import { useEffect } from "react";


const SignupPage = () => {
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

  const handleSignup = async (data: Record<string, string>) => {
    console.log("SignUp data is: ", data);

     await dispatch(
      signupUser({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      }),
    );
  };
  return (
    <>
      <AuthForm
        title="Registration"
        fields={[
          { name: "fullName", label: "Enter Name", type: "text" },
          { name: "email", label: "Enter Email address", type: "email" },
          { name: "password", label: "Enter Password", type: "password" },
        ]}
        submitText="Create Account"
        onSubmit={handleSignup}
        footerLink={{
          text: "Already have account? ",
          linkText: "Login",
          onClick: () => navigate("/login"),
        }}
        error={error}
        isLoading={isLoading}
      />
    </>
  );
};

export default SignupPage;
