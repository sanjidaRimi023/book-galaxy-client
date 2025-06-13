import React, { Suspense, useContext } from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "../Components/Footer";
import { Authcontext } from "../Context/AuthContext";

import LoadSppiner from "../Components/LoadSppiner";

const MainLayout = () => {
  const{loading} =useContext(Authcontext)
  if (loading) {
    <span>
      <LoadSppiner/>
    </span>
  }
  return (
    <>
      <div className="text-2xl">
         <Toaster />
     </div>
      <Navbar />
      <Suspense fallback={LoadSppiner}>
         <Outlet />
     </Suspense>
      <Footer/>
    </>
  );
};

export default MainLayout;
