import { useCallback, useEffect } from "react";
import LogoBase from "../../components/common/LogoBase/LogoBase";
import LoginForm from "../../components/Login/LoginForm/LoginForm";
import "./Login.scss";
import { useAppDispatch } from "../../reducers/hooks";
import { useRefreshMutation } from "../../services/authService";
import { login } from "../../reducers/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [refreshUser] = useRefreshMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const refreshToken = useCallback(async () => {
    try {
      const refreshResponse = await refreshUser().unwrap();

      dispatch(
        login({
          token: refreshResponse.token,
          expiresAt: refreshResponse.expiresAt,
          issuedAt: refreshResponse.issuedAt,
          email: refreshResponse.email,
          id: refreshResponse.userId,
        }),
      );
      navigate("/dashboard");
    } catch {
      return;
    }
  }, []);

  useEffect(() => {
    refreshToken();
  }, [refreshUser, dispatch]);
  return (
    <>
      <main className="login-container">
        <LogoBase />
        <LoginForm />
      </main>
    </>
  );
};

export default Login;
