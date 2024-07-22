import { Link } from "react-router-dom";
import { Input, Button, Select, Checkbox } from "../../../components";
import CompleteStyles from "./complete.module.scss";
import { FC } from "react";

interface CompleteProps {
  dataHandler: (name: string, value: string) => void,
  apiHandler: () => void,
  apiPending: boolean,
}

export const Complete: FC<CompleteProps> = ({dataHandler, apiHandler, apiPending}) => {
  const hearOptions = ["Google", "Linkedin", "Google Advertisement"];

  return (
    <div className={`card-container ${CompleteStyles.card}`}>
      <h1 className="head-text">Find your password</h1>
      <div className={CompleteStyles.input_container}>
        <Input
          label="Project name"
          name="projectName"
          placeholder="Kubix"
          source="/png/physics.png"
          type="text"
          handleInputValue={dataHandler}
        />
        <Select
          label="Where did you hear?"
          name="whereDidYouHear"
          placeholder="Where did yoou hear?"
          source="/png/signpost.png"
          options={hearOptions}
          handleSelectValue={dataHandler}
        />
      </div>
      <div className={CompleteStyles.checkbox_container}>
        <Checkbox label="By checking this box, you agree to receive emails for marketing from Kubix" />
        <Checkbox label="By checking this box, you agree our Terms of Service and Privacy Policy and consent to data transfer, hosting, and processing outside of the EU." />
      </div>
      <div className={CompleteStyles.button_container}>
        <Button className="black-button" label="Continue" handler={apiHandler} isPending={apiPending} />
        <p
          className="checking_account_text"
          id={CompleteStyles.checking_account_text}
        >
          Already have an account? <Link to="/">Log in now!</Link>
        </p>
      </div>
    </div>
  );
};
