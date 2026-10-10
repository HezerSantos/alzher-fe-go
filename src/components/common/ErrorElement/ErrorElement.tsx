import Button from "../Button/Button";
import IconLogo from "../Icons/IconLogo/IconLogo";
import "./ErrorElement.scss";
interface ErrorElementProps {
  refetch: () => void;
}
const ErrorElement = ({ refetch }: ErrorElementProps) => {
  return (
    <div className="error-element">
      <IconLogo width={"3rem"} height={"3rem"} />
      <p>Oops! Looks like an error occured</p>
      <Button text="Retry" onClick={() => refetch()} />
    </div>
  );
};

export default ErrorElement;
