import { useAppDispatch } from "../../reducers/hooks";
import { clearToast, setToast } from "../../reducers/toastSlice";

const useToastAdapter = () => {
  const dispatch = useAppDispatch();

  const toastAdapter = (payload: { msg: string; error: boolean }) => {
    dispatch(clearToast());
    setTimeout(() => {
      dispatch(setToast(payload));
    }, 0);
  };

  return toastAdapter;
};

export default useToastAdapter;
