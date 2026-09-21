import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

const useAppSelector = useSelector.withTypes<RootState>();
const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export { useAppSelector, useAppDispatch };
