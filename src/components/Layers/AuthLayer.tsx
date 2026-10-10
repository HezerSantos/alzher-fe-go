import type { ReactNode } from "react";
import { useAppSelector } from "../../reducers/hooks";
import Unauthorized from "../../Pages/Errors/Unauthorized";

interface AuthLayerProps {
  children: ReactNode;
}
const AuthLayer = ({ children }: AuthLayerProps) => {
  const isAuthorized = useAppSelector((s) => s.auth.isAuthorized);

  if (!isAuthorized) {
    return <Unauthorized />;
  }
  return children;
};

export default AuthLayer;
