"use client";

import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import useAxios from "../../Hooks/useAxios";
import LoadSppiner from "../LoadSppiner";
import { Link } from "react-router";

const StoryCard = ({ story, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative h-[450px] w-full rounded-3xl overflow-hidden shadow-2xl"
    >
      <motion.img
        src={story.image}
        alt={story.bookName}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute top-4 right-4">
        <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
          {story.category || "Featured"}
        </span>
      </div>

      {/* Content Area */}
      <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="space-y-3"
        >
          <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
            {story.bookName}
          </h3>
          <div className="h-1 w-12 bg-teal-500 rounded-full group-hover:w-full transition-all duration-700" />
          <p className="text-gray-300 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {story.description ||
              "Dive into this amazing journey of knowledge and storytelling."}
          </p>

          <Link
            to="/all-books"
            className="mt-4 px-6 py-2 bg-white text-black font-bold rounded-full text-sm transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 hover:bg-teal-500 hover:text-white"
          >
            View Details
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function FeaturedBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance
      .get("/books")
      .then((res) => {
        setBooks(res.data.slice(0, 6));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch books:", err);
        setLoading(false);
      });
  }, [axiosInstance]);

  return (
    <div className="relative py-24 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-teal-600 font-bold tracking-[0.2em] uppercase text-sm block mb-2"
            >
              Our Mission
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white"
            >
              Top Picks of the <span className="text-teal-500">Month</span>
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-500 dark:text-gray-400 max-w-sm"
          >
            Explore our curated selection of books, chosen to inspire and expand
            your horizons.
          </motion.p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadSppiner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book, idx) => (
              <div
                key={book._id}
                className={idx === 1 || idx === 4 ? "md:mt-12" : ""}
              >
                <StoryCard story={book} index={idx} />
              </div>
            ))}
          </div>
        )}

        <div className="mt-20 text-center">
          <Link to="/all-books" className="px-10 py-4 bg-zinc-900 dark:bg-white dark:text-black text-white font-bold rounded-2xl hover:bg-teal-600 dark:hover:bg-teal-500 dark:hover:text-white transition-all shadow-xl hover:shadow-teal-500/20">
            Browse All Books
          </Link>
        </div>
      </div>
    </div>
  );
}
