import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper/modules"; 

import "swiper/css";
import "swiper/css/effect-cards";
import "./Banner.css";

const Banner = () => {
  return (
    <section className="px-4 py-12 bg-base-100 overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold mb-4">
            Explore Infinite Stories Across the Galaxy
          </h1>
          <p className="text-lg">
            Welcome to{" "}
            <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#04f18f] via-[#01e7d4] to-[#00d4ff] bg-clip-text text-transparent">
              BookGalaxy
            </span>
            , your digital library orbiting with thousands of books from timeless
            classics to modern bestsellers. Borrow, read, and manage your
            collection anytime, anywhere.
          </p>
        </div>

        <div className="w-full md:w-1/2 max-w-sm">
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards, Autoplay]} 
            autoplay={{
              delay: 1000, 
              disableOnInteraction: false,
            }}
            className="mySwiper"
          >
            <SwiperSlide>
              <img
                src={"https://i.ibb.co.com/khHN7Pk/9780143454212.jpg"}
                alt="book picture"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={"https://i.ibb.co.com/0cv102J/To-Kill-a-Mockingbird.webp"}
                alt="book picture"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={
                  "https://i.ibb.co.com/MprDyVt/51-BIA4rrae-L-AC-UF1000-1000-QL80.jpg"
                }
                alt="book picture"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={
                  "https://i.ibb.co.com/YdQDMpn/81me-ud-V63-L-AC-UF1000-1000-QL80.jpg"
                }
                alt="book picture"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={
                  "https://i.ibb.co.com/xS8YvxL/81m-CE-uclx-L-UF1000-1000-QL80.jpg"
                }
                alt="book picture"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={
                  "https://i.ibb.co.com/tYSWRfG/catcherrye-edited-1-800x.png"
                }
                alt="book picture"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={"https://i.ibb.co.com/989qMRW/42844155.jpg"}
                alt="book picture"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={"https://i.ibb.co.com/zS9jsdK/18144590.jpg"}
                alt="book picture"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={
                  "https://i.ibb.co.com/P6hfCmJ/Whats-App-Image-2024-05-22-at-11-21-25-2e21ae46.jpg"
                }
                alt="book picture"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Banner;
