import { useCallback, useEffect, useState, type ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../reducers/hooks";
import Unauthorized from "../../Pages/Errors/Unauthorized";

import LoadingBar from "../common/LoadingBar/LoadingBar";
import { login, logout } from "../../reducers/authSlice";
import { useRefreshMutation } from "../../services/authService";

interface AuthLayerProps {
  children: ReactNode;
  disableUnauthorizedPage?: boolean;
}
const AuthLayer = ({ children, disableUnauthorizedPage }: AuthLayerProps) => {
  const auth = useAppSelector((s) => s.auth);
  const [refreshUser, { isLoading, isError }] = useRefreshMutation();
  const dispatch = useAppDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  const refreshToken = useCallback(async () => {
    try {
      const refreshResponse = await refreshUser().unwrap();

      dispatch(
        login({
          token: refreshResponse.token,
          expiresAt: refreshResponse.expiresAt,
          id: refreshResponse.userId,
          email: refreshResponse.email,
          issuedAt: refreshResponse.issuedAt,
        }),
      );
    } catch {
      return;
    } finally {
      setAuthChecked(true);
    }
  }, []);

  useEffect(() => {
    if (isError) {
      dispatch(logout());
      return;
    }
    if (auth.isAuthorized || Date.now() < auth.expiresAt * 1000) {
      setAuthChecked(true);
    } else {
      refreshToken();
    }

    const interval = setInterval(
      () => {
        refreshToken();
      },
      10 * 60 * 1000,
    );

    return () => {
      clearInterval(interval);
    };
  }, [refreshUser, dispatch, isError]);

  if (!authChecked || isLoading) {
    return (
      <div
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoadingBar loading={true} />
      </div>
    );
  }

  if ((!auth.isAuthorized || isError) && !disableUnauthorizedPage) {
    return <Unauthorized />;
  }
  return children;
};

export default AuthLayer;
