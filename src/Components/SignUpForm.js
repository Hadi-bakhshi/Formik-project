import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Email is not valid").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const SignUpForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="formControl">
          <label>Name</label>
          <input
            type="text"
            value={formik.values.name}
            name="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.name && formik.touched.name && (
            <div className="error">{formik.errors.name}</div>
          )}
        </div>
        <div className="formControl">
          <label>Email</label>
          <input
            type="email"
            value={formik.values.email}
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email && (
            <div className="error">{formik.errors.email}</div>
          )}
        </div>
        <div className="formControl">
          <label>Password</label>
          <input
            type="password"
            value={formik.values.password}
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.touched.password && (
            <div className="error">{formik.errors.password}</div>
          )}
        </div>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
