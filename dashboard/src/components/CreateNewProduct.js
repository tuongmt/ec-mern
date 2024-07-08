import React, { useState } from "react";
import "../styles/CreateNewProduct.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Utils from "../utils/Utils.js";

export const CreateNewProduct = () => {
  const categoryList = [
    { name: "foods" },
    { name: "beverages" },
    { name: "confectionery" },
  ];
  const qualityList = [{ name: "best seller" }, { name: "most popular" }];
  const [previewImages, setPreviewImages] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      totalAmount: "",
      description: "",
      category: "",
      quality: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please provide product name"),
      price: Yup.string().required("Please proivde product price"),
      category: Yup.string().required("Please provide product category"),
    }),
    onSubmit: (values, { resetForm }) => {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          price: values.price,
          totalAmount: values.totalAmount,
          description: values.description,
          category: values.category,
          quality: values.quality,
          images: previewImages,
        }),
      };
      fetch(
        `${process.env.REACT_APP_LOCALHOST_PRODUCT_API_URL}/products`,
        requestOptions
      )
        .then((res) => {
          Utils.successToast("Product created successfully");
        })
        .catch((error) => {
          Utils.errorToast("Error from server");
        });
      resetForm();
      setPreviewImages([]);
    },
  });

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const base64Images = await Promise.all(
        files.map((file) => Utils.convertToBase64(file))
      );
      setPreviewImages(base64Images);
    }
  };
  return (
    <div className="create-new-product">
      <div className="create-new-product-container">
        <h2> Create New Product</h2>
        <div className="form-container">
          <form onSubmit={formik.handleSubmit} className="form">
            <div className="name-container">
              <label>Product name</label>
              <input
                type="text"
                className="name-input"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.name && formik.errors.name ? (
                <p className="name-error">{formik.errors.name}</p>
              ) : null}
            </div>
            <div className="price-container">
              <label>Price</label>
              <input
                type="text"
                name="price"
                className="price-input"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.price && formik.errors.price ? (
                <p className="price-error">{formik.errors.price}</p>
              ) : null}
            </div>
            <div className="phone-number-container">
              <label>Total amount</label>
              <input
                type="text"
                name="totalAmount"
                className="total-amount-input"
                value={formik.values.totalAmount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="description-container">
              <label>Description</label>
              <input
                type="text"
                name="description"
                className="description-input"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="category-container">
              <label>Category</label>
              <select
                name="category"
                id="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Choose category</option>
                {categoryList.map((item, index) => {
                  return (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
              {formik.touched.category && formik.errors.category ? (
                <p className="category-error">{formik.errors.category}</p>
              ) : null}
            </div>
            <div className="quality-container">
              <label>Quality</label>
              <select
                name="quality"
                value={formik.values.quality}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Choose quality</option>
                {qualityList.map((item, index) => {
                  return (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="images-container">
              <label>Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                name="images"
                className="images-input"
                onChange={handleImageChange}
                onBlur={formik.handleBlur}
              />
              <div className="preview-images-container">
                {previewImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="product-img"
                    className="preview-image"
                  />
                ))}
              </div>
              {formik.touched.images && formik.errors.images ? (
                <p className="images-error">{formik.errors.images}</p>
              ) : null}
            </div>
            <button className="send-btn" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
