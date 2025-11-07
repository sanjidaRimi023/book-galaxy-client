/* eslint-disable no-unused-vars */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "lucide-react";
import LoadSppiner from "../LoadSppiner";

const StoryCard = ({ story }) => {
  return (
    <motion.div
      className="relative w-72 h-96 flex-shrink-0 rounded-lg overflow-hidden shadow-xl group"
      whileHover={{
        y: -8,
        transition: { type: "spring", stiffness: 300 },
      }}
    >
      <img
        src={story.image}
        alt={story.bookName}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      <div className="relative z-10 flex flex-col justify-end h-full p-6 text-white">
        <h3 className="font-bold text-2xl tracking-wide">{story.bookName}</h3>
      </div>
    </motion.div>
  );
};

export default function FeaturedBooks() {
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const [dragConstraint, setDragConstraint] = useState(0);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [xPos, setXPos] = useState(0);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/books`)
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch books:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const calculateConstraints = () => {
      if (containerRef.current && trackRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const trackWidth = trackRef.current.scrollWidth;
        setDragConstraint(containerWidth - trackWidth);
      }
    };
    calculateConstraints();
    window.addEventListener("resize", calculateConstraints);
    return () => window.removeEventListener("resize", calculateConstraints);
  }, [books]);

  // Auto slide effect
  useEffect(() => {
    if (!books.length) return;

    const slideInterval = setInterval(() => {
      setXPos((prev) => {
        const maxScroll = dragConstraint - 32;
        const newPos = prev - 300;
        if (newPos < maxScroll) {
          return 0;
        }
        return newPos;
      });
    }, 2000);

    return () => clearInterval(slideInterval);
  }, [books, dragConstraint]);

  return (
    <div className="font-sans w-full py-12 md:py-30 flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl mx-auto px-4">
      <header className="text-center mb-12">
  <span className="rounded-2xl uppercase font-bold text-sm px-3 py-2 text-teal-600">
    Our Mission
  </span>
  <h1 className="text-2xl md:text-5xl font-bold">Top Picks of the Month</h1>
  <p className="mt-4 max-w-xl mx-auto">
    Explore our curated selection of books, chosen to inspFire, entertain, and expand your horizons. Each title represents quality and passion for reading.
  </p>
  <hr className="mt-6 w-24 mx-auto border-2 border-teal-500 rounded-full" />
</header>


        {loading ? (
          <p className="text-center text-gray-400">
            <LoadSppiner />
          </p>
        ) : (
          <motion.div
            ref={containerRef}
            className="overflow-hidden cursor-grab"
            whileTap={{ cursor: "grabbing" }}
          >
            <motion.div
              ref={trackRef}
              className="flex space-x-6 pb-6 px-4"
              drag="x"
              style={{ x: xPos }}
              dragConstraints={{ right: 0, left: dragConstraint - 32 }}
              dragElastic={0.15}
            >
              {books.map((book) => (
                <StoryCard key={book._id} story={book} />
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
   
    </div>
  );
}
