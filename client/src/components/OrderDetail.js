import React, { useEffect, useState } from "react";
import "../styles/OrderDetail.scss";
import { Loading } from "./Loading";
import { useParams, Link } from "react-router-dom";

export const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState();

  useEffect(() => {
    getSingleOrder();
  }, []);

  const getSingleOrder = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_LOCALHOST_ORDER_API_URL + `/orders/${id}`
      );
      if (!response.ok) throw new Error("Invalid order id");
      const responseData = await response.json();
      const data = responseData.order;
      console.log(data);
      setOrder(data);
    } catch (error) {
      setOrder();
    }
  };

  if (!order) return <Loading />;
  else {
    const date = new Date(order.createdAt);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const day = date.getDate();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const formattedTime = `${hours % 12}:${String(minutes).padStart(2, "0")} ${
      hours >= 12 ? "pm" : "am"
    } - ${month} ${day}th, ${year}`;
    return (
      <div className="order-detail">
        <h2 className="order-detail-title">Your order information</h2>
        <Link to="/orders" className="back-orders-link">
          Back to orders
        </Link>
        <div className="order-detail-container">
          <div className="shipping-info">
            <h3>Shipping Information</h3>
            <p>
              <span>Name: </span>
              {order.name}
            </p>
            <p>
              <span>Address: </span>
              {order.address}
            </p>
            <p>
              <span>Date: </span>
              {formattedTime}
            </p>
            <p>
              <span>Order total: </span>
              ${order.orderTotal.toFixed(2)}
            </p>
            <p>
              <span>Status: </span>
              {order.status}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="order-info">
              <thead>
                <tr>
                  <th>Products</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Price</th>
                  <th>Total price</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((item) => {
                  const { images, name, amount, price, category } = item;
                  return (
                    <tr key={item._id}>
                      <td className="products-info">
                        <Link to={`/products/${item._id}`}>
                          <img
                            src={images[0]}
                            alt="product-img"
                            className="product-img"
                          />
                        </Link>
                        <Link
                          to={`/products/${item._id}`}
                          className="product-name"
                        >
                          <p>{name}</p>
                        </Link>
                      </td>
                      <td>{category}</td>
                      <td>{amount}</td>
                      <td>${price}</td>
                      <td>${(price * amount).toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
};
