import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";

const getEventStatus = (eventDateStr) => {
  const now = new Date("2025-08-09T22:00:00+06:00");
  const dateParts = eventDateStr.split(" ")[1] || "";
  const endDateStr = dateParts.split("-").pop();
  const fullEndDateStr = `${
    eventDateStr.split(" ")[0]
  } ${endDateStr} ${eventDateStr.split(" ").pop()}`;

  const eventStartDate = new Date(eventDateStr);
  const eventEndDate = new Date(fullEndDateStr);

  if (isNaN(eventStartDate.getTime()))
    return { text: "Date TBD", color: "bg-gray-500" };

  const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  if (eventEndDate < now) {
    return { text: "Past Event", color: "bg-neutral-600" };
  }
  if (eventStartDate <= sevenDaysFromNow && eventStartDate >= now) {
    return { text: "Happening Soon", color: "bg-accent" };
  }
  return { text: "Upcoming", color: "bg-primary" };
};

const EventCard = ({ event }) => {
  const { text, color } = getEventStatus(event.date);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.03, y: -8 }}
      className="bg-base-200 rounded-xl overflow-hidden shadow-lg hover:shadow-primary/30 transition-all duration-300 flex flex-col border border-base-300"
    >
      <div className="relative">
        <img
          src={event.image}
          alt={`Promotional image for ${event.title}`}
          className="w-full h-52 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <span
          className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${color}`}
        >
          {text}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <p className="text-primary font-semibold text-sm uppercase tracking-wider">
          {event.category}
        </p>
        <h3 className="text-xl font-bold text-base-content my-2 flex-grow">
          {event.title}
        </h3>
        <div className="text-base-content/80 space-y-2.5 text-sm mb-5">
          <p className="flex items-center gap-3">
            <Calendar size={16} className="text-accent flex-shrink-0" />
            <span>{event.date}</span>
          </p>
          {event.time && (
            <p className="flex items-center gap-3">
              <Clock size={16} className="text-accent flex-shrink-0" />
              <span>{event.time}</span>
            </p>
          )}
          <p className="flex items-center gap-3">
            <MapPin size={16} className="text-accent flex-shrink-0" />
            <span>{event.location}</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
