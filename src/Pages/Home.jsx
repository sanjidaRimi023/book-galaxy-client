import React from "react";
import Banner from "../Components/Banner/Banner";
import ReadingTip from "../Components/UI/ReadingTip";
import Achivement from "../Components/UI/Achivement";
import Events from "../Components/UI/Event";
import CategoryCard from "../Components/UI/CategoryCard";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>BookGalaxy || Home</title>
      </Helmet>
      <div className="container mx-auto">
        <Banner />
        <CategoryCard />
        <Achivement />
        <Events />
      </div>
    </>
  );
};

export default Home;
