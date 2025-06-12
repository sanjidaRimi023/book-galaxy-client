import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <>
      <Toaster />
      <Navbar />

      <Outlet />
    </>
  );
};

export default MainLayout;
