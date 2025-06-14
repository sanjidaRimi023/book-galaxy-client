import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const events = [
  {
    image:
      "https://i.ibb.co/cKXVHZXr/old-books-arrangement-second-hand-market.jpg",
    title: "🌟National Book Fair 2025",
    date: "July 15-20, 2025",
    location: "Dhaka International Convention Center",
  },
  {
    image: "https://i.ibb.co/nqSpkJ0n/event4.jpg",
    title: "📚 Online Reading Circle: Mystery Novels",
    date: "June 25, 2025 | 7:00 PM",
    location: "Zoom (Link will be shared)",
  },
  {
    image: "https://i.ibb.co/DDF5rLMG/event2.jpg",
    title: "🖋️ Meet the Author: Anisul Hoque",
    date: "August 12, 2025 | 4:00 PM",
    location: "BookGalaxy Main Library, Gulshan",
  },
];

const Events = () => {
  return (
    <section className="bg-base-100 py-10 px-4">
      <div
        
        className="text-center mb-10"
      >
        <h2 className="text-3xl font-bold text-info">
          Upcoming Events & Book Fests
        </h2>
        <p className="text-gray-500 text-lg mt-2">
         Discover what's next in the world of books & events!📖
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
           
            className="border border-primary shadow-md rounded-xl p-5 flex flex-col gap-2 hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col items-center gap-3">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold text-accent">
                {event.title}
              </h3>
            </div>
            <p className="text-md">📅 {event.date}</p>
            <p className="text-md">📍 {event.location}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Events;
