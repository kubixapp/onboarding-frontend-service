import ConfirmStyles from "./confirmEmail.module.scss";
import { Input, Button } from "../../../components";
import { Link } from "react-router-dom";
import { FC } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface ConfirmEmailProps {
  handler: () => void;
  email: string;
}

export const ConfirmEmail: FC<ConfirmEmailProps> = ({ handler, email }) => {
  
  const formik = useFormik({
    initialValues: {
      otp: ""
    },
    validationSchema: Yup.object({
      otp: Yup.string()
      .required("Confirmation code is required")
      .length(6, "Confirmation code must be 6 digits")
    }),
    onSubmit: () => {
      handler()
    }
  })

  return (
    <form onSubmit={formik.handleSubmit} className={`card-container ${ConfirmStyles.card}`}>
      <div className={ConfirmStyles.card_header}>
        <h1 className="head-text">Confirm your email address</h1>
        <p className="paragraph">
          Enter the 6-digit code we’have sent you at {email}.
        </p>
      </div>
      <div className={ConfirmStyles.card_main}>
        <Input
          label="Confirmation code"
          name="otp"
          placeholder="123456"
          type="text"
          value={formik.values.otp}
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          error={formik.touched.otp && formik.errors.otp !== undefined}
          errorMessage={formik.errors.otp}

        />
        <p>
          Check your spam if you haven't received the code. <span>Receive new code</span>
        </p>
      </div>
      <div className={ConfirmStyles.button_container}>
        <Button className="black-button" label="Next"  />
        <p
          className="checking_account_text"
          id={ConfirmStyles.checking_account_text}
        >
          Don’t have an account? <Link to="/register">Open Account!</Link>
        </p>
      </div>
    </form>
  );
};
