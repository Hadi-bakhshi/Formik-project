const SignUpForm = () => {
  return (
    <div>
      <form>
        <div className="formControl">
          <label>Name</label>
          <input type="text" />
        </div>
        <div className="formControl">
          <label>Email</label>
          <input type="email" />
        </div>
        <div className="formControl">
          <label>Password</label>
          <input type="password" />
        </div>
        <button>Sign up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
