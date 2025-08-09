"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import axios from "axios";
import {
  BookMarked,
  BookOpen,
  History,
  Cpu,
  Sparkles,
  Film,
  PenTool,
  Rocket,
} from "lucide-react";

// Wrapper for icons
const IconWrapper = ({
  children,
  className = "",
  isHighlighted = false,
  isHovered = false,
  animationDelay = 0,
}) => (
  <div
    className={`relative group transition-all duration-300 ${className}`}
    style={{ animationDelay: `${animationDelay}s` }}
  >
    <div
      className={`
        backdrop-blur-xl rounded-2xl flex items-center justify-center transition-all duration-300 w-full h-full
        ${
          isHighlighted
            ? "dark:bg-gray-700/50 bg-gray-100/80 border border-indigo-400/50 dark:shadow-indigo-500/20 shadow-indigo-400/30 shadow-2xl animate-breathing-glow"
            : `dark:bg-white/5 bg-white/60 border border-gray-200/50 dark:border-white/10 ${
                !isHovered && "animate-float"
              }`
        }
        ${
          isHovered
            ? "dark:bg-gray-600/50 bg-gray-200/80 border-indigo-400/60 scale-110 dark:shadow-indigo-400/30 shadow-indigo-400/40 shadow-2xl"
            : "dark:hover:bg-white/10 hover:bg-gray-100/80 dark:hover:border-white/20 hover:border-gray-300/60"
        }
      `}
    >
      {children}
    </div>
  </div>
);
const leftVariant = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const rightVariant = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};
const IconGrid = ({ categories }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const [windowWidth, setWindowWidth] = useState(1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { radius, centralIconRadius, outerIconRadius, svgSize, svgCenter } =
    useMemo(() => {
      const isMobile = windowWidth < 768;
      const radius = isMobile ? 120 : 160;
      const centralIconRadius = isMobile ? 40 : 48;
      const outerIconRadius = isMobile ? 32 : 40;
      const svgSize = isMobile ? 300 : 380;
      const svgCenter = svgSize / 2;
      return { radius, centralIconRadius, outerIconRadius, svgSize, svgCenter };
    }, [windowWidth]);

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div
        className="relative"
        style={{ width: `${svgSize}px`, height: `${svgSize}px` }}
      >
        <svg width={svgSize} height={svgSize} className="absolute top-0 left-0">
          <g>
            {categories.map((icon, i) => {
              const angleInDegrees = -150 + i * (360 / categories.length);
              const angleInRadians = angleInDegrees * (Math.PI / 180);
              const startX =
                svgCenter + centralIconRadius * Math.cos(angleInRadians);
              const startY =
                svgCenter + centralIconRadius * Math.sin(angleInRadians);
              const endX =
                svgCenter +
                (radius - outerIconRadius) * Math.cos(angleInRadians);
              const endY =
                svgCenter +
                (radius - outerIconRadius) * Math.sin(angleInRadians);
              return (
                <line
                  key={`line-${icon.id}`}
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke={hoveredId === icon.id ? "#6366F1" : "currentColor"}
                  strokeWidth="1"
                  className="text-gray-300 dark:text-gray-600 transition-all duration-300"
                  style={{ opacity: hoveredId === icon.id ? 1 : 0.4 }}
                />
              );
            })}
          </g>
        </svg>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <IconWrapper className="w-20 h-20 md:w-24 md:h-24" isHighlighted>
            <BookOpen
              size="40%"
              className="text-indigo-600 dark:text-indigo-400"
            />
          </IconWrapper>
        </div>

        {categories.map((icon, i) => {
          const angleInDegrees = -150 + i * (360 / categories.length);
          const angleInRadians = angleInDegrees * (Math.PI / 180);
          const x = radius * Math.cos(angleInRadians);
          const y = radius * Math.sin(angleInRadians);

          return (
            <div
              key={icon.id}
              className="absolute top-1/2 left-1/2 z-10"
              style={{ transform: `translate(${x}px, ${y}px)` }}
              onMouseEnter={() => setHoveredId(icon.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Link
                to={`/category/${icon.title}`}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
              >
                <IconWrapper
                  className="w-16 h-16 md:w-20 md:h-20 cursor-pointer"
                  isHovered={hoveredId === icon.id}
                  animationDelay={i * 0.15}
                >
                  {icon.component}
                </IconWrapper>
                <span
                  className={`text-xs md:text-sm font-semibold transition-all duration-300 ${
                    hoveredId === icon.id
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {icon.title}
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function BookCategoryHub() {
  const [uniqCategories, setUniqCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/books`)
      .then((res) => {
        const categories = [...new Set(res.data.map((book) => book.category))];
        setUniqCategories(categories);
      })
      .catch((err) => console.error(err));
  }, []);

  const iconMap = {
    Thriller: <BookMarked size="50%" className="text-pink-500" />,
    Drama: <Film size="50%" className="text-yellow-500" />,
    History: <History size="50%" className="text-blue-500" />,
    Technology: <Cpu size="50%" className="text-green-500" />,
    Mystery: <Sparkles size="50%" className="text-purple-500" />,
    Fantasy: <PenTool size="50%" className="text-orange-500" />,
    Novel: <BookOpen size="50%" className="text-teal-500" />,
    "Sci-Fi": <Rocket size="50%" className="text-cyan-500" />,
  };

  const categories = uniqCategories.slice(0, 7).map((cat, idx) => ({
    id: idx + 1,
    title: cat,
    component: iconMap[cat] || (
      <BookMarked size="50%" className="text-gray-500" />
    ),
  }));

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden relative">
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
          @keyframes breathing-glow {
            0% { box-shadow: 0 0 20px 0px rgba(99, 102, 241, 0.4); }
            50% { box-shadow: 0 0 40px 10px rgba(99, 102, 241, 0.2); }
            100% { box-shadow: 0 0 20px 0px rgba(99, 102, 241, 0.4); }
          }
          .dark .animate-breathing-glow {
            animation: breathing-glow 3s ease-in-out infinite;
          }
          :not(.dark) .animate-breathing-glow {
            animation: breathing-glow 3s ease-in-out infinite;
          }
        `}
      </style>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center lg:gap-20">
         
          <motion.div
            className="text-left w-full md:w-1/2"
            variants={leftVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col gap-2 mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Explore Book Categories
                </h2>
              </div>
              <div className="lg:w-110 lg:h-[3px] lg:bg-teal-600 lg:rounded"></div>
            </div>

            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-4 max-w-xl">
              Discover books by genre and dive into your favorite stories.
            </p>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-xl">
              From thrilling mysteries to insightful history, our categories
              help you find your next great read.
            </p>
          </motion.div>

          {/* Categories Grid - Right */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center"
            variants={rightVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <IconGrid categories={categories} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
