import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import img1 from "../../assets/login.jpg";
import { Ban, BookOpen, CheckCircle, ClipboardList, Clock, Pencil, Target, TextSelect, Users } from "lucide-react";
import { Helmet } from "react-helmet";

const tipsData = [
  {
    img: img1,
    tips: [
      {
        icon: <Target className="w-6 h-6 text-primary" />,
        title: "Set a Reading Goal",
        desc: "Start small—maybe one book a month or 10 pages a day. Consistency beats speed.",
      },
      {
        icon: <ClipboardList className="w-6 h-6 text-primary" />,
        title: "Use a Reading Tracker",
        desc: "Use journals or apps like Goodreads or BookGalaxy's tracker to log what you read.",
      },
      {
        icon: <BookOpen className="w-6 h-6 text-primary" />,
        title: "Try Different Genres",
        desc: "Don't stick to one genre. Mix it up to keep reading fresh and exciting.",
      },
    ],
  },
  {
    img: "https://i.ibb.co/DD3BKWSw/2212-i105-031-S-m005-c13-isometric-library-interior-people.jpg",
    tips: [
      {
        icon: <Clock className="w-6 h-6 text-primary" />,
        title: "Create a Reading Routine",
        desc: "Designate a fixed time daily to develop discipline and focus.",
      },
      {
        icon: <Users className="w-6 h-6 text-primary" />,
        title: "Join a Book Club",
        desc: "Engage with others for accountability and new perspectives.",
      },
      {
        icon: <Pencil className="w-6 h-6 text-primary" />,
        title: "Read Actively",
        desc: "Underline, highlight, or take notes to retain what you read.",
      },
    ],
  },
  {
    img: "https://i.ibb.co/yc7pXqsD/2011-i126-005-old-library-book.jpg",
    tips: [
      {
        icon: <TextSelect className="w-6 h-6 text-primary" />,
        title: "Reflect on What You Read",
        desc: "Think about the key ideas and how they relate to your life or work.",
      },
      {
        icon: <Ban className="w-6 h-6 text-primary" />,
        title: "Don't Force It",
        desc: "If you're not enjoying a book, it's okay to stop. Find one that clicks.",
      },
      {
        icon: <CheckCircle className="w-6 h-6 text-primary" />,
        title: "Track Your Progress",
        desc: "Celebrate completed books! Use a journal or app to motivate yourself.",
      },
    ],
  },
];

const ReadingTip = () => {
  return (
    <section className="container mx-auto lg:px-10 px-4">
    <Helmet>
        <title>BookGalaxy || Reading Tips</title>
      </Helmet>
      <motion.h2
        className="md:text-4xl font-bold text-center my-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Enhance Your Reading Habits with <br /> Smart Strategies
      </motion.h2>

      
      <motion.p
        className="text-center text-lg mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6}}
      >
        At <span className="text-primary font-semibold">BookGalaxy</span>, we believe reading should be enjoyable{" "}
        <em>and</em> effective. Here are some practical tips to help you level up your reading journey.
      </motion.p>

    
      {tipsData.map((section, index) => (
        <motion.div
          key={index}
          className={`flex flex-col md:flex-row ${
            index % 2 !== 0 ? "md:flex-row-reverse" : ""
          } items-center gap-10 mb-16`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
        >
 
          <div className="md:w-1/2 w-full">
            <motion.img
              src={section.img}
              alt="Reading tip"
              className="w-full h-[250px] md:h-[300px] object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
            />
          </div>

          
          <div className="md:w-1/2 w-full space-y-5">
            {section.tips.map((tip, tipIndex) => (
              <motion.div
                key={tipIndex}
                className="flex items-start gap-4 p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: tipIndex * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex-shrink-0">{tip.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-primary">{tip.title}</h3>
                  <p className="text-base text-gray-600 dark:text-gray-300">{tip.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </section>
  );
};

export default ReadingTip;
