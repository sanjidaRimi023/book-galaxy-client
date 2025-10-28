import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Book, Users, BookOpenCheck, Library } from "lucide-react";


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
    const increment = end / (2 * 60); 

    const step = () => {
      start += increment;
      if (start < end) {
        setCount(Math.floor(start));
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(step);
  }, [end]);

  return <>{count.toLocaleString()}+</>;
};

const Achievement = () => {
  return (
    <section className="py-14 px-4 container mx-auto">
  
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold">
          BookGalaxy in Numbers
        </h2>
        <p className="text-lg mt-2">
          Celebrating our milestones and community impact
        </p>
      </motion.div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {achivs.map((achiv, index) => {
          const Icon = achiv.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700 group"
            >
        
              <div className="mb-4 p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
                <Icon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>

              <h3 className="text-3xl font-bold">
                <CountUpNumber end={achiv.value} />
              </h3>

              <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
                {achiv.label}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Achievement;
