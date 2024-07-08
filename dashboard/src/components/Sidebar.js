import React, { useState } from "react";
import "../styles/Sidebar.scss";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

export const Sidebar = ({ link }) => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(link);

  const backToDashboard = () => {
    navigate("/home");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <img src={logo} alt="logo-img" onClick={backToDashboard} />
        <Link to="/home">
          <div
            className={`${activeLink === "" && " dashboard-link active"}`}
            onClick={() => setActiveLink("")}
          >
            <i class="fa-solid fa-house" />
            <p>Dashboard</p>
          </div>
        </Link>
        <Link to="/products">
          <div
            className={`${activeLink === "products" && "products-link active"}`}
            onClick={() => setActiveLink("products")}
          >
            <i class="fa-solid fa-box-open" />
            <p>Products</p>
          </div>
        </Link>
        <Link to="/users">
          <div
            className={`${activeLink === "users" && "users-link active"}`}
            onClick={() => setActiveLink("users")}
          >
            <i class="fa-solid fa-user" />
            <p>Users</p>
          </div>
        </Link>
      </div>
    </div>
  );
};
