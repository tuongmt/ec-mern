import React, { useEffect, useState } from "react";
import "../styles/SingleProduct.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { addItem } from "../features/cart/cartSlice";
import { Loading } from "./Loading";
import { toast } from "react-toastify";

export const SingleProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState();
  const [amount, setAmount] = useState(1);
  const { cartItems } = useSelector((store) => store.cart);

  useEffect(() => {
    getSingleProduct();
  }, [id]);

  const getSingleProduct = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_LOCALHOST_PRODUCT_API_URL + `/products/${id}`
      );
      const responseData = await response.json();
      const data = responseData.product;
      setSingleProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  let settings = {
    customPaging: function (i) {
      return (
        <img
          src={singleProduct.images[i]}
          alt="page-img"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      );
    },
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };
  const decreaseAmount = () => {
    setAmount((prevAmount) => {
      if (prevAmount === 1) return prevAmount;
      return prevAmount - 1;
    });
  };
  const increaseAmount = (totalAmount) => {
    if (totalAmount === 0) return;
    setAmount((prevAmount) => {
      if (prevAmount === totalAmount) return totalAmount;
      return prevAmount + 1;
    });
  };
  const handleAmountChange = (e, totalAmount) => {
    let numOfAmount = Number(e.target.value);
    if (totalAmount === 0) return;
    if (isNaN(numOfAmount)) return;
    if (numOfAmount > totalAmount) setAmount(totalAmount);
    else if (numOfAmount <= 0) return;
    else setAmount(numOfAmount);
  };
  const addToCart = (_id, amount, totalAmount) => {
    if (totalAmount === 0) {
      toast("The product is out of stock", {
        type: "error",
        draggable: false,
      });
      return;
    }
    if (amount > totalAmount) {
      toast("Not enough products to add", {
        type: "error",
        draggable: false,
      });
      return;
    } else {
      let flag = false;
      cartItems.forEach((item) => {
        if (item._id === _id) {
          if (item.amount + amount > totalAmount) {
            flag = true;
            toast("The selected quantity exceed your purchase limit", {
              type: "error",
              draggable: false,
            });
          }
        }
      });
      if (!flag) {
        toast("Add to cart successfully", {
          type: "success",
          draggable: false,
        });
        dispatch(addItem({ id: _id, amount, totalAmount }));
      } else return;
    }
  };
  const buyNow = (_id, amount, totalAmount) => {
    if (totalAmount === 0) {
      toast("The product is out of stock", {
        type: "error",
        draggable: false,
      });
      return;
    }
    if (amount > totalAmount) {
      toast("Not enough products to add", {
        type: "error",
        draggable: false,
      });
      return;
    } else {
      let flag = false;
      cartItems.forEach((item) => {
        if (item._id === _id) {
          if (item.amount + amount > totalAmount) {
            flag = true;
            toast("The selected quantity exceed your purchase limit", {
              type: "error",
              draggable: false,
            });
          }
        }
      });
      if (!flag) {
        toast("Add to cart successfully", {
          type: "success",
          draggable: false,
        });
        dispatch(addItem({ id: _id, amount, totalAmount }));
        navigate("/cart");
      } else return;
    }
  };
  if (!singleProduct) return <Loading />;
  else {
    const { _id, images, name, price, description, totalAmount } =
      singleProduct;
    return (
      <div className="single-product">
        <div className="single-product-container">
          {images.length > 1 ? (
            <Slider {...settings}>
              {images.map((item, index) => {
                return (
                  <div className="product-img-container" key={index}>
                    <img src={item} alt="product-img" className="product-img" />
                  </div>
                );
              })}
            </Slider>
          ) : (
            <div className="product-img-container">
              <img src={images[0]} alt="product-img" className="product-img" />
            </div>
          )}
          <div className="product-info-container">
            <p className="product-name">{name}</p>
            {totalAmount > 0 ? (
              <p className="available-products">
                {totalAmount} available products
              </p>
            ) : (
              <p className="out-of-stock">Out of stock</p>
            )}
            <p className="product-price">
              <i className="fa-solid fa-dollar-sign" />
              {price}
            </p>
            <p className="product-description">{description}</p>
            <div className="product-quantity">
              <button onClick={decreaseAmount}>
                <i className="fa-solid fa-minus" />
              </button>
              <input
                type="text"
                className="amount"
                value={amount}
                onChange={(e) => handleAmountChange(e, totalAmount)}
              />
              <button onClick={() => increaseAmount(totalAmount)}>
                <i className="fa-solid fa-plus" />
              </button>
            </div>
            <button
              className="add-btn"
              onClick={() => addToCart(_id, amount, totalAmount)}
            >
              Add to cart
            </button>
            <button
              className="buy-btn"
              onClick={() => buyNow(_id, amount, totalAmount)}
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
    );
  }
};
