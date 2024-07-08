import React from "react";
import footerImg from "../assets/logo.png";
import "../styles/Footer.scss";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-underline"></div>
        <div className="footer-info">
          <div className="footer-header">
            <div className="footer-header-logo">
              <img
                src={footerImg}
                alt="footer-logo"
                className="footer-header-img"
              />
            </div>
            <p className="footer-header-subtitle">
              Your satisfaction is our honor
            </p>
          </div>
          <div className="contact-info">
            <h4>CONTACT INFO</h4>
            <div className="info">
              <p>
                <i className="fa fa-map-marker" />
                District 11, Ho Chi Minh City
              </p>
              <p>
                <i className="fa fa-phone" />
                0386 040 650
              </p>
              <p>
                <i className="fa fa-envelope" />
                tuantuong326@gmail.com
              </p>
            </div>
          </div>
          <div className="about-us">
            <h4>ABOUT US</h4>
            <div className="info">
              <p>
                <i className="fa fa-arrow-right" />
                About TGro
              </p>
              <p>
                <i className="fa fa-arrow-right" />
                TGro Devices
              </p>
              <p>
                <i className="fa fa-arrow-right" />
                TGro Science
              </p>
            </div>
          </div>
          <div className="connect-with-us">
            <h4>CONNECT WITH US</h4>
            <div className="info">
              <p>
                <a
                  href="https://www.facebook.com/tuongmt03"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook" />
                  <span>Facebook</span>
                </a>
              </p>
              <p>
                <a
                  href="https://www.instagram.com/tuongmt03"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram" />
                  <span>Instagram</span>
                </a>
              </p>
              <p>
                <a
                  href="https://www.youtube.com/channel/UCrqlbGybg4tPY9NgCLuECsQ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="fab fa-youtube" />
                  <span>Youtube</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
