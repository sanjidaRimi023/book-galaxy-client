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

   
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.05 }}
              variants={index % 2 === 0 ? leftVariant : rightVariant}
              className="p-6 rounded-2xl shadow-lg transition hover:bg-teal-400 hover:shadow-2xl cursor-pointer bg-white dark:bg-gray-800"
            >
              <div className="mb-4">{card.icon}</div>
              <h3 className="text-xl font-semibold">{card.title}</h3>
              <p className="mt-2">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WelcomeLibrary;
