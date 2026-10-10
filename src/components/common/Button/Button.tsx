import "./Button.scss";
import { Spinner } from "./Spinner";

interface ButtonProps {
  text: string;
  className?: string;
  onClick?: () => any;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}
const Button = ({
  text,
  className,
  onClick,
  isLoading,
  type = "button",
  disabled,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={
        onClick
          ? () => {
              onClick();
            }
          : () => {}
      }
      disabled={disabled}
      className={`button-component ${className ? className : ""}`}
    >
      {isLoading ? <Spinner /> : <>{text}</>}
    </button>
  );
};

export default Button;
