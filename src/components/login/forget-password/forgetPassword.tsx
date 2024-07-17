import ForgetStyles from "./forgetPassword.module.scss";
import { Input, Button } from "../..";
import { useNavigate } from "react-router-dom";

export const ForgetPassword = () => {

  const navigate = useNavigate();

  const handleButton = () => {
    navigate("/update-password");
  }

  return (
    <div className={`onboard-container ${ForgetStyles.container}`}>
      <div className={`card-container ${ForgetStyles.card}`}>
        <div className={ForgetStyles.card_header}>
          <h1 className="head-text">Find your password</h1>
          <p className="paragraph">
            Lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          </p>
        </div>
        <Input
          label="Enter email address"
          name="email"
          placeholder="example@gmail.com"
          source="/png/gmail.png"
        />
        <div className={ForgetStyles.button_container}>
          <Button className="black-button" label="Submit" handler={handleButton} />
          <p
            className="checking_account_text"
            id={ForgetStyles.checking_account_text}
          >
            Don’t have an account? <span>Open Account!</span>
          </p>
        </div>
      </div>
      <div className="page-gif">
        <img src="/gif/forget-password.gif" alt="forget-password gif" />
      </div>
    </div>
  );
};
