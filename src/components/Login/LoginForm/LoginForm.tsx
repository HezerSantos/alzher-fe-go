import "./LoginForm.scss";
import defaultContent from "../../../content/login";
import TextInput from "../../common/TextInput/TextInput";
import Button from "../../common/Button/Button";
import { Link, useNavigate } from "react-router-dom";

import { useCallback, useEffect } from "react";
import { useLoginMutation } from "../../../services/authService";
import { useAppDispatch, useAppSelector } from "../../../reducers/hooks";
import { login } from "../../../reducers/authSlice";
import ToasMessage from "../../common/ToastMessage/ToastMessage";
import { clearToast, setToast } from "../../../reducers/accessSlice";
import useWidth from "../../../common/hooks/useWidth";
import IconLogo from "../../common/Icons/IconLogo/IconLogo";
import { setToast as mainSetToast } from "../../../reducers/toastSlice";

const LoginForm = () => {
  const width = useWidth();
  const dispatch = useAppDispatch();
  const accessToast = useAppSelector((s) => s.access);
  const [loginUser, { isLoading, isError, error }] = useLoginMutation();
  const navigate = useNavigate();
  const submitForm = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!e.currentTarget) return;

      const formData = new FormData(e.currentTarget as HTMLFormElement);

      const data = Object.fromEntries(formData);

      const email = (data["email"] as string) ?? "";
      const password = (data["password"] as string) ?? "";

      try {
        const loginResponse = await loginUser({
          email,
          password,
        }).unwrap();

        console.log(loginResponse);
        dispatch(
          login({
            token: loginResponse.token,
            email: loginResponse.email,
            id: loginResponse.userId,
            issuedAt: loginResponse.issuedAt,
            expiresAt: loginResponse.expiresAt,
          }),
        );
        dispatch(
          mainSetToast({
            msg: "Login Successful",
            error: false,
          }),
        );
        navigate("/");
      } catch {
        return;
      }
    },
    [],
  );

  useEffect(() => {
    if (isError) {
      dispatch(
        setToast({
          toastType: "login",
          isShared: false,
          color: "red",
          // 403 = right password, but the sign-up hasn't been approved yet.
          toastMessage:
            error && "status" in error && error.status === 403
              ? defaultContent.pending
              : defaultContent.error,
        }),
      );
    }
  }, [isError, error]);

  return (
    <div className="login-content">
      <h1 className="login-form__header">{defaultContent.header}</h1>
      {width < 1500 && (
        <IconLogo width={"5rem"} height={"5rem"} borderRadius={160} />
      )}
      {(accessToast.isShared || accessToast.toastType === "login") && (
        <ToasMessage
          message={accessToast.toastMessage}
          color={accessToast.color}
          width="22rem"
          dispatchFn={() => clearToast()}
        />
      )}
      <form
        className="login-form__form"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          submitForm(e);
        }}
      >
        <TextInput
          name="email"
          placeHolder="Email"
          className="login-form__form__input"
          labelFormat={{
            top: "0.5rem",
            left: "0.5rem",
            fontSize: "0.75rem",
          }}
        />
        <TextInput
          name="password"
          placeHolder="Password"
          className="login-form__form__input"
          labelFormat={{
            top: "0.5rem",
            left: "0.5rem",
            fontSize: "0.75rem",
          }}
        />
        <div className="login-form__form__opts">
          <div>
            <input type="checkbox" id="login-persist" />
            <label htmlFor="login-persist">{defaultContent.remember}</label>
          </div>
          <Link to={""}>{defaultContent.forgotPassword}</Link>
        </div>
        <Button
          type="submit"
          text={defaultContent.login}
          className="login-form__form__button"
          isLoading={isLoading}
        />
      </form>
      <div className="login-form__footer">
        <p>{defaultContent.noAccount}</p>
        <Link to={"/signup"}>{defaultContent.createAccount}</Link>
      </div>
    </div>
  );
};

export default LoginForm;
