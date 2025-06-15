import React from "react";
import LottieLoader from "../assets/Animation - 1749980285385 (1).json";
import Lottie from "lottie-react";
const LotLoader = () => {
  return (
    <>
      <div className="w-full flex justify-center items-center">
        <Lottie
          animationData={LottieLoader}
          loop={true}
          className="w-[300px] h-[300px]"
        />
      </div>
    </>
  );
};

export default LotLoader;
