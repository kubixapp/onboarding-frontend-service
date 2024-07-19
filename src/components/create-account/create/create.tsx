import { Link } from "react-router-dom";
import { Input, Button, Select } from "../../../components";
import CreateStyles from "./create.module.scss";

export const Create = () => {
  const typeOptions = ["Work", "Personal", "School"];

  return (
    <div className={`card-container ${CreateStyles.card}`}>
      <h1 className="head-text">Find your password</h1>
      <div className={CreateStyles.input_container}>
        <Input
          label="Full name"
          name="fullname"
          placeholder="Hazrat Ahmadzada"
          source="/png/user.png"
          type="text"
          required
        />
        <Input
          label="Password"
          name="password"
          placeholder="********"
          source="/png/lock.png"
          passwordInput
          required
        />
        <Input
          label="Company Name"
          name="company"
          placeholder="Kubix"
          type="text"
          source="/png/physics.png"
        />
        <Select
          label="Select type of use"
          name="use-type"
          placeholder="Select type of use"
          options={typeOptions}
        />
      </div>
      <div className={CreateStyles.button_container}>
        <Button className="black-button" label="Continue" />
        <p
          className="checking_account_text"
          id={CreateStyles.checking_account_text}
        >
          Already have an account? <Link to="/">Log in now!</Link>
        </p>
      </div>
    </div>
  );
};
