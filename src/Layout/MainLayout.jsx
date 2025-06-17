import React, { Suspense} from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "../Components/Footer";
import LoadSppiner from "../Components/LoadSppiner";


const MainLayout = () => {
  return (
    <>
      <div className="text-xl font-bold">
        <Toaster />
       </div>
      <div className="text-2xl">
       
      </div>
      <Navbar />
      <div className="min-h-screen">
        <Suspense fallback={<LoadSppiner />}>
          <Outlet />
        </Suspense>
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
