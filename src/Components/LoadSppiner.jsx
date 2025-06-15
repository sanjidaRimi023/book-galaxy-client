import React from "react";
import { FadeLoader } from "react-spinners";

const LoadSppiner = () => {
  return (
    <div className="flex flex-col justify-center h-screen space-y-2 items-center mx-auto container">
      <FadeLoader color="#0cf1cf" height={20} width={6} speedMultiplier={3} />
      <h3 className="text-2xl font-bold">Loading.....please wait..!!</h3>
    </div>
  );
};

export default LoadSppiner;
