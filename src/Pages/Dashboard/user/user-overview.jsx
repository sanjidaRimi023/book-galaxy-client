"use client";
import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  Book,
  Users,
  BookmarkCheck,
  AlertCircle,
  TrendingUp,
  Clock,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock Data for the Chart
const data = [
  { name: "Sat", borrow: 40 },
  { name: "Sun", borrow: 30 },
  { name: "Mon", borrow: 65 },
  { name: "Tue", borrow: 45 },
  { name: "Wed", borrow: 90 },
  { name: "Thu", borrow: 70 },
  { name: "Fri", borrow: 85 },
];

// eslint-disable-next-line no-unused-vars
const StatCard = ({ icon: Icon, title, value, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white dark:bg-zinc-900 p-6 rounded-[2rem] border border-base-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all group"
  >
    <div className="flex items-center justify-between mb-4">
      <div
        className={`p-3 rounded-2xl ${color} bg-opacity-10 text-opacity-100`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-lg">
        +12%
      </span>
    </div>
    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
      {title}
    </h3>
    <p className="text-3xl font-black mt-1">{value}</p>
  </motion.div>
);

const UserOverview = () => {
  return (
    <div className="p-6 lg:p-10 space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 text-sm">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <button className="btn btn-primary bg-teal-500 border-none text-white rounded-2xl px-6 shadow-lg shadow-teal-500/20">
          Generate Report
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Book}
          title="Total Books"
          value="2,480"
          color="bg-blue-500 text-blue-500"
          delay={0.1}
        />
        <StatCard
          icon={BookmarkCheck}
          title="Borrowed"
          value="856"
          color="bg-teal-500 text-teal-500"
          delay={0.2}
        />
        <StatCard
          icon={Users}
          title="Active Members"
          value="1,204"
          color="bg-purple-500 text-purple-500"
          delay={0.3}
        />
        <StatCard
          icon={AlertCircle}
          title="Overdue"
          value="42"
          color="bg-rose-500 text-rose-500"
          delay={0.4}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-base-200 dark:border-zinc-800 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="text-teal-500" /> Borrowing Trends
            </h3>
            <select className="select select-sm select-bordered rounded-xl">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorBorrow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "16px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="borrow"
                  stroke="#14b8a6"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorBorrow)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Activities Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-base-200 dark:border-zinc-800 shadow-sm"
        >
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Clock className="text-teal-500" /> Recent Activity
          </h3>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center font-bold text-xs uppercase">
                  JD
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">
                    John Doe{" "}
                    <span className="font-normal text-gray-500">borrowed</span>{" "}
                    "The Great Gatsby"
                  </p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-ghost w-full mt-8 rounded-xl border-dashed border-2 border-base-300">
            View All History
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default UserOverview;
