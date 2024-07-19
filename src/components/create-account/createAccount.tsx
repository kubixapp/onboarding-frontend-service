import { Create } from "./../create-account";
import CreateAccountStyles from "./createAccount.module.scss";

export const CreateAccount = () => {
  return (
    <div className={`onboard-container ${CreateAccountStyles.container}`}>
      <Create />
      <div className="page-gif">
        <img src="/gif/create-account.gif" alt="forget-password gif" />
      </div>
    </div>
  );
};
