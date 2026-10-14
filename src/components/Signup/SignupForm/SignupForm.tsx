import "./SignupForm.scss";
import defaultContent from "../../../content/signup";
import TextInput from "../../common/TextInput/TextInput";
import Button from "../../common/Button/Button";
import { Link, useNavigate } from "react-router-dom";

import { useCallback, useEffect } from "react";
import { useSignUpMutation } from "../../../services/authService";
import { useAppDispatch, useAppSelector } from "../../../reducers/hooks";
import ToasMessage from "../../common/ToastMessage/ToastMessage";
import { clearToast, setToast } from "../../../reducers/accessSlice";
import useWidth from "../../../common/hooks/useWidth";
import IconLogo from "../../common/Icons/IconLogo/IconLogo";

const Signup = () => {
  const width = useWidth();
  const accessToast = useAppSelector((s) => s.access);
  const dispatch = useAppDispatch();
  const [signUpUser, { isLoading, isError }] = useSignUpMutation();
  const navigate = useNavigate();
  const submitForm = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!e.currentTarget) return;

      const formData = new FormData(e.currentTarget as HTMLFormElement);

      const data = Object.fromEntries(formData);

      const password = (data["password"] as string) ?? "";
      const confirmPassword = (data["confirmPassword"] as string) ?? "";
      const email = (data["email"] as string) ?? "";

      try {
        await signUpUser({
          email,
          password,
          confirmPassword,
        }).unwrap();

        navigate("/");
        dispatch(
          setToast({
            toastType: "",
            isShared: true,
            toastMessage: defaultContent.created,
            color: "green",
          }),
        );
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
          toastType: "signup",
          isShared: false,
          color: "red",
          toastMessage: defaultContent.error,
        }),
      );
    }
  }, [isError]);
  return (
    <div className="signup-content">
      <h1 className="signup-form__header">{defaultContent.header}</h1>
      {width < 1500 && (
        <IconLogo width={"5rem"} height={"5rem"} borderRadius={160} />
      )}
      {accessToast.toastType === "signup" && (
        <ToasMessage
          message={accessToast.toastMessage}
          color={accessToast.color}
          width="22rem"
          dispatchFn={() => clearToast()}
        />
      )}
      <form
        className="signup-form__form"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          submitForm(e);
        }}
      >
        <TextInput
          name="email"
          placeHolder="Email"
          className="signup-form__form__input"
          required
          labelFormat={{
            top: "0.25rem",
            left: "1rem",
            fontSize: "0.75rem",
          }}
        />
        <TextInput
          name="password"
          placeHolder="Password"
          className="signup-form__form__input"
          required
          labelFormat={{
            top: "0.25rem",
            left: "1rem",
            fontSize: "0.75rem",
          }}
        />
        <TextInput
          name="confirmPassword"
          placeHolder="Confirm Password"
          className="signup-form__form__input"
          required
          labelFormat={{
            top: "0.25rem",
            left: "1rem",
            fontSize: "0.75rem",
          }}
        />
        <Button
          type="submit"
          text={defaultContent.create}
          className="signup-form__form__button"
          isLoading={isLoading}
        />
      </form>
      <div className="signup-form__footer">
        <p>{defaultContent.haveAccount}</p>
        <Link to={"/login"}>{defaultContent.login}</Link>
      </div>
    </div>
  );
};

export default Signup;
