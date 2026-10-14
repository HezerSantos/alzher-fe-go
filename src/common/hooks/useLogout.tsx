import { useCallback } from "react";
import defaultContent from "../../content/defaultNav";
import { useAppDispatch } from "../../reducers/hooks";
import { useLogoutMutation } from "../../services/authService";
import { logout } from "../../reducers/authSlice";
import { setToast } from "../../reducers/toastSlice";
import { useNavigate } from "react-router-dom";
const useLogout = () => {
  const dispatch = useAppDispatch();
  const [logoutUser] = useLogoutMutation();
  const navigate = useNavigate();
  const userLogout = useCallback(async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      dispatch(
        setToast({
          msg: defaultContent.toast.logoutSuccess,
          error: false,
        }),
      );
      navigate("/");
    } catch {
      dispatch(
        setToast({
          msg: defaultContent.toast.logoutError,
          error: true,
        }),
      );
    }
  }, [dispatch, logoutUser]);

  return { userLogout };
};

export default useLogout;
