import { ChangeEvent, FC, useState } from "react";
import InputStyles from "./input.module.scss";

interface InputProps {
  name: string;
  source?: string;
  label: string;
  placeholder: string;
  type?: string;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
  handleInputValue?: (name: string, value: string) => void;
  passwordInput?: boolean;
  value?: string;
  handleChange?: (e: React.ChangeEvent<any>) => void;
  handleBlur?: (e: React.FocusEvent<any, Element>) => void;
}

export const Input: FC<InputProps> = ({
  name,
  label,
  source,
  placeholder,
  type,
  error,
  errorMessage,
  required,
  handleInputValue,
  passwordInput,
  value,
  handleChange,
  handleBlur,
}) => {
  const [visible, setVisible] = useState(false);
  const handleVisibility = () => {
    setVisible(!visible);
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputTargetValue = e.target.value;
    if (handleInputValue) {
      handleInputValue(name, inputTargetValue);
    }
    if (handleChange) {
      handleChange(e);
    }
  };
  return (
    <div className={InputStyles.input_container}>
      <label htmlFor={name} className={error ? InputStyles.error_label : ""}>
        {label}{" "}
        {required && <span className={InputStyles.reqiured_star}>*</span>}
      </label>
      <div
        className={`${InputStyles.password_input} ${
          error ? InputStyles.error_input_container : ""
        }`}
      >
        {source && <img alt="input icon" src={source} />}
        <input
          id={name}
          type={type ? type : visible ? "text" : "password"}
          placeholder={placeholder}
          value={value && value}
          onInput={handleInput}
          className={error ? InputStyles.error_input : ""}
          onBlur={handleBlur}
        />
        {passwordInput && (
          <img
            className={InputStyles.eye_img}
            alt="eye-icon"
            onClick={handleVisibility}
            src={visible ? "/png/eye.png" : "/png/close-eye.png"}
          />
        )}
      </div>
      {error && (
        <div className={InputStyles.error_message}>
          <img src="/png/warning-error.png" alt="warning icon" />
          {errorMessage}
        </div>
      )}
    </div>
  );
};
