import LoginStyles from "./login.module.scss";
import { Input, Button, Popup } from "../../components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Axios } from "../../axios/axios";

export const Login = () => {
  const [isOpenPopup, setIsPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Form validations start

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Username is required")
        .email("Please enter a valid email"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: () => {
      Login();
    },
  });

  //  Form validations end

  // Popup handling start

  const handlePopup = () => {
    setIsPopupOpen(!isOpenPopup)
  }

  useEffect(() => {
    if (isOpenPopup || errorMessage !== "" ) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isOpenPopup, errorMessage])

  // Popup handling end

  // Handling request start

  const { mutate: Login, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: () => Axios("POST", "/auth/sign-in", undefined, undefined, undefined, undefined, formik.values),
    onSuccess: (response) => {
      handlePopup();
      localStorage.setItem("kubix_portal_access_token", response.data.access_token);
    },
    onError: (error: any) => {
      setErrorMessage(error.response.data.message)
    },
  })

  //  Handling request end

  return (
    <div className={LoginStyles.container}>
      <div className={LoginStyles.information} id={LoginStyles.information}>
        <h1 id={LoginStyles.head_text}>Welcome Back!</h1>
        <div className={LoginStyles.media_container}>
          <div className={LoginStyles.media}>
            <img src="/png/google.png" alt="google icon" />
          </div>
          <div className={LoginStyles.media}>
            <img src="/svg/facebook.svg" alt="facebook icon" />
          </div>
          <div className={LoginStyles.media}>
            <img src="/svg/linkedin.svg" alt="linkedin icon" />
          </div>
        </div>
        <div className={LoginStyles.grey_line}>
          <span>or</span>
        </div>
        <form className={LoginStyles.input_container} onSubmit={formik.handleSubmit}>
          <Input
            label="Email"
            name="email"
            placeholder="example@gmail.com"
            source="/png/@.png"
            type="text"
            value={formik.values.email}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email !== undefined}
            errorMessage={formik.errors.email}
          />
          <div className={LoginStyles.password_input}>
            <Input
              label="Password"
              name="password"
              placeholder="********"
              source="/png/lock.png"
              passwordInput={true}
              value={formik.values.password}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              error={formik.touched.password && formik.errors.password !== undefined}
              errorMessage={formik.errors.password}
            />
            <p>Forget Password?</p>
          </div>
          <Button className="black-button" label="Log in" type="submit" isPending={isPending} />
        </form>
        <p
          className={LoginStyles.open_account_text}
          id={LoginStyles.open_account_text}
        >
          Don’t have an account? <span>Open Account!</span>
        </p>
      </div>
      <div className={LoginStyles.page_gif}>
        <img src="/gif/login.gif" alt="login gif" />
      </div>
      {
        (isOpenPopup || errorMessage !== "") && <div className={LoginStyles.blur_div}></div>
      }
      {
        isOpenPopup && 
        <div className={LoginStyles.popup}>
          <Popup headText="Congrulations!" buttonLabel="Next" openedPopup={isOpenPopup} source="/gif/success.gif" buttonHandler={handlePopup} />
        </div>
      }
      {
        errorMessage !== "" && 
        <div className={LoginStyles.popup}>
          <Popup headText={errorMessage} buttonLabel="Try Again" openedPopup={errorMessage !== ""} source="/gif/error.gif" buttonHandler={() => setErrorMessage("")} />
        </div>
      }
    </div>
  );
};
