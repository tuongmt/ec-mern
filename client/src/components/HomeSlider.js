import React from "react";
import "../styles/HomeSlider.scss";
import slider1 from "../assets/slide1.jpg";
import slider2 from "../assets/slide2.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

export const HomeSlider = () => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    lazyLoad: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 550,
        settings: {
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="home-slider">
      <Slider {...settings}>
        <div className="slider-child">
          <img src={slider1} alt="slider 1" className="slider-img" />
          <div className="slider-text">
            <h1 className="title">TGro Grocery</h1>
            <p className="info">
              Along with the continuous development of world shopping, many
              brands have launched genuine products with a variety of styles,
              designs, colors, sizes...
            </p>
            <Link to="/products">
              <button className="watch-btn">See more</button>
            </Link>
          </div>
        </div>
        <div className="slider-child">
          <img src={slider2} alt="slider 2" className="slider-img" />
          <div className="slider-text">
            <h1 className="title">TGro Grocery</h1>
            <p className="info">
              Along with the continuous development of world shopping, many
              brands have launched genuine products with a variety of styles,
              designs, colors, sizes...
            </p>
            <Link to="/products">
              <button className="watch-btn">See more</button>
            </Link>
          </div>
        </div>
      </Slider>
    </div>
  );
};
