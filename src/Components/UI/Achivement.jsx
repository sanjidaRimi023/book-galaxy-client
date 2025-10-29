import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Book, Users, BookOpenCheck, Library, ArrowRight } from "lucide-react";

// --- Data for the achievement cards ---
const achivs = [
  { icon: Book, label: "Total Books", value: 10000 },
  { icon: Users, label: "Registered Users", value: 5000 },
  { icon: BookOpenCheck, label: "Borrows This Month", value: 1200 },
  { icon: Library, label: "Happy Libraries", value: 100 },
];


const CountUpNumber = ({ end }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    
    const frames = 120;
    const increment = end / frames;

    const updateCount = () => {
      start += increment;
      if (start < end) {
        setCount(Math.ceil(start));
     
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(updateCount);
  }, [end]);

  return <>{count.toLocaleString()}+</>;
};

const Achievement = () => {

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const gridVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.15, 
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <section className="container mx-auto pt-20">
   
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
      >
        <motion.div variants={textVariants} className="flex flex-col gap-4">
          <span className="font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
            Our Impact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">
            Trusted by a Thriving Community
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            We're proud of our journey and the community we've built. See our
            impact at a glance and discover why thousands trust BookGalaxy for
            their reading adventures.
          </p>
          <hr className="mt-2 w-20 border-2 border-teal-500 rounded-full" />
          
          <div className="mt-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white bg-teal-600 rounded-lg shadow-md hover:bg-teal-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Join Our Community
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        <motion.div
          variants={gridVariants}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {achivs.map((achiv, index) => {
            const Icon = achiv.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-200/80 dark:border-gray-700/60
                           transition-all duration-300 ease-in-out
                           hover:shadow-teal-500/10 hover:dark:shadow-teal-400/10 hover:border-teal-500/30 hover:dark:border-teal-400/30 hover:-translate-y-1"
              >
                {/* Icon wrapper */}
                <div className="mb-4 p-3 bg-teal-100 dark:bg-teal-800/50 rounded-full">
                  <Icon className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                </div>
                {/* Animated Number */}
                <h3 className="text-3xl md:text-4xl font-bold text-teal-600 dark:text-teal-400">
                  <CountUpNumber end={achiv.value} />
                </h3>
                {/* Label */}
                <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
                  {achiv.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Achievement;
