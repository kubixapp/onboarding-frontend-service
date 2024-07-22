import { Link } from "react-router-dom";
import { Input, Button, Select } from "../../../components";
import CreateStyles from "./create.module.scss";
import { FC } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface CreateProps {
  sideHandler: () => void,
  dataHandler: (name: string, value: string) => void,
}

export const Create: FC<CreateProps> = ({ sideHandler, dataHandler }) => {
  const typeOptions = ["Work", "Personal", "School"];

  const formik = useFormik({
    initialValues: {
      fullname: "",
      password: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Fullname is required"),
      password: Yup.string().required("Password is reqiured"),
    }),
    onSubmit: () => {
      sideHandler();
    }
  })

  return (
    <form onSubmit={formik.handleSubmit} className={`card-container ${CreateStyles.card}`}>
      <h1 className="head-text">Find your password</h1>
      <div className={CreateStyles.input_container}>
        <Input
          label="Full name"
          name="fullname"
          placeholder="Hazrat Ahmadzada"
          source="/png/user.png"
          type="text"
          required
          handleInputValue={dataHandler}
          value={formik.values.fullname}
          handleBlur={formik.handleBlur}
          handleChange={formik.handleChange}
          error={formik.touched.fullname && formik.errors.fullname !== undefined}
          errorMessage={formik.errors.fullname}
        />
        <Input
          label="Password"
          name="password"
          placeholder="********"
          source="/png/lock.png"
          passwordInput
          required
          handleInputValue={dataHandler}
          value={formik.values.password}
          handleBlur={formik.handleBlur}
          handleChange={formik.handleChange}
          error={formik.touched.password && formik.errors.password !== undefined}
          errorMessage={formik.errors.password}
        />
        <Input
          label="Company Name"
          name="companyName"
          placeholder="Kubix"
          type="text"
          source="/png/physics.png"
          handleInputValue={dataHandler}
        />
        <Select
          label="Select type of use"
          name="typeOfUse"
          placeholder="Select type of use"
          options={typeOptions}
          handleSelectValue={dataHandler}
        />
      </div>
      <div className={CreateStyles.button_container}>
        <Button className="black-button" label="Continue" type="submit" />
        <p
          className="checking_account_text"
          id={CreateStyles.checking_account_text}
        >
          Already have an account? <Link to="/">Log in now!</Link>
        </p>
      </div>
    </form>
  );
};
