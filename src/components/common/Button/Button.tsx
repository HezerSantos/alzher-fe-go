import type { ReactNode } from "react";
import "./Button.scss";
import { Spinner } from "./Spinner";

interface ButtonProps {
  text: string;
  className?: string;
  onClick?: () => any;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children?: ReactNode;
}
const Button = ({
  text,
  className,
  onClick,
  isLoading,
  type = "button",
  disabled,
  children,
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
      {children && children}
    </button>
  );
};

export default Button;
