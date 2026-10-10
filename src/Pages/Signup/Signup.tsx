import LogoBase from "../../components/common/LogoBase/LogoBase";
import SignupForm from "../../components/Signup/SignupForm/SignupForm";
import "./Signup.scss";

const Signup = () => {
  return (
    <>
      <main className="signup-container">
        <LogoBase />
        <SignupForm />
      </main>
    </>
  );
};

export default Signup;
