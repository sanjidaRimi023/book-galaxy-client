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
  Space,
} from "lucide-react";

const leftVariant = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const rightVariant = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cards = [
  {
    icon: <BookOpen className="w-10 h-10 text-indigo-600" />,
    title: "Library Overview",
    desc: "Explore thousands of books, journals, and digital resources in one place.",
  },
  {
    icon: <Globe className="w-10 h-10 text-green-600" />,
    title: "Digital Resources",
    desc: "Access e-books, audiobooks, and research papers anytime, anywhere.",
  },
  {
    icon: <Calendar className="w-10 h-10 text-pink-600" />,
    title: "Upcoming Events",
    desc: "Join book fairs, author meet-ups, and workshops at our library.",
  },
  {
    icon: <Users className="w-10 h-10 text-yellow-600" />,
    title: "Membership Info",
    desc: "Sign up to borrow books, join clubs, and enjoy member-only benefits.",
  },
  {
    icon: <Download className="w-10 h-10 text-blue-600" />,
    title: "Reading Recommendations",
    desc: "Get personalized book suggestions based on your reading history.",
  },
  {
    icon: <Map className="w-10 h-10 text-red-600" />,
    title: "Library Map",
    desc: "Find different sections like Kids, Study Area, and Computers easily.",
  },
  {
    icon: <Heart className="w-10 h-10 text-rose-600" />,
    title: "Support the Library",
    desc: "Donate books or volunteer to keep our library growing.",
  },
  {
    icon: <HelpCircle className="w-10 h-10 text-purple-600" />,
    title: "Help Desk",
    desc: "Contact our librarians or check FAQs for quick assistance.",
  },
];
const hoverColors = [
  "hover:bg-teal-300",
  "hover:bg-indigo-300",
  "hover:bg-purple-300",
  "hover:bg-orange-300",
  "hover:bg-blue-300",
  "hover:bg-green-300",
  "hover:bg-yellow-300",
  "hover:bg-red-300",
];
const WelcomeLibrary = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold">
            Welcome to the Library
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Your gateway to knowledge, creativity, and endless possibilities.
          </p>
          <hr className="mt-6 w-24 mx-auto border-2 border-teal-500 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="flex flex-col gap-4"
          >
            {cards.slice(0, 4).map((card, index) => (
              <motion.div
                key={index}
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.05 }}
                variants={index % 2 === 0 ? leftVariant : rightVariant}
                className={`p-6 rounded-2xl shadow-lg transition ${hoverColors[index]} hover:shadow-2xl cursor-pointer bg-white dark:bg-gray-800`}
              >
                <div className="mb-4">{card.icon}</div>
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p className="mt-2">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {cards.slice(4, 8).map((card, index) => (
              <motion.div
                key={index + 4}
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.05 }}
                variants={index % 2 === 0 ? leftVariant : rightVariant}
                className={`flex flex-col items-start p-6 justify-center rounded-2xl shadow-lg transition ${
                  hoverColors[index + 4]
                } hover:shadow-2xl cursor-pointer bg-white dark:bg-gray-800`}
              >
                <span>{card.icon}</span>
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p>{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeLibrary;
