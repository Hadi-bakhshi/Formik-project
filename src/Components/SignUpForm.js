import { useFormik } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";
import Input from "./common/Input";
import RadioInput from "./common/RadioInput";
import SelectComponent from "./common/SelectComponent";
import CheckBox from "./common/CheckBox";

const CheckBoxOptions = [
  { label: "React.js", value: "react" },
  { label: "Vue.js", value: "vue" },
];
const radioOptions = [
  { label: "Male", value: "0" },
  { label: "Female", value: "1" },
];
const selectOptions = [
  { label: "Select Nationality", value: "" },
  { label: "Iranian", value: "IR" },
  { label: "German", value: "GER" },
  { label: "American", value: "US" },
];

const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  passwordConfirm: "",
  gender: "",
  nationality: "",
  interests: [],
  terms: false,
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
  nationality: Yup.string().required("Choose your nationality"),
  interests: Yup.array().min(1).required("Choose one at least"),
  terms: Yup.boolean()
    .required("Terms and conditions must be accepted.")
    .oneOf([true], "The terms and conditions must be accepted."),
});

const SignUpForm = () => {
  const [formValues, setFormValues] = useState(null);

  const formik = useFormik({
    initialValues: formValues || initialValues,
    onSubmit: (values) => {
      axios.post("http://localhost:3001/users/1")
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
        <SelectComponent
          selectOptions={selectOptions}
          name="nationality"
          formik={formik}
        />
        <RadioInput formik={formik} name="gender" radioOptions={radioOptions} />
        <CheckBox
          formik={formik}
          CheckBoxOptions={CheckBoxOptions}
          name="interests"
        />
        <input
          type="checkbox"
          id="terms"
          name="terms"
          value={true}
          onChange={formik.handleChange}
          checked={formik.values.terms}
        />
        <label htmlFor="terms">Accept the terms and conditions</label>
        {formik.errors.terms && formik.touched.terms && (
          <div className="error">{formik.errors.terms}</div>
        )}
        <button type="submit" disabled={!formik.isValid}>
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
