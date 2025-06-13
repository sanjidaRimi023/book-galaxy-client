import React from "react";
import Banner from "../Components/Banner/Banner";
import ReadingTip from "../Components/UI/ReadingTip";

const Home = () => {
  return (
    <>
      <div className="container mx-auto">
        <Banner />
        <ReadingTip/>
      </div>
    </>
  );
};

export default Home;
