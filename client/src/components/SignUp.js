import React, { useState, useEffect, useRef } from "react";
import "../styles/SignUp.scss";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

export const SignUp = () => {
  const navigate = useNavigate();
  const [signupStatus, setSignupStatus] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const passwordRef = useRef();

  useEffect(() => {
    if (showPassword) {
      passwordRef.current.type = "text";
    } else {
      passwordRef.current.type = "password";
    }
  }, [showPassword]);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(20, "User name must be 20 chanracters or less")
        .required("User name required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email address required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setSignupStatus("pending");
      try {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: values.username,
            email: values.email,
            password: values.password,
          }),
        };
        const response = await fetch(
          process.env.REACT_APP_LOCALHOST_USER_API_URL + "/signup",
          requestOptions
        );
        if (!response.ok) {
          throw new Error("Invalid email or password");
        }
        const responseData = await response.json();
        const { username, token } = responseData;
        localStorage.setItem("username", username);
        localStorage.setItem("token", token);
        resetForm();
        navigate("/");
      } catch (error) {
        setSignupStatus("rejected");
      }
    },
  });

  return (
    <div className="signup">
      <form onSubmit={formik.handleSubmit} className="signup-form">
        <h2 className="signup-title">Sign Up</h2>
        <p className="signup-subtitle">
          Please signup using account detail below
        </p>
        <div className="username-container">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="User name"
            className="username-input"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.username && formik.errors.username ? (
            <p className="username-error">{formik.errors.username}</p>
          ) : null}
        </div>
        <div className="email-container">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email address"
            className="email-input"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="email-error">{formik.errors.email}</p>
          ) : null}
        </div>
        <div className="password-container">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="password-input"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            ref={passwordRef}
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="password-error">{formik.errors.password}</p>
          ) : null}
        </div>
        <div className="show-password-container">
          <input
            type="checkbox"
            id="checkbox"
            checked={showPassword}
            onChange={(e) => setShowPassword(!showPassword)}
            className="checkbox-show-password"
          />
          <label htmlFor="checkbox" className="checkbox-show-password-label">
            Show password
          </label>
        </div>
        {signupStatus === "rejected" ? (
          <p className="signup-rejected">Invalid email or email used</p>
        ) : signupStatus === "pending" ? (
          <p className="signup-pending">Loading...</p>
        ) : null}
        <button type="submit" className="signup-btn">
          Sign Up
        </button>
        <p className="options">
          Already have an Account?
          <Link to="/login" className="link-to-login">
            Login now
          </Link>
        </p>
      </form>
    </div>
  );
};
