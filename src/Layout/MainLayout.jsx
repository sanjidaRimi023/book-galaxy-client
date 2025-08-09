import React, { Suspense } from "react";
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
   
     

      <div className="min-h-screen w-full bg-[#fafafa] dark:bg-base-100 relative">
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
        repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.05) 0, rgba(0, 0, 0, 0.05) 1px, transparent 1px, transparent 20px),
        repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.05) 0, rgba(0, 0, 0, 0.05) 1px, transparent 1px, transparent 20px)
      `,
            backgroundSize: "40px 40px",
          }}
        />
         <Navbar />
        <Suspense fallback={<LoadSppiner />}>
          <Outlet />
        </Suspense>
      </div>

      <Footer />
    </>
  );
};

export default MainLayout;
