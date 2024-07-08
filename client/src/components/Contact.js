import React from "react";
import "../styles/Contact.scss";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

export const Contact = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      location: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please provide your name"),
      email: Yup.string()
        .required("Please proivde your mail")
        .email("Please provide valid email"),
      phoneNumber: Yup.string()
        .required("Please provide your phone number")
        .min(10, "Please provide valid phone number"),
      location: Yup.string().required("Please provide your location"),
      message: Yup.string().required("Please provide your message"),
    }),
    onSubmit: (values, { resetForm }) => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phoneNumber: Number(values.phoneNumber),
          location: values.location,
          message: values.message,
        }),
      };
      resetForm();
      fetch(
        process.env.REACT_APP_LOCALHOST_MESSAGE_API_URL + "/messages",
        requestOptions
      )
        .then((res) => {
          toast("Messange sent successfully", {
            type: "success",
            draggable: false,
          });
        })
        .catch((error) => {});
    },
  });
  return (
    <div className="contact">
      <div className="contact-container">
        <div className="contact-info">
          <div className="location">
            <i className="fa-solid fa-location-dot" />
            <div className="location-info">
              <h3>Location</h3>
              <p>District 11, Ho Chi Minh City</p>
            </div>
          </div>
          <div className="phone-number">
            <i className="fa-solid fa-phone-volume" />
            <div className="phone-number-info">
              <h3>Phone number</h3>
              <p>0386 040 650</p>
            </div>
          </div>
          <div className="email">
            <i className="fa-solid fa-envelope-open-text" />
            <div className="email-info">
              <h3>Email</h3>
              <p>tuantuong326@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="contact-message">
          <form onSubmit={formik.handleSubmit} className="contact-form">
            <div className="name-container">
              <input
                type="text"
                className="name-input"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Your name"
              />
              {formik.touched.name && formik.errors.name ? (
                <p className="name-error">{formik.errors.name}</p>
              ) : null}
            </div>
            <div className="email-container">
              <input
                type="text"
                name="email"
                className="email-input"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Email"
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="email-error">{formik.errors.email}</p>
              ) : null}
            </div>
            <div className="phone-number-container">
              <input
                type="text"
                name="phoneNumber"
                className="phone-number-input"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Phone number"
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <p className="phone-number-error">
                  {formik.errors.phoneNumber}
                </p>
              ) : null}
            </div>
            <div className="location-container">
              <input
                type="text"
                name="location"
                className="location-input"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Location"
              />
              {formik.touched.location && formik.errors.location ? (
                <p className="location-error">{formik.errors.location}</p>
              ) : null}
            </div>
            <div className="message-container">
              <textarea
                name="message"
                className="message-textarea"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Message"
              />
              {formik.touched.message && formik.errors.message ? (
                <p className="message-error">{formik.errors.message}</p>
              ) : null}
            </div>
            <button className="send-btn" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
