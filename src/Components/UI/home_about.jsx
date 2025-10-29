"use client";
import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Users } from "lucide-react";
import oneAbout from "../../assets/home_about.jpg";
import twoAbout from "../../assets/home_about2.jpg";
const AboutUs = () => {
  return (
    <section className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12">
      {/* LEFT SIDE - IMAGES */}
      <div className="relative flex-1 flex justify-center">
        {/* BACK IMAGE */}
        <motion.img
          src={oneAbout}
          alt="Library Background"
          className="rounded-2xl shadow-md object-cover"
        />
        {/* FRONT IMAGE */}
        <motion.img
          src={twoAbout}
          alt="Person reading a book"
          className="w-56 md:w-96 rounded-2xl shadow-lg absolute -bottom-20 -right-6 border-8 hover:scale-105 transition-all border-white object-cover"
        />
      </div>

      {/* RIGHT SIDE - CONTENT */}
      <motion.div
        className="flex-1 text-center md:text-left"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <span className="rounded-2xl uppercase font-bold text-sm px-3 py-2 bg-teal-300 text-black">
          Who We Are
        </span>
        <h2 className="text-3xl md:text-4xl font-bold my-4">
          Behind the Shelves{" "}
        </h2>

        <p className="bg-gray-200 dark:bg-gray-800 font-medium text-sm md:text-base p-4 rounded-xl leading-relaxed mb-6">
          Book Galaxy is a modern library management system designed to make
          borrowing, tracking, and discovering books easier than ever. We help
          readers stay connected with their favorite books and manage their
          library activity in one simple platform.
        </p>
        <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-6 mb-8">
          <div className="flex items-center gap-3  border border-teal-200 px-4 py-2 rounded-full bg-teal-500 transition-all duration-300">
            <div className="flex items-center justify-center w-10 h-10 bg-teal-100 text-teal-600 rounded-full">
              <BookOpen size={22} />
            </div>
            <span className=" font-medium text-sm md:text-xl">
              Vast Collection
            </span>
          </div>

          <div className="flex items-center gap-3  border border-teal-200 px-4 py-2 rounded-full bg-teal-500 transition-all duration-300">
            <div className="flex items-center justify-center w-10 h-10 bg-teal-100 text-teal-600 rounded-full">
              <Users size={22} />
            </div>
            <span className=" font-medium text-sm md:text-xl">
              Trusted Members
            </span>
          </div>
        </div>

        {/* BUTTON */}
        <button className="hover:bg-teal-600 border hover:text-white border-dashed px-6 py-2 rounded-full font-medium transition-all duration-300 flex gap-2">
          More About Us <ArrowRight/>
        </button>
      </motion.div>
    </section>
  );
};

export default AboutUs;
