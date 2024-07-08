import React from "react";
import "../styles/About.scss";
import aboutImg from "../assets/about-us.jpg";

export const About = () => {
  return (
    <div className="about">
      <div className="about-container">
        <div className="about-header">
          <div className="about-img-container">
            <img src={aboutImg} alt="about-img" className="about-img" />
          </div>
          <div className="about-text">
            <h2 className="title">About TGro Grocery</h2>
            <p className="info">
              "At TGro Grocery, we combine convenience, quality, and innovation
              to provide you with the ultimate grocery shopping experience. In
              today’s fast-paced world, we understand the importance of having a
              reliable place to find everything you need for your household,
              from fresh produce to everyday essentials."
            </p>
          </div>
        </div>
        <div className="about-info">
          <div className="new">
            <img
              src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR4-X23S9lNGCe1qxR_luoTP1bNfgda_RJWhIk5lljLchJBgtc7"
              alt="new-img"
              className="new-img"
            />
            <div className="new-text">
              <h3>100% new product</h3>
              <p>
                We look forward to serving you and making your grocery shopping
                experience delightful and stress-free
              </p>
            </div>
          </div>

          <div className="exchange">
            <img
              src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTg2pGqip3KRMDYqLkbrGGsb0tk1YeuztNft5nfadxvMPk8Hk5D"
              alt="exchange-img"
              className="exchange-img"
            />
            <div className="exchange-text">
              <h3>Return within 7 days</h3>
              <p>
                We look forward to serving you and making your grocery shopping
                experience delightful and stress-free
              </p>
            </div>
          </div>
          <div className="price">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO3elPSNYF3mtdaaUJpYduzOIxSJjuB-c5PuXZ9D1jh5nIfUtu"
              className="price-img"
            />
            <div className="price-text">
              <h3>Good price</h3>
              <p>
                We look forward to serving you and making your grocery shopping
                experience delightful and stress-free
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
