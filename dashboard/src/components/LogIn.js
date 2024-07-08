import React, { useEffect, useRef, useState } from "react";
import "../styles/LogIn.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

export const LogIn = () => {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState();
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
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email address required")
        .email("Invalid email address"),
      password: Yup.string()
        .required("Password required")
        .min(8, "Password must be at least 8 characters"),
    }),
    onSubmit: async (values) => {
      setLoginStatus("pending");
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      };
      try {
        const response = await fetch(
          process.env.REACT_APP_LOCALHOST_USER_API_URL + "/login-admin",
          requestOptions
        );
        if (!response.ok) {
          throw new Error("Invalid email or password");
        }
        const responseData = await response.json();
        const { username, token } = responseData;
        localStorage.setItem("username", username);
        localStorage.setItem("token", token);
        navigate("/home");
      } catch (error) {
        setLoginStatus("rejected");
      }
    },
  });

  return (
    <div>
      <div className="login">
        <form onSubmit={formik.handleSubmit} className="login-form">
          <h2 className="login-title">Log In</h2>
          <p className="login-subtitle">
            Please log in using account detail below
          </p>
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
            <button
              type="button"
              className="show-password-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <i class="fas fa-eye" />
              ) : (
                <i class="fas fa-eye-slash" />
              )}
            </button>
            {formik.touched.password && formik.errors.password ? (
              <p className="password-error">{formik.errors.password}</p>
            ) : null}
          </div>
          <div className="show-forgot-password">
            <div className="show-password-container"></div>
          </div>
          {loginStatus === "rejected" ? (
            <p className="login-rejected">Email or password is incorrect</p>
          ) : loginStatus === "pending" ? (
            <p className="login-pending">Loading...</p>
          ) : null}
          <button className="login-btn">Log In</button>
        </form>
      </div>
    </div>
  );
};
