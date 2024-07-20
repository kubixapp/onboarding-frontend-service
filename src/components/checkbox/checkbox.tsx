import { FC, useState } from "react";
import CheckboxStyles from "./checkbox.module.scss";

interface CheckboxProps {
  label: string;
}

export const Checkbox: FC<CheckboxProps> = ({ label }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckbox = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className={CheckboxStyles.checkbox_main}>
      <input className={CheckboxStyles.checkbox_input} type="checkbox" checked={isChecked} onChange={handleCheckbox} />
      <div className={`${CheckboxStyles.custom_checkbox} ${isChecked ? CheckboxStyles.checkbox_active : "" }`} onClick={handleCheckbox}>
        <img className={`${CheckboxStyles.checkbox_image} ${isChecked ? CheckboxStyles.checkbox_image_active : ""}`} src="/png/success.png" alt="success icon" />
      </div>
      <p className={CheckboxStyles.checkbox_label}>{label}</p>
    </div>
  );
};
