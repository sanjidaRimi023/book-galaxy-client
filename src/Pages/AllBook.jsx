"use client";
import React, { useState } from "react";
import { LayoutGrid, Table, Search, Filter } from "lucide-react";
import { Link } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Title } from "react-head";
import useAxios from "../Hooks/useAxios";
import LoadSppiner from "../Components/LoadSppiner";

const AllBook = () => {
  const axiosInstance = useAxios();
  const [layout, setLayout] = useState("card");
  const [search, setSearch] = useState("");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["allBooks"],
    queryFn: async () => {
      const res = await axiosInstance.get("/books");
      return res.data;
    },
    staleTime: 1000 * 60 * 10, 
  });

  const filterBooks = books.filter((book) => {
    const matchCategory = book.category?.toLowerCase().includes(search.toLowerCase());
    const matchAvailability = showAvailableOnly ? book.quantity > 0 : true;
    return matchCategory && matchAvailability;
  });

  if (isLoading) return <LoadSppiner />;

  return (
    <div className="min-h-screen bg-base-100/50">
      <Title>BookGalaxy || All Books</Title>

      {/* Hero Header with Background Image */}
      <section className="relative h-[450px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed transition-transform duration-1000"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000')" }} 
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 w-full max-w-4xl px-6 text-center">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-black text-white mb-6"
          >
            Explore Our <span className="text-teal-400">Universe</span>
          </motion.h1>
          
          {/* Glassy Filter Box */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-full border border-white/20 shadow-2xl flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 w-5 h-5" />
              <select
                className="select select-bordered w-full pl-12 bg-white/10 text-white border-white/30 focus:border-teal-400 focus:outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              >
                <option className="text-black" value="">All Categories</option>
                <option className="text-black" value="Thriller">Thriller</option>
                <option className="text-black" value="Novel">Novel</option>
                <option className="text-black" value="History">History</option>
                <option className="text-black" value="Fantasy">Fantasy</option>
                <option className="text-black" value="Technology">Technology</option>
              </select>
            </div>

            <button
              onClick={() => setShowAvailableOnly(!showAvailableOnly)}
              className={`w-full md:w-auto px-8 py-2 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                showAvailableOnly 
                ? "bg-teal-500 text-white shadow-[0_0_20px_rgba(20,184,166,0.4)]" 
                : "bg-white/20 text-white border border-white/30 hover:bg-white/30"
              }`}
            >
              <Filter className="w-4 h-4" />
              {showAvailableOnly ? "Showing Available" : "Show Available Only"}
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-10 border-b border-base-300 pb-6">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">Catalogue</h2>
            <p className="text-sm opacity-60">Showing {filterBooks.length} results</p>
          </div>
          
          {/* View Switcher */}
          <div className="flex bg-base-200 p-1 rounded-xl">
            <button 
              onClick={() => setLayout("card")}
              className={`p-2 rounded-lg transition-all ${layout === "card" ? "bg-white shadow-sm text-teal-600" : "text-gray-500"}`}
            >
              <LayoutGrid className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setLayout("table")}
              className={`p-2 rounded-lg transition-all ${layout === "table" ? "bg-white shadow-sm text-teal-600" : "text-gray-500"}`}
            >
              <Table className="w-6 h-6" />
            </button>
          </div>
        </div>

        {layout === "card" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence>
              {filterBooks.map((book, idx) => (
                <motion.div
                  key={book._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden border border-base-200 hover:border-teal-500/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:-translate-y-2"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img src={book.image} alt={book.bookName} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {book.category}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-black text-lg line-clamp-1 mb-1 group-hover:text-teal-600 transition-colors">
                      {book.bookName}
                    </h3>
                    <p className="text-sm opacity-60 mb-4">By {book.author}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {book.tags?.slice(0, 2).map((tag, i) => (
                        <span key={i} className="text-[10px] uppercase font-bold tracking-widest px-2 py-1 bg-teal-50 text-teal-700 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-dashed border-base-300">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold opacity-40">Stock</span>
                        <span className={`text-sm font-bold ${book.quantity > 0 ? "text-green-500" : "text-red-500"}`}>
                          {book.quantity > 0 ? `${book.quantity} Left` : "Out of Stock"}
                        </span>
                      </div>
                      <Link to={`/books/${book._id}`}>
                        <button className="btn btn-sm btn-circle btn-ghost border border-base-300 hover:bg-teal-500 hover:text-white transition-all">
                          →
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (

          <div className="overflow-x-auto rounded-3xl border border-base-200 shadow-xl bg-white dark:bg-zinc-900">
            <table className="table w-full">
              <thead className="bg-base-200/50">
                <tr className="text-sm uppercase tracking-wider">
                  <th>Book</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Quantity</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filterBooks.map((book) => (
                  <tr key={book._id} className="hover:bg-base-100 transition-colors border-b border-base-200">
                    <td>
                      <div className="flex items-center gap-4">
                        <img src={book.image} className="w-12 h-16 object-cover rounded-lg shadow-md" alt="" />
                        <span className="font-bold">{book.bookName}</span>
                      </div>
                    </td>
                    <td><span className="badge badge-ghost font-medium">{book.category}</span></td>
                    <td>{book.author}</td>
                    <td>
                      <span className={`font-bold ${book.quantity > 0 ? "text-green-600" : "text-red-500"}`}>
                        {book.quantity}
                      </span>
                    </td>
                    <td className="text-right">
                      <Link to={`/books/${book._id}`} className="btn btn-sm btn-teal-500 bg-teal-500 text-white border-none rounded-xl">
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBook;