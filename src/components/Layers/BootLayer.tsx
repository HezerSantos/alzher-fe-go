import { useEffect, type ReactNode } from "react";
import config from "../../../config.json";
import type { RootState } from "../../reducers/store";
import { useAppDispatch } from "../../reducers/hooks";
import { setBoot } from "../../reducers/bootSlice";

interface BootLayerProps {
  children: ReactNode;
}

const typedConfig = config as RootState["boot"];

const BootLayer = ({ children }: BootLayerProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setBoot(typedConfig));
  }, []);

  return children;
};

export default BootLayer;
