import React from "react";
import Banner from "../Components/Banner/Banner";
import ReadingTip from "../Components/UI/ReadingTip";
import Achivement from "../Components/UI/Achivement";
import Events from "../Components/UI/Event";
import CategoryCard from "../Components/UI/CategoryCard";
import { Helmet } from "react-helmet";
import WelcomeLibrary from "../Components/UI/WelcomeLibrary";
import FeaturedBooks from "../Components/UI/FeaturedBooks";
import FAQSection from "../Components/UI/Faq";
import AboutUs from "../Components/UI/home_about";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>BookGalaxy || Home</title>
      </Helmet>
      <div className="container mx-auto">
        <Banner />
      </div>
    <AboutUs/>
      <WelcomeLibrary />
        <FeaturedBooks/>
        <CategoryCard />
        <Achivement />
      <Events />
      <FAQSection/>
     
    </>
  );
};

export default Home;
