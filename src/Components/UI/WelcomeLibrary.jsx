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
    desc: "Explore thousands of books and digital resources.",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: Heart,
    title: "Support Us",
    desc: "Donate books or volunteer to make an impact.",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: Globe,
    title: "Digital Hub",
    desc: "Access e-books and research papers anywhere.",
    color: "from-green-500 to-teal-500",
  },
  {
    icon: Calendar,
    title: "Events",
    desc: "Join book fairs and author meetups.",
    color: "from-orange-500 to-yellow-500",
  },
  {
    icon: Users,
    title: "Membership",
    desc: "Sign up and enjoy exclusive member benefits.",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: HelpCircle,
    title: "Help Desk",
    desc: "Get assistance or browse our FAQs anytime.",
    color: "from-cyan-500 to-blue-500",
  },
];

const WelcomeLibrary = () => {
  return (
    <section className="relative mt-20 px-4 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Discover Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-green-600">
              Next Adventure
            </span>
          </motion.h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Experience a modern way of exploring knowledge with our interactive
            digital library ecosystem.
          </p>
        </div>

        {/* Interactive Grid / Orbit Hybrid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{
                y: -10,
                transition: { duration: 0.2 },
              }}
              className="group relative p-[1px] rounded-3xl overflow-hidden transition-all"
            >
              {/* Animated Border Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Glass Card Body */}
              <div className="relative h-full bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-[23px] p-8 shadow-xl">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-6 shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}
                >
                  <card.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  {card.desc}
                </p>

                {/* Subtle Button Effect */}
                <div className="flex items-center text-sm font-semibold text-teal-600 dark:text-teal-400 group-hover:gap-2 transition-all">
                  Explore More{" "}
                  <span className="opacity-0 group-hover:opacity-100 transition-all">
                    →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WelcomeLibrary;
