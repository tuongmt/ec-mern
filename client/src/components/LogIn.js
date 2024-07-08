import React, { useEffect, useRef, useState } from "react";
import closeImg from "../assets/close.png";
import "../styles/LogIn.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

export const LogIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loginStatus, setLoginStatus] = useState();
  const [emailStatus, setEmailStatus] = useState();
  const [email, setEmail] = useState("");
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
          process.env.REACT_APP_LOCALHOST_USER_API_URL + "/login",
          requestOptions
        );
        if (!response.ok) {
          throw new Error("Invalid email or password");
        }
        const responseData = await response.json();
        const { username, token } = responseData;
        localStorage.setItem("username", username);
        localStorage.setItem("token", token);
        navigate("/");
      } catch (error) {
        setLoginStatus("rejected");
      }
    },
  });

  const checkEmailFunction = async () => {
    setEmailStatus("pending");
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      };
      const response = await fetch(
        process.env.REACT_APP_LOCALHOST_USER_API_URL + "/forgot-password",
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Invalid email");
      }
      const responseData = await response.json();
      localStorage.setItem(
        "resetPasswordToken",
        responseData.resetPasswordToken
      );
      await sendEmail();
      setEmailStatus("fulfilled");
    } catch (error) {
      setEmailStatus("rejected");
    }
  };

  const sendEmail = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        token: localStorage.getItem("resetPasswordToken"),
      }),
    };
    localStorage.removeItem("resetPasswordToken");
    await fetch(
      process.env.REACT_APP_LOCALHOST_USER_API_URL + "/send-email",
      requestOptions
    );
  };

  return (
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
          {formik.touched.password && formik.errors.password ? (
            <p className="password-error">{formik.errors.password}</p>
          ) : null}
        </div>
        <div className="show-forgot-password">
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
          <button
            type="button"
            className="forgot-password-btn"
            onClick={() => setShowModal(true)}
          >
            Forgot password?
          </button>
        </div>
        {loginStatus === "rejected" ? (
          <p className="login-rejected">Email or password is incorrect</p>
        ) : loginStatus === "pending" ? (
          <p className="login-pending">Loading...</p>
        ) : null}
        <button className="login-btn">Log In</button>
        <p>
          Don't have an Account?
          <Link to="/signup" className="link-to-signup">
            Create account
          </Link>
        </p>
      </form>
      <div className={`modal ${showModal && "show-modal"}`}>
        <div className="modal-container">
          <button
            className="close-modal-btn"
            onClick={() => setShowModal(false)}
          >
            <img src={closeImg} alt="close modal" className="close-img" />
          </button>
          <h2 className="modal-title">Find your Account</h2>
          <p className="modal-subtitle">
            Please enter your email address to search for your account.
          </p>
          <input
            type="text"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="modal-email-input"
          />
          {emailStatus === "rejected" ? (
            <p className="email-rejected">User does not exist</p>
          ) : emailStatus === "fulfilled" ? (
            <p className="email-fulfilled">
              Please check your email and reset your password
            </p>
          ) : emailStatus === "pending" ? (
            <p className="email-pending">Loading...</p>
          ) : null}
          <button className="search-btn" onClick={checkEmailFunction}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};
