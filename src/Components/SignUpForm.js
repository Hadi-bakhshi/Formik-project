import { useFormik } from "formik";

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
            onChange={formik.handleChange}
          />
        </div>
        <div className="formControl">
          <label>Email</label>
          <input
            type="email"
            value={formik.values.email}
            name="email"
            onChange={formik.handleChange}
          />
        </div>
        <div className="formControl">
          <label>Password</label>
          <input
            type="password"
            value={formik.values.password}
            name="password"
            onChange={formik.handleChange}
          />
        </div>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
