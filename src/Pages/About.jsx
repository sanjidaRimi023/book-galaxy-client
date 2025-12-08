import React from "react";
import bookDetailBg3 from "../assets/books3.jpg";
import aboutImg from "../assets/aboutImg.jpg";
import { Link } from "react-router";
import Team from "../Components/UI/team";
import { Title } from "react-head";

const About = () => {
  return (
    <>
       <Title>
    BookGalaxy || About
      </Title>
      <div
        style={{ backgroundImage: `url(${bookDetailBg3})` }}
        className="relative h-[250px] md:h-[300px] flex flex-col gap-4 items-center justify-center bg-cover bg-center"
      >
        <div className="absolute inset-0" />
        <span className="text-black font-bold text-5xl">About Us</span>
        <span className="text-white font-bold z-10 px-4 py-2 rounded-md bg-black/10 backdrop-blur-3xl shadow-lg text-center">
          <Link className="hover:text-primary">Home </Link> /{" "}
          <Link className="hover:text-primary">Our Books</Link>
        </span>
      </div>

      <section className="container mx-auto">
        <h2 className="text-xl md:text-4xl font-bold px-4 py-2 text-center my-6">
          Give That You Like Never Before
        </h2>
        <div className="flex gap-10 items-center py-10">
          <div>
            <span className="text-xl md:text-3xl font-bold">Who we are?</span>
            <p className="mt-3">
              Welcome to Book Galaxy — your ultimate destination for exploring
              the vast universe of books! We’re a passionate team of book lovers
              and tech geeks on a mission to connect readers with stories that
              inspire, educate, and entertain. Whether you're here to dive into
              thrilling adventures, discover new authors, or simply find your
              next favorite read, we’ve got you covered. At Book Galaxy, we
              believe books are more than just pages — they’re portals to new
              worlds. That’s why we strive to create a seamless, enjoyable, and
              interactive experience for every visitor. From handpicked
              categories to personalized recommendations, our galaxy of books is
              always expanding. Join us on this journey, and let’s explore the
              cosmos of stories together!
            </p>
          </div>
          <div>
            <img src={aboutImg} alt="" />
          </div>
              </div>
              
              <div>
                  <Team/>
              </div>
      </section>
    </>
  );
};

export default About;
