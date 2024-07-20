import { useState } from "react";
import { Create, Complete } from "./../create-account";
import CreateAccountStyles from "./createAccount.module.scss";

export const CreateAccount = () => {
  const [completeSide, setCompleteSide] = useState(false);

  const handleSide = () => {
    setCompleteSide(!completeSide);
  };

  return (
    <div className={`onboard-container ${CreateAccountStyles.container}`}>
      {completeSide && (
        <div className="back-button" onClick={handleSide}>
          <img src="/png/arrow.png" alt="arrow icon" />
          Back
        </div>
      )}
      {
        completeSide ? <Complete /> : <Create />
      }
      <div className="page-gif">
        <img src="/gif/create-account.gif" alt="forget-password gif" />
      </div>
    </div>
  );
};
