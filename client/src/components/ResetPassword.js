import React, { useEffect, useRef, useState } from "react";
import "../styles/ResetPassword.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";

export const ResetPassword = () => {
  const { id } = useParams();
  const [resetStatus, setResetStatus] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const passwordRef = useRef();

  useEffect(() => {
    if (showPassword) passwordRef.current.type = "text";
    else passwordRef.current.type = "password";
    console.log(resetStatus);
  }, [showPassword]);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Password required")
        .min(8, "Password must be at least 8 characters"),
      confirmPassword: Yup.string()
        .required("Confirm password required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      try {
        setResetStatus("pending");
        const requestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${id}`,
          },
          body: JSON.stringify({
            password: values.password,
          }),
        };
        const response = await fetch(
          process.env.REACT_APP_LOCALHOST_USER_API_URL + `/reset-password`,
          requestOptions
        );
        if (!response.ok) {
          throw new Error("Error");
        }
        setResetStatus("fulfilled");
        localStorage.removeItem("resetPasswordToken");
        values.password = "";
        values.confirmPassword = "";
      } catch (error) {
        setResetStatus("rejected");
      }
    },
  });

  return (
    <div className="reset-password">
      <h2 className="title">Reset account password</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="password-container">
          <input
            type="password"
            name="password"
            value={formik.values.password}
            className="password-input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Password"
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
        <div className="confirm-password-container">
          <input
            type="password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            className="confirm-password-input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Confirm password"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <p className="confirm-password-error">
              {formik.errors.confirmPassword}
            </p>
          ) : null}
        </div>
        {resetStatus === "pending" ? (
          <p className="reset-pending">Loading...</p>
        ) : resetStatus === "rejected" ? (
          <p className="reset-rejected">
            There is an error while trying to reset password, try later.
          </p>
        ) : resetStatus === "fulfilled" ? (
          <p className="reset-fulfilled">Reset password successfully</p>
        ) : null}
        <button type="submit" className="reset-password-btn">
          Reset password
        </button>
      </form>
    </div>
  );
};
