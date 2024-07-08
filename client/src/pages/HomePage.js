import React from "react";
import { Navbar } from "../components/Navbar";
import { HomeSlider } from "../components/HomeSlider";
import { HomeProducts } from "../components/HomeProducts";
import { Footer } from "../components/Footer";

export const HomePage = () => {
  return (
    <>
      <Navbar />
      <HomeSlider />
      <HomeProducts
        quality="best seller"
        title="Best Seller"
        icon="fa-sharp fa-solid fa-bolt"
      />
      <HomeProducts
        quality="most popular"
        title="Most Popular"
        icon="fa-solid fa-fire-flame-curved"
      />
      <Footer />
    </>
  );
};
