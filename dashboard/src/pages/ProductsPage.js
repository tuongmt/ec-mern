import React from "react";
import { Sidebar } from "../components/Sidebar";
import { Products } from "../components/Products";
import { Header } from "../components/Header";

export const ProductsPage = () => {
  return (
    <div>
      <Sidebar link="products" />
      <Header />
      <Products />
    </div>
  );
};
