import React from "react";
import Banner from "../Components/Banner/Banner";
import Achivement from "../Components/UI/Achivement";
import Events from "../Components/UI/Event";
import CategoryCard from "../Components/UI/CategoryCard";
import WelcomeLibrary from "../Components/UI/WelcomeLibrary";
import FeaturedBooks from "../Components/UI/FeaturedBooks";
import FAQSection from "../Components/UI/Faq";
import AboutUs from "../Components/UI/home_about";
import { Title } from "react-head";

const Home = () => {
  return (
    <>

        <Title>BookGalaxy | Home</Title>
        <div className="container mx-auto">
          <Banner />
        </div>
        <AboutUs />
        <WelcomeLibrary />
        <FeaturedBooks />
        <CategoryCard />
        <Achivement />
        <Events />
        <FAQSection />

    </>
  );
};

export default Home;
