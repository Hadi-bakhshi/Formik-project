import { useFormik } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";
import Input from "./common/Input";
import RadioInput from "./common/RadioInput";

const radioOptions = [
  { label: "Male", value: "0" },
  { label: "Female", value: "1" },
];

const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  passwordConfirm: "",
  gender: "",
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(6, "Name must be at least 6 characters"),
  email: Yup.string().email("Email is not valid").required("Email is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{11}$/, "Phone number is not valid")
    .nullable(),

  password: Yup.string().required("Password is required"),
  passwordConfirm: Yup.string()
    .required("Password confirmation is required")
    .oneOf([Yup.ref("password"), null], "password must match"),
  gender: Yup.string().required("Gender must be choosen"),
});

const SignUpForm = () => {
  const [formValues, setFormValues] = useState(null);

  const formik = useFormik({
    initialValues: formValues || initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/users/1")
      .then((res) => setFormValues(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Input formik={formik} name="name" label="Name" />
        <Input formik={formik} name="email" label="Email" type="email" />
        <Input formik={formik} name="phoneNumber" label="Phone Number" />
        <Input
          formik={formik}
          name="password"
          label="Password"
          type="password"
        />
        <Input
          formik={formik}
          name="passwordConfirm"
          label="Password Confirmation"
          type="password"
        />
        <RadioInput formik={formik} name="gender" radioOptions={radioOptions} />
        <button type="submit" disabled={!formik.isValid}>
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
