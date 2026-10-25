import type { ReactNode } from "react";
import { useAppSelector } from "../../reducers/hooks";
import NotFound from "../../Pages/Errors/NotFound";

interface ErrorLayerProps {
  children: ReactNode;
}
const ErrorLayer = ({ children }: ErrorLayerProps) => {
  const errors = useAppSelector((s) => s.error);

  if (errors.notFound && false) {
    return <NotFound />;
  }
  return children;
};

export default ErrorLayer;
