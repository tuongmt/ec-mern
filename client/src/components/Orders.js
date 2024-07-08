import React, { useEffect, useState } from "react";
import "../styles/Orders.scss";
import { Order } from "./Order";
import { Link } from "react-router-dom";
import { Loading } from "./Loading";

export const Orders = () => {
  const [orders, setOrders] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [errorUser, setErrorUser] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const response = await fetch(
        process.env.REACT_APP_LOCALHOST_ORDER_API_URL + "/orders",
        requestOptions
      );
      const responseData = await response.json();
      const data = responseData.orders;
      if (!data) throw new Error("Invalid user");
      if (data.length === 0) {
        setIsLoading(false);
        return;
      }
      setOrders(data);
      setErrorUser(false);
      setIsLoading(false);
    } catch (error) {
      setErrorUser(true);
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading />;
  else if (!token || errorUser) {
    return (
      <div className="login-to-continue">
        <p>Please login to continue</p>
        <Link to="/login" className="login-link">
          Login here
        </Link>
      </div>
    );
  } else if (!orders)
    return <h2 className="make-order">Please make an order</h2>;
  return (
    <div className="orders-container">
      <div className="orders-title">
        <h2>Your Orders</h2>
      </div>
      <div className="orders-info">
        <div className="total-orders">
          <p>Total Orders:</p>
          <span>{orders.length}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="order-list">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Address</th>
                <th>Products</th>
                <th>Cost</th>
                <th>Date</th>
                <th>Status</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return <Order key={order._id} {...order} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
