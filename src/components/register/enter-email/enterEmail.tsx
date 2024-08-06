import { Link } from "react-router-dom";
import { Input, Button, Popup } from "../../../components";
import EnterStyles from "./enterEmail.module.scss";
import { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { Axios } from "../../../axios/axios";
import errorsData from "../../../../public/errors.json";
import { Errors } from "../../../model";

interface EnterEmailProps {
  handler: () => void;
  setEmail: (email: string) => void;
}

export const EnterEmail: FC<EnterEmailProps> = ({ handler, setEmail }) => {
  const [errorMessageCode, setErrorMessageCode] = useState("");
  const errors: Errors = errorsData;

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
      sendOtp();
    }
  })

  useEffect(() => {
    if ( errorMessageCode !== "" ) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [errorMessageCode])

  const { mutate: sendOtp, isPending: sendOtpPending } = useMutation({
    mutationKey: ["send-otp"],
    mutationFn: () => Axios("PUT", "/auth/send-otp-email", formik.values.email),
    onSuccess: (response) => {
      setEmail(formik.values.email);
      handler();
      localStorage.setItem("kubix_confirmation_token", response.data);
    },
    onError: (error: any) => {
      setErrorMessageCode(error.response.data.code)
    },
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
      <Button className="black-button" label="Next" type="submit" isPending={sendOtpPending} />
      <p
        className="checking_account_text"
        id={EnterStyles.checking_account_text}
      >
        Already have an account? <Link to="/">Log in now!</Link>
      </p>
      {
        errorMessageCode !== "" && <div className="blur-div"></div>
      }
      {
        errorMessageCode !== "" && 
        <div className="popup">
          <Popup headText={errors[errorMessageCode]} buttonLabel="Try again" openedPopup={errorMessageCode !== ""} source="/gif/error.gif" buttonHandler={() => setErrorMessageCode("")} />
        </div>
      }
    </form>
  );
};
