import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import EventCard from "./EventCard";

const eventsData = [
  {
    image:
      "https://i.ibb.co/cKXVHZXr/old-books-arrangement-second-hand-market.jpg",
    title: "National Book Fair 2025",
    date: "July 15-20, 2025",
    location: "Dhaka International Convention Center",
    category: "Book Fair",
  },
  {
    image: "https://i.ibb.co/nqSpkJ0n/event4.jpg",
    title: "Online Reading Circle: Mystery Novels",
    date: "June 25, 2025",
    time: "7:00 PM",
    location: "Online (Zoom)",
    category: "Virtual Event",
  },
  {
    image: "https://i.ibb.co/DDF5rLMG/event2.jpg",
    title: "Meet the Author: Anisul Hoque",
    date: "August 12, 2025",
    time: "4:00 PM",
    location: "BookGalaxy Main Library, Gulshan",
    category: "Author Meet",
  },
  {
    image: "https://i.ibb.co.com/PZmW5048/download.jpg",
    title: "Poetry Slam Night",
    date: "September 5, 2025",
    time: "8:00 PM",
    location: "The Poet's Corner Cafe",
    category: "Performance",
  },
];

const Events = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
           Our Events & Fests
          </h2>
          <p className="text-lg mt-2">
            Discover what's next in the world of books! Join our community for
            exciting fairs, author meetups, and virtual readings.
          </p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {eventsData.map((event) => (
            <EventCard key={event.title} event={event} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Events;
