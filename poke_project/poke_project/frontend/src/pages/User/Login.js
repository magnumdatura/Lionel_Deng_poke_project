import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";

import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    login(email, password);
  }

  // is user authenticated / if yes then Navigate to home page
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="form-group">
          <input
            className="form-control"
            id="email"
            type="email"
            placeholder="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            id="password"
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={handleChange}
            minLength="8"
            required
          />
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button className="btn btn-primary" type="submit">
              Sign In
            </button>
          </div>
        </div>
      </form>
      <div className="w-full max-w-sm">
        <p className="mt-5">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
        <p className="mt-5">
          Forgot your password? <Link to="/resetPassword">Reset Password</Link>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
