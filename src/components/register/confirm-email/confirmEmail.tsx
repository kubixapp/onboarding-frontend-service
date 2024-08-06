import ConfirmStyles from "./confirmEmail.module.scss";
import { Input, Button, Popup } from "../../../components";
import { Link, useNavigate } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { Axios } from "../../../axios/axios";
import errorsData from "../../../../public/errors.json";
import { Errors } from "../../../model";

interface ConfirmEmailProps {
  email: string;
}

export const ConfirmEmail: FC<ConfirmEmailProps> = ({ email }) => {
  const [errorMessageCode, setErrorMessageCode] = useState("");
  const errors: Errors = errorsData

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string()
        .required("Confirmation code is required")
        .length(6, "Confirmation code must be 6 digits"),
    }),
    onSubmit: () => {
      confirmOtp();
    },
  });

  const confirmationToken =
    localStorage.getItem("kubix_confirmation_token") || undefined;

  const { mutate: confirmOtp, isPending: confirmOtpPending } = useMutation({
    mutationKey: ["confirm-otp"],
    mutationFn: () =>
      Axios(
        "PUT",
        "/auth/confirm-otp",
        undefined,
        formik.values.otp,
        confirmationToken
      ),
    onSuccess: () => navigate("/create-account"),
    onError: (error: any) => {
      setErrorMessageCode(error.response.data.code);
    },
  });

  useEffect(() => {
    if (errorMessageCode !== "") {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [errorMessageCode]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={`card-container ${ConfirmStyles.card}`}
    >
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
          Check your spam if you haven't received the code.{" "}
          <span>Receive new code</span>
        </p>
      </div>
      <div className={ConfirmStyles.button_container}>
        <Button
          className="black-button"
          label="Next"
          isPending={confirmOtpPending}
        />
        <p
          className="checking_account_text"
          id={ConfirmStyles.checking_account_text}
        >
          Don’t have an account? <Link to="/register">Open Account!</Link>
        </p>
      </div>
      {errorMessageCode !== "" && <div className="blur-div"></div>}
      {errorMessageCode !== "" && (
        <div className="popup">
          <Popup
            headText={errors[errorMessageCode]}
            buttonLabel="Try again"
            openedPopup={errorMessageCode !== ""}
            source="/gif/error.gif"
            buttonHandler={() => setErrorMessageCode("")}
          />
        </div>
      )}
    </form>
  );
};
