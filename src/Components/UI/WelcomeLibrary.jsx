"use client";
import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  BookOpen,
  Calendar,
  Users,
  Globe,
  Map,
  HelpCircle,
  Heart,
  Download,
} from "lucide-react";

const cards = [
  {
    icon: BookOpen,
    title: "Library Overview",
    desc: "Explore thousands of books, journals, and digital resources.",
    color: "text-indigo-500",
  },
  {
    icon: Heart,
    title: "Support the Library",
    desc: "Donate books or volunteer to make an impact.",
    color: "text-rose-500",
  },
  {
    icon: Globe,
    title: "Digital Resources",
    desc: "Access e-books and research papers anytime, anywhere.",
    color: "text-green-500",
  },
  {
    icon: Calendar,
    title: "Upcoming Events",
    desc: "Join book fairs, author meetups, and library workshops.",
    color: "text-pink-500",
  },
  {
    icon: Users,
    title: "Membership Info",
    desc: "Sign up and enjoy exclusive member benefits.",
    color: "text-yellow-500",
  },
  {
    icon: Heart,
    title: "Support the Library",
    desc: "Donate books or volunteer to make an impact.",
    color: "text-rose-500",
  },
  {
    icon: Map,
    title: "Library Map",
    desc: "Navigate through library sections easily.",
    color: "text-red-500",
  },
  {
    icon: Download,
    title: "Reading Recommendations",
    desc: "Get personalized book suggestions instantly.",
    color: "text-blue-500",
  },
  {
    icon: Map,
    title: "Library Map",
    desc: "Navigate through library sections easily.",
    color: "text-red-500",
  },
  
  {
    icon: Heart,
    title: "Support the Library",
    desc: "Donate books or volunteer to make an impact.",
    color: "text-rose-500",
  },
  {
    icon: Map,
    title: "Library Map",
    desc: "Navigate through library sections easily.",
    color: "text-red-500",
  },
  {
    icon: HelpCircle,
    title: "Help Desk",
    desc: "Get assistance or browse our FAQs anytime.",
    color: "text-purple-500",
  },
  {
    icon: Map,
    title: "Library Map",
    desc: "Navigate through library sections easily.",
    color: "text-red-500",
  },
];

const MarqueeRow = ({ items, reverse = false }) => (
  <motion.div
    initial={{ x: reverse ? "-100%" : "100%" }}
    animate={{ x: reverse ? "100%" : "-100%" }}
    transition={{
      repeat: Infinity,
      repeatType: "loop",
      duration: 25,
      ease: "linear",
    }}
    className="flex gap-6 px-4"
  >
    {[...items].map((card, idx) => {
      const Icon = card.icon;
      return (
        <motion.div
          key={idx}
          whileHover={{ scale: 1.05 }}
          className="min-w-[280px] bg-white/80 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-start justify-between"
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <Icon className={`w-10 h-10 ${card.color} mb-4`} />
          </motion.div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
            {card.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {card.desc}
          </p>
        </motion.div>
      );
    })}
  </motion.div>
);

const WelcomeLibrary = () => {
  return (
    <section className="pt-20 relative overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
          Welcome to the Library
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Your gateway to knowledge, creativity, and endless possibilities.
        </p>
        <div className="w-20 h-1 bg-teal-500 mx-auto mt-6 rounded-full" />
      </div>
      <MarqueeRow items={cards} reverse/>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-gradient-to-b from-transparent via-white/10 to-transparent dark:via-gray-900/10" />
    </section>
  );
};

export default WelcomeLibrary;
