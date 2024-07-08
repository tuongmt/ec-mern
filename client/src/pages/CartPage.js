import React from "react";
import { Navbar } from "../components/Navbar";
import { CartItems } from "../components/CartItems";
import { Footer } from "../components/Footer";

export const CartPage = () => {
  return (
    <>
      <Navbar />
      <CartItems />
      <Footer />
    </>
  );
};
