import React from "react";
import Banner from "../Components/Banner/Banner";
import ReadingTip from "../Components/UI/ReadingTip";
import Achivement from "../Components/UI/Achivement";
import Events from "../Components/UI/Event";

const Home = () => {
  return (
    <>
      <div className="container mx-auto">
        <Banner />
        <ReadingTip />
        <Achivement />
        <Events/>
      </div>
    </>
  );
};

export default Home;
