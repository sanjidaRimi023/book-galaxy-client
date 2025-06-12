import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "../Components/Footer";

const MainLayout = () => {
  return (
    <>
      <Toaster />
      <Navbar />
      <Outlet />
      <Footer/>
    </>
  );
};

export default MainLayout;
