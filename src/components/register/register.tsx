import RegisterStyles from "./register.module.scss";
import { EnterEmail, ConfirmEmail } from "./../register";
import { useState } from "react";

export const Register = () => {
  const [isConfirmSide, setIsConfirmSide] = useState(false);
  const [email, setEmail] = useState("");

  const handleSide = () => {
    setIsConfirmSide(!isConfirmSide);
  };
  return (
    <div className={`onboard-container ${RegisterStyles.container}`}>
      {!isConfirmSide && (
        <EnterEmail handler={handleSide} setEmail={setEmail} />
      )}
      {isConfirmSide && (
        <div className="back-button" onClick={handleSide}>
          <img src="/png/arrow.png" alt="arrow icon" />
          Back
        </div>
      )}
      {isConfirmSide && <ConfirmEmail handler={handleSide} email={email} />}
      <div className="page-gif">
        <img src="/gif/register.gif" alt="register page gif" />
      </div>
    </div>
  );
};
