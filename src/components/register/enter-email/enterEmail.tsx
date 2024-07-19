import { Link } from "react-router-dom";
import { Input, Button } from "../../../components";
import EnterStyles from "./enterEmail.module.scss";
import { FC } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface EnterEmailProps {
  handler: () => void;
  setEmail: (email: string) => void;
}

export const EnterEmail: FC<EnterEmailProps> = ({ handler, setEmail }) => {

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email")
    }),
    onSubmit: () => {
      handler()
      setEmail(formik.values.email);
    }
  })
  return (
    <form onSubmit={formik.handleSubmit} className={`card-container ${EnterStyles.card}`}>
      <div className={EnterStyles.card_header}>
        <h1 className="head-text">Enter your email!</h1>
        <div className="media_container">
          <div className="media">
            <img src="/png/google.png" alt="google icon" />
          </div>
          <div className="media">
            <img src="/svg/facebook.svg" alt="facebook icon" />
          </div>
          <div className="media">
            <img src="/svg/linkedin.svg" alt="linkedin icon" />
          </div>
        </div>
        <div className="grey_line">
          <span>or</span>
        </div>
      </div>
      <Input
        label="Enter email address"
        name="email"
        placeholder="example@gmail.com"
        source="/png/@.png"
        type="email"
        required
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        value={formik.values.email}
        error={formik.touched.email && formik.errors.email !== undefined}
        errorMessage={formik.errors.email}
      />
      <Button className="black-button" label="Next" type="submit" />
      <p
        className="checking_account_text"
        id={EnterStyles.checking_account_text}
      >
        Already have an account? <Link to="/">Log in now!</Link>
      </p>
    </form>
  );
};
