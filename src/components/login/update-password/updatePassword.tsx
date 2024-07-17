import UpdateStyles from "./updatePassword.module.scss";
import { Input, Button } from "../../../components";

export const UpdatePassword = () => {
  return (
    <div className={`onboard-container ${UpdateStyles.container}`}>
      <div className={`card-container ${UpdateStyles.card}`}>
        <div className={UpdateStyles.card_header}>
          <h1 className="head-text">Update your password</h1>
          <Input
            label="Create new password"
            name="password"
            placeholder="example@gmail.com"
            source="/png/lock.png"
            passwordInput
          />
          <Input
            label="Confirm password"
            name="password"
            placeholder="example@gmail.com"
            source="/png/lock.png"
            passwordInput
          />
        </div>
        <div className={UpdateStyles.button_container}>
          <Button
            className="black-button"
            label="Confirm"
          />
        </div>
        <p
          className="checking_account_text"
          id={UpdateStyles.checking_account_text}
        >
          Don’t have an account? <span>Open Account!</span>
        </p>
      </div>
      <div className="page-gif">
        <img src="/gif/forget-password.gif" alt="forget-password gif" />
      </div>
    </div>
  );
};