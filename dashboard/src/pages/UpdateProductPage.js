import React from "react";
import { UpdateProduct } from "../components/UpdateProduct";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

export const UpdateProductPage = () => {
  return (
    <>
      <Sidebar link="products" />
      <Header />
      <UpdateProduct />
    </>
  );
};
