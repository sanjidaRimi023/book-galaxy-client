import React from "react";
import Banner from "../Components/Banner/Banner";
import ReadingTip from "../Components/UI/ReadingTip";
import Achivement from "../Components/UI/Achivement";
import Events from "../Components/UI/Event";
import CategoryCard from "../Components/UI/CategoryCard";

const Home = () => {
  return (
    <>
      <div className="container mx-auto">
        <Banner />
       
        <ReadingTip />
         <CategoryCard/>
        <Achivement />
        <Events/>
      </div>
    </>
  );
};

export default Home;
