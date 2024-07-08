import React from "react";
import { CreateNewProduct } from "../components/CreateNewProduct";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

export const CreateNewProductPage = () => {
  return (
    <>
      <Sidebar link="products" />
      <Header />
      <CreateNewProduct />
    </>
  );
};
