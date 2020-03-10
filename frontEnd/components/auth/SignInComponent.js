import { useState } from "react";
import { signin } from "../../actions/auth";
import Router from "next/router";
const SignInComponent = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    message: "",
    loading: false,
    showForm: true
  });
  const { email, password, error, message, loading, showForm } = values;
  const handleChange = name => e => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    setValues({ ...values, loading: true, showForm: false, error: false });
    const user = { email, password };
    signin(user).then(resp => {
      if (resp.error) {
        setValues({ ...values, error: resp.error, loading: false });
      } else {
        // save user token to cookie
        // save user info to localStorage
        // authenticate user
        Router.push("/");
      }
    });
  };
  const showLoader = () =>
    loading && <div className="alert alert-info">Loading...</div>;
  const showError = () =>
    error && <div className="alert alert-danger">{error}</div>;
  const showMessage = () =>
    message && <div className="alert alert-success">{message}</div>;
  const signInForm = () =>
    showForm && (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={handleChange("email")}
            className="form-control"
            placeholder="Enter Your Registered Email"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={handleChange("password")}
            className="form-control"
            placeholder="Enter Your Password"
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
      </form>
    );
  return (
    <React.Fragment>
      {showLoader()}
      {showError()}
      {showMessage()}
      {signInForm()}
    </React.Fragment>
  );
};
export default SignInComponent;
