"use client";
import {
  AlertCircle,
  Book,
  BookmarkCheck,
  Filter,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import useAllUsers from "../../../Hooks/useAllUser";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useDashboardStats from "../../../Hooks/useDashboardStats";
import StatCard from "../components/StatCard";

// Static Data for Chart
const staticTrendData = [
  { name: "Sat", borrow: 45, return: 30 },
  { name: "Sun", borrow: 52, return: 40 },
  { name: "Mon", borrow: 38, return: 35 },
  { name: "Tue", borrow: 65, return: 50 },
  { name: "Wed", borrow: 48, return: 42 },
  { name: "Thu", borrow: 85, return: 60 },
  { name: "Fri", borrow: 70, return: 55 },
];

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const [users, usersLoading] = useAllUsers();
  const { data: stats, isLoading: statsLoading } = useDashboardStats();

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [filteredBooks, setFilteredBooks] = useState([]);

  // Category change logic
  useEffect(() => {
    if (categoryFilter !== "All") {
      axiosSecure
        .get(`/category/${categoryFilter}`)
        .then((res) => setFilteredBooks(res.data))
        .catch((err) => console.error("Filter Error:", err));
    } else {
      setFilteredBooks([]);
    }
  }, [categoryFilter, axiosSecure]);

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  if (usersLoading || statsLoading)
    return (
      <div className="flex min-h-screen items-center justify-center font-black italic  animate-pulse uppercase tracking-widest">
        LOADING_SYSTEM_DATA...
      </div>
    );

  return (
    <div className="min-h-screen bg-base-100 p-6 lg:p-10 space-y-10 ">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">
            Admin_Central
          </h1>
          <p className="opacity-60 font-medium">
            Management portal for library inventory and user authorization.
          </p>
        </div>

        {/* Dropdown UI - Filter selection handle korbe */}
        <div className="flex items-center gap-4 bg-primary/5 p-2 rounded-2xl border border-primary/10">
          <Filter className="w-4 h-4 ml-2" />
          <select
            value={categoryFilter}
            onChange={handleCategoryChange}
            className="select select-ghost focus:bg-transparent font-bold"
          >
            <option value="All">All Categories</option>
            <option value="Thriller">Thriller</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="History">History</option>
            <option value="Drama">Drama</option>
          </select>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Book}
          title="Total Inventory"
          value={stats?.totalBooks || "1,347"}
          iconColor="#3b82f6"
          delay={0.1}
        />
        <StatCard
          icon={BookmarkCheck}
          title="Items Loaned"
          value={stats?.borrowed || "413"}
          iconColor="#10b981"
          delay={0.2}
        />
        <StatCard
          icon={Users}
          title="Total Members"
          value={users?.length || "4,323"}
          iconColor="#8b5cf6"
          delay={0.3}
        />
        <StatCard
          icon={AlertCircle}
          title="Critical Overdue"
          value={stats?.overdue || "43"}
          iconColor="#f43f5e"
          delay={0.4}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Chart & Filtered Results */}
        <div className="lg:col-span-2 space-y-8">
          {/* Visual Trends Section */}
          <div className="bg-base-200 p-8 rounded-2xl border border-primary/10 shadow-sm">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-xl font-black flex items-center gap-2 italic uppercase tracking-tighter">
                  <TrendingUp className="w-5 h-5 text-emerald-500" />{" "}
                  Loan_Analytics
                </h3>
              </div>

              <div className="flex gap-4">
                <span className="flex items-center gap-1 text-[10px] font-bold opacity-60">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>{" "}
                  BORROWED
                </span>
                <span className="flex items-center gap-1 text-[10px] font-bold opacity-60">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>{" "}
                  RETURNED
                </span>
              </div>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={staticTrendData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorBorrow"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="currentColor"
                        stopOpacity={0.3}
                        className=""
                      />
                      <stop
                        offset="95%"
                        stopColor="currentColor"
                        stopOpacity={0}
                        className=""
                      />
                    </linearGradient>
                    <linearGradient
                      id="colorReturn"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "currentColor",
                      opacity: 0.5,
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                    dy={15}
                  />
                  <Tooltip
                    cursor={{ stroke: "rgba(0,0,0,0.1)", strokeWidth: 1 }}
                    contentStyle={{
                      backgroundColor: "white",
                      borderRadius: "16px",
                      border: "1px solid rgba(0,0,0,0.05)",
                      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                      padding: "12px",
                    }}
                    itemStyle={{
                      fontSize: "12px",
                      fontWeight: "900",
                      textTransform: "uppercase",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="borrow"
                    stroke="currentColor"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#colorBorrow)"
                    className=""
                    animationDuration={2000}
                  />
                  <Area
                    type="monotone"
                    dataKey="return"
                    stroke="#10b981"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    fillOpacity={1}
                    fill="url(#colorReturn)"
                    animationDuration={2500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Filtered Inventory Section - FIXES 'filteredBooks' unused error */}
          <div className="bg-base-100 p-8 rounded-2xl border border-primary/10 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black italic uppercase tracking-tighter">
                Inventory_Feed: {categoryFilter}
              </h3>
              {categoryFilter !== "All" && (
                <span className="badge badge-primary font-bold px-4 py-3">
                  {filteredBooks.length} ITEMS
                </span>
              )}
            </div>

            {categoryFilter === "All" ? (
              <div className="py-12 text-center border-2 border-dashed border-primary/10 rounded-2xl bg-primary/5">
                <p className="opacity-40 font-bold italic uppercase tracking-widest text-sm">
                  Select a category above to audit stock levels.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <div
                      key={book._id}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/5 hover:border-primary/20 transition-all group"
                    >
                      <div className="w-12 h-16 bg-primary/10 rounded-lg shrink-0 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Book size={20} className="opacity-40" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold truncate text-sm uppercase">
                          {book.title}
                        </p>
                        <p className="text-[10px] opacity-60 font-medium uppercase truncate">
                          {book.author}
                        </p>
                        <div
                          className={`mt-1 text-[9px] font-black ${book.quantity > 0 ? "text-emerald-500" : "text-rose-500"}`}
                        >
                          {book.quantity > 0
                            ? `AVAILABILITY: ${book.quantity}`
                            : "OUT_OF_STOCK"}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="col-span-2 text-center py-6 opacity-40 font-bold italic">
                    No data found for this segment.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: User Quick List */}
        <div className="bg-base-200 p-8 rounded-2xl border border-primary/10 shadow-sm h-fit">
          <h3 className="text-xl font-black mb-8 italic uppercase tracking-tighter">
            Recent_Users
          </h3>
          <div className="space-y-4">
            {users.slice(0, 8).map((user) => (
              <div
                key={user._id}
                className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-primary/5 border border-transparent hover:border-primary/10 transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-base-100 font-black text-xs group-hover:scale-110 transition-transform">
                  {user.name?.slice(0, 2).toUpperCase() || "UN"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">{user.name}</p>
                  <p className="text-[10px] opacity-50 font-medium truncate uppercase tracking-tighter">
                    {user.email}
                  </p>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
