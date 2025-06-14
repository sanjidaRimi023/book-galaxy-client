import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  Book,
  Users,
  BookOpenCheck,
  Library,
} from "lucide-react"; // Lucide icons

const achivs = [
  {
    icon: <Book size={36} className="text-primary" />,
    label: "Total Books",
    value: "10,000+",
  },
  {
    icon: <Users size={36} className="text-primary" />,
    label: "Registered Users",
    value: "5,000+",
  },
  {
    icon: <BookOpenCheck size={36} className="text-primary" />,
    label: "Borrows This Month",
    value: "1,200+",
  },
  {
    icon: <Library size={36} className="text-primary" />,
    label: "Happy Libraries",
    value: "100+",
  },
];

const Achivement = () => {
  return (
    <section className="bg-base-200 py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl font-bold text-info">BookGalaxy in Numbers</h2>
        <p className="text-lg mt-2">
          Celebrating our milestones and community impact 📊
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {achivs.map((achiv, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="border border-primary shadow-md rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
          >
            <div className="mb-3">{achiv.icon}</div>
            <h3 className="text-2xl font-bold text-accent">{achiv.value}</h3>
            <p className="text-sm mt-1">{achiv.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Achivement;
