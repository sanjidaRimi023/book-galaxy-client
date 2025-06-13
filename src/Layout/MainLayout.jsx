import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "../Components/Footer";

const MainLayout = () => {
  return (
    <>
      <div className="text-2xl">
         <Toaster />
     </div>
      <Navbar />
      <Outlet />
      <Footer/>
    </>
  );
};

export default MainLayout;
