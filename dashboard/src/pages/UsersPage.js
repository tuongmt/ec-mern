import React from "react";
import { Sidebar } from "../components/Sidebar";
import { Users } from "../components/Users";

export const UsersPage = () => {
  return (
    <div>
      <Sidebar link="users" />
      <Users />
    </div>
  );
};
