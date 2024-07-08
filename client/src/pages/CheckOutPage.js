import React from "react";
import { Navbar } from "../components/Navbar";
import { Checkout } from "../components/Checkout";
import { Footer } from "../components/Footer";

export const CheckOutPage = () => {
  return (
    <>
      <Navbar />
      <Checkout />
      <Footer />
    </>
  );
};
