import React from "react";
import { Dashboard } from "../components/Dashboard";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

export const HomePage = () => {
  return (
    <div>
      <Sidebar link="" />
      <Header />
      <Dashboard />
    </div>
  );
};
