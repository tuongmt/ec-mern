import React, { useEffect, useState } from "react";
import "../styles/CheckOut.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { clearCart } from "../features/cart/cartSlice";
import { Loading } from "./Loading";

export const Checkout = () => {
  const { total, cartItems, amount } = useSelector((store) => store.cart);
  const [cityList, setCityList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);
  const shippingPrice = 5;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [needUpdatingProducts, setNeedUpdatingProducts] = useState();
  const [errorUser, setErrorUser] = useState(false);

  useEffect(() => {
    authenticateUser();
    if (!errorUser) {
      getCityInformation();
      getNeedUpdatingProducts();
    }
  }, []);

  const authenticateUser = async () => {
    setIsLoading(true);
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        process.env.REACT_APP_LOCALHOST_USER_API_URL + "/dashboard",
        requestOptions
      );
      const responseData = await response.json();
      const success = responseData.message;
      if (success !== "success") {
        throw new Error("Invalid user");
      }
      setErrorUser(false);
      setIsLoading(false);
    } catch (error) {
      setErrorUser(true);
      setIsLoading(false);
    }
  };
  const getCityInformation = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_VIETNAM_URL);
      const responseData = await response.json();
      setCityList(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  const getNeedUpdatingProducts = () => {
    let idList = cartItems.map((item) => {
      return item._id;
    });
    let productList = [];
    idList.forEach(async (id) => {
      const response = await fetch(
        process.env.REACT_APP_LOCALHOST_PRODUCT_API_URL + `/products/${id}`
      );
      const responseData = await response.json();
      const data = responseData.product;
      productList.push(data);
    });
    setNeedUpdatingProducts(productList);
  };

  const updateTotalAmountOfProducts = async () => {
    needUpdatingProducts.forEach((product) => {
      cartItems.forEach((item) => {
        if (product._id === item._id) {
          try {
            const putRequestOptions = {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                totalAmount: product.totalAmount - item.amount,
              }),
            };
            fetch(
              process.env.REACT_APP_LOCALHOST_PRODUCT_API_URL +
                `/products/${product._id}`,
              putRequestOptions
            )
              .then((response) => {})
              .catch((error) => {
                console.log(error);
              });
          } catch (error) {
            console.log(error);
          }
        }
      });
    });
  };
  const formik = useFormik({
    initialValues: {
      name: localStorage.getItem("username")
        ? localStorage.getItem("username")
        : "",
      city: "",
      district: "",
      ward: "",
      address: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please provide your name"),
      city: Yup.string().required("Please provide city"),
      district: Yup.string().required("Please provide district"),
      ward: Yup.string().required("Please provide ward"),
      address: Yup.string().required(
        "Please provide address detail (house number, street name...) "
      ),
    }),
    onSubmit: async (values) => {
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          address: `${values.address}, ${values.ward}, ${values.district}, ${values.city}`,
          amount: amount,
          orderTotal: total + shippingPrice,
          status: "Pending",
          cartItems: cartItems,
        }),
      };
      try {
        const response = await fetch(
          process.env.REACT_APP_LOCALHOST_ORDER_API_URL + "/orders",
          requestOptions
        );
        if (!response) throw new Error("Something wrong");
        localStorage.removeItem("cartItems");
        dispatch(clearCart());
        updateTotalAmountOfProducts();
        navigate("/orders");
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleCityChange = (e) => {
    const districts = cityList.filter((city) => city.Name === e.target.value);
    setDistrictList(districts[0].Districts);
    formik.handleChange(e);
  };

  const handleDistrictChange = (e) => {
    const wards = districtList.filter((dist) => dist.Name === e.target.value);
    setWardList(wards[0].Wards);
    formik.handleChange(e);
  };

  if (isLoading) {
    return <Loading />;
  } else if (!token || errorUser) {
    return (
      <div className="login-to-continue">
        <p>Please login to continue</p>
        <Link to="/login" className="login-link">
          Login here
        </Link>
      </div>
    );
  }
  return (
    <div className="checkout-container">
      <div className="checkout-title">
        <h2>Place Your Order</h2>
      </div>
      <div className="checkout-info-container">
        <div className="checkout-info">
          <p>Shipping Information</p>
          <form onSubmit={formik.handleSubmit}>
            <div className="name-info">
              <label>Your name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (
                <p className="name-error">{formik.errors.name}</p>
              ) : null}
            </div>
            <div className="city-info">
              <label>City</label>
              <select
                name="city"
                id="city"
                value={formik.values.city}
                onChange={handleCityChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Choose city</option>
                {cityList.map((item, index) => {
                  return (
                    <option key={index} value={item.Name}>
                      {item.Name}
                    </option>
                  );
                })}
              </select>
              {formik.touched.city && formik.errors.city ? (
                <p className="city-error">{formik.errors.city}</p>
              ) : null}
            </div>
            <div className="district-info">
              <label>District</label>
              <select
                name="district"
                id="district"
                value={formik.values.district}
                onChange={handleDistrictChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Choose district</option>
                {districtList.map((item, index) => {
                  return (
                    <option key={index} value={item.Name}>
                      {item.Name}
                    </option>
                  );
                })}
              </select>
              {formik.touched.district && formik.errors.district ? (
                <p className="district-error">{formik.errors.district}</p>
              ) : null}
            </div>
            <div className="ward-info">
              <label>Ward</label>
              <select
                name="ward"
                id="ward"
                value={formik.values.ward}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Choose ward</option>
                {wardList.map((item, index) => {
                  return (
                    <option key={index} value={item.Name}>
                      {item.Name}
                    </option>
                  );
                })}
              </select>
              {formik.touched.ward && formik.errors.ward ? (
                <p className="ward-error">{formik.errors.ward}</p>
              ) : null}
            </div>
            <div className="address-info">
              <label> Address detail</label>
              <input
                type="text"
                name="address"
                id="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.address && formik.errors.address ? (
                <p className="address-error">{formik.errors.address}</p>
              ) : null}
            </div>
            <button type="submit">Place your order</button>
          </form>
        </div>
        <div className="price-info-container">
          <div className="subtotal">
            <p>Subtotal</p>
            <p>${total.toFixed(2)}</p>
          </div>
          <div className="shipping">
            <p>Shipping</p>
            <p>${shippingPrice.toFixed(2)}</p>
          </div>
          <div className="order-total">
            <p>Order Total</p>
            <p>${(total + shippingPrice).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
