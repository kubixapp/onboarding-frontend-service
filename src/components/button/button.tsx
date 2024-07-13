import { FC } from "react";
import ButtonStyles from "./button.module.scss";

interface ButtonProps {
  label: string;
  className: "black-button" | "white-button";
  handler?: () => void;
  isPending?: boolean;
  type?: "button" | "reset" | "submit"
}

export const Button: FC<ButtonProps> = ({ label, className, handler, isPending, type }) => {
  const handleFunction = () => {
    handler && handler();
  }
  return (
    <button type={type} className={`${ButtonStyles.button} ${className}`} onClick={handleFunction}>
      {isPending ? <img className={ButtonStyles.loading_gif} src="/gif/loading.gif"/> : label}
    </button>
  );
};