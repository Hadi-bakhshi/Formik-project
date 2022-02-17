import { useState } from "react";

const SignUpForm = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeHadler = ({ target }) => {
    setUserData({
      ...userData,
      [target.name]: target.value,
    });
  };

  const submitHandler = (e)=>{
    e.preventDefault();
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="formControl">
          <label>Name</label>
          <input
            type="text"
            value={userData.name}
            name="name"
            onChange={changeHadler}
          />
        </div>
        <div className="formControl">
          <label>Email</label>
          <input
            type="email"
            value={userData.email}
            name="email"
            onChange={changeHadler}
          />
        </div>
        <div className="formControl">
          <label>Password</label>
          <input
            type="password"
            value={userData.password}
            name="password"
            onChange={changeHadler}
          />
        </div>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
