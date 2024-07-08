import React, { memo } from "react";
import "../styles/Product.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addItem } from "../features/cart/cartSlice";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store.cart);

  const addToCart = async (_id, amount, totalAmount) => {
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
      } else {
        return;
      }
    }
  };
  return (
    <div key={product._id} className="product-info">
      <Link to={`/products/${product._id}`}>
        <img
          src={product.images[0]}
          alt="product-img"
          className="product-img"
        />
      </Link>
      <p className="product-name">{product.name}</p>
      <p className="product-price">
        <i className="fa-solid fa-dollar-sign"></i>
        {product.price}
      </p>
      <button
        className="add-btn"
        onClick={() => addToCart(product._id, 1, product.totalAmount)}
      >
        Add to cart
      </button>
    </div>
  );
};
export default memo(Product);
