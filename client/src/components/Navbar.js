import React, { useEffect, useRef, useState } from "react";
import "../styles/Navbar.scss";
import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [name, setName] = useState("");
  const [productsOption, setProductsOption] = useState([]);
  const { amount } = useSelector((store) => store.cart);
  const userName = localStorage.getItem("username") || null;
  const searchFocus = useRef();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const getProductsOption = async () => {
    if (name !== "") {
      try {
        const response = await fetch(
          process.env.REACT_APP_LOCALHOST_PRODUCT_API_URL +
            `/products?name=${name}`
        );
        const responseData = await response.json();
        const data = responseData.products;
        setProductsOption(data);
      } catch (error) {
        console.log(error);
      }
    } else {
      setProductsOption([]);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getProductsOption();
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [name]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
  };

  return (
    <div className="navbar">
      <div className="navbar-header">
        <div className="menu-btn-container">
          <button className="menu-btn" onClick={() => setShowSidebar(true)}>
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
        <div className="navbar-logo-container">
          <Link to="/">
            <img src={logo} alt="logo" className="logo-img" />
          </Link>
        </div>
        <div className="navbar-search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            ref={searchFocus}
          />
          <button className="search-icon-btn">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
          {productsOption.length > 0 && (
            <div className="products-option">
              {productsOption.map((product) => {
                return (
                  <Link
                    to={`/products/${product._id}`}
                    key={product._id}
                    className="link-name"
                    onClick={() => setName("")}
                  >
                    <img src={product.images[0]} alt="img" className="image" />
                    <span className="name">{product.name}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
        <div className="navbar-usercart-container">
          <div className="navbar-user">
            {userName ? (
              <>
                <p
                  className="username"
                  onClick={() => setShowDropDown(!showDropDown)}
                >
                  {userName}
                </p>
                <div
                  className={`login-signup-container ${
                    showDropDown && "show-dropdown"
                  }`}
                >
                  <Link to="/orders">My Orders</Link>
                  <Link to="/login" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              </>
            ) : (
              <>
                <button
                  className="user-icon-btn"
                  onClick={() => setShowDropDown(!showDropDown)}
                >
                  <i className="fa-solid fa-user"></i>
                </button>
                <div
                  className={`login-signup-container ${
                    showDropDown && "show-dropdown"
                  }`}
                >
                  <Link to="/login">Log in</Link>
                  <Link to="/signup">Sign up</Link>
                </div>
              </>
            )}
          </div>

          <Link to="/cart" className="navbar-cart">
            <button className="cart-icon-btn">
              <i className="fa-solid fa-cart-shopping">
                <p className="amount">{amount}</p>
              </i>
            </button>
          </Link>
        </div>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/" className="link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about-us" className="link">
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className="link">
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className="link">
            Contact
          </NavLink>
        </li>
      </ul>
      <div className={`sidebar ${showSidebar && "show-sidebar"}`}>
        <div
          className={`sidebar-container ${
            showSidebar && "show-sidebar-container"
          }`}
        >
          <div className="sidebar-search">
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className="search-icon-btn">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            {productsOption.length > 0 && (
              <div className="products-option">
                {productsOption.map((product) => {
                  return (
                    <Link
                      to={`/products/${product._id}`}
                      key={product._id}
                      className="link-name"
                      onClick={() => {
                        setName("");
                        setShowSidebar(false);
                      }}
                    >
                      <img
                        src={product.images[0]}
                        alt="img"
                        className="image"
                      />
                      <span className="name">{product.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
          <ul className="sidebar-links">
            <li>
              <NavLink to="/" className="link">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about-us" className="link">
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" className="link">
                Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="link">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
        <button
          className="close-sidebar-btn"
          onClick={() => setShowSidebar(false)}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <button onClick={scrollToTop} className="navbar-scroll-to-top-btn">
        <i className="fa-solid fa-arrow-up"></i>
      </button>
    </div>
  );
};
