import React, { useState } from "react";
import "../styles/Header.scss";
import { Link } from "react-router-dom";

export const Header = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [name, setName] = useState("");
  const userName = localStorage.getItem("username") || null;

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
  };

  return (
    <div className="header">
      <div className="header-container">
        Header
        <div className="navbar-user">
          {userName ? (
            <>
              <p
                className="username"
                onClick={() => setShowDropDown(!showDropDown)}
              >
                Welcome, {userName}
              </p>
              <div
                className={`login-signup-container ${
                  showDropDown && "show-dropdown"
                }`}
              >
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
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
