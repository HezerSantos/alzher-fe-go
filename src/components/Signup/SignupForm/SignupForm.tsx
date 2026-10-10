import "./SignupForm.scss";
import defaultContent from "../../../content/signup";
import TextInput from "../../common/TextInput/TextInput";
import Button from "../../common/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import useWindowSize from "../../../common/hooks/useWindowSize";
import IconLogo from "../../Icons/IconLogo/IconLogo";
import { useCallback, useEffect } from "react";
import { useSignUpMutation } from "../../../services/authService";
import { useAppDispatch, useAppSelector } from "../../../reducers/hooks";
import ToasMessage from "../../common/ToastMessage/ToastMessage";
import { clearToast, setToast } from "../../../reducers/accessSlice";

const Signup = () => {
  const width = useWindowSize();
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

      const username = (data["username"] as string) ?? "";
      const password = (data["password"] as string) ?? "";
      const email = (data["email"] as string) ?? "";
      const firstName = (data["firstName"] as string) ?? "";
      const lastName = (data["lastName"] as string) ?? "";
      const universityId = (data["universityId"] as string) ?? "";
      try {
        await signUpUser({
          email,
          username,
          firstName,
          lastName,
          universityId,
          password,
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
          name="firstName"
          placeHolder="First name"
          className="signup-form__form__input"
          required
          labelFormat={{
            top: "0.5rem",
            left: "0.5rem",
            fontSize: "0.75rem",
          }}
        />
        <TextInput
          name="lastName"
          placeHolder="Last name"
          className="signup-form__form__input"
          required
          labelFormat={{
            top: "0.5rem",
            left: "0.5rem",
            fontSize: "0.75rem",
          }}
        />
        <TextInput
          name="email"
          placeHolder="Email"
          className="signup-form__form__input"
          required
          labelFormat={{
            top: "0.5rem",
            left: "0.5rem",
            fontSize: "0.75rem",
          }}
        />
        <TextInput
          name="username"
          placeHolder="Username"
          className="signup-form__form__input"
          required
          labelFormat={{
            top: "0.5rem",
            left: "0.5rem",
            fontSize: "0.75rem",
          }}
        />
        <TextInput
          name="password"
          placeHolder="Password"
          className="signup-form__form__input"
          required
          labelFormat={{
            top: "0.5rem",
            left: "0.5rem",
            fontSize: "0.75rem",
          }}
        />
        <TextInput
          name="universityId"
          placeHolder="University of Memphis UUID"
          className="signup-form__form__input"
          required
          labelFormat={{
            top: "0.5rem",
            left: "0.5rem",
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
        <Link to={"/"}>{defaultContent.login}</Link>
      </div>
    </div>
  );
};

export default Signup;
