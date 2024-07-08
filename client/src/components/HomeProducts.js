import React, { useEffect, useState } from "react";
import "../styles/HomeProducts.scss";
import Slider from "react-slick";
import Product from "./Product";

export const HomeProducts = (props) => {
  const [products, setProducts] = useState();

  const getHomeProducts = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_LOCALHOST_PRODUCT_API_URL + "/products"
      );
      const responseData = await response.json();
      const data = responseData.products.filter(
        (product) => product.quality === props.quality
      );
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getHomeProducts();
  }, []);

  let settings = {
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 2,
    infinite: true,
    speed: 500,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (!products) return;
  return (
    <div className="home-products">
      <div className="home-products-container">
        <div className="home-title">
          <p>{props.title}</p>
          <i className={props.icon}></i>
        </div>
        {products.length > 1 ? (
          <Slider {...settings}>
            {products.map((product) => {
              return <Product product={product} key={product._id} />;
            })}
          </Slider>
        ) : (
          <Product product={products[0]} key={products[0]._id} />
        )}
      </div>
    </div>
  );
};
