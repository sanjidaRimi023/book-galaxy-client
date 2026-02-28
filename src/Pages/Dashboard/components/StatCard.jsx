/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const StatCard = ({ icon: Icon, title, value, bgColor, iconColor, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-base-200 p-6 rounded-2xl border border-primary/5 shadow-sm hover:shadow-md transition-all group"
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className="p-4 rounded-2xl transition-transform group-hover:scale-110 duration-300"
          style={{ backgroundColor: `${iconColor}15` }}
        >
          <Icon size={28} strokeWidth={2.5} color={iconColor} />
        </div>
      </div>

      <div>
        <h3 className="text-xs font-black uppercase tracking-[0.2em]">
          {title}
        </h3>
        <p className="text-4xl font-black text-primary mt-1 tabular-nums">
          {value || 0}
        </p>
      </div>
    </motion.div>
  );
};

export default StatCard;
