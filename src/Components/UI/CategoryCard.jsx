import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router"; // ✅ Fixed incorrect import
import { BookMarked } from "lucide-react";
import LotLoader from "../LotLoader";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const CategoryCard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uniqCategories, setUniqCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/books`)
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
        const categories = [...new Set(res.data.map((book) => book.category))];
        setUniqCategories(categories);
      })
      .catch((err) => {
        console.error("Failed to fetch books:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LotLoader />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-center md:text-4xl font-bold text-primary mb-10 drop-shadow">
         Explore Book Categories
      </h1>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {uniqCategories.slice(0, 4).map((category, idx) => (
          <Link key={idx} to={`/category/${category}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="group rounded-2xl p-6 bg-base-200 shadow-lg hover:shadow-xl hover:border-primary transition-all duration-300 flex flex-col items-center text-center hover:bg-gradient-to-tr hover:from-primary hover:to-secondary hover:text-white border border-primary"
            >
              <div className="bg-primary/10 p-4 rounded-full mb-4 group-hover:bg-white transition duration-300">
                <BookMarked className="w-10 h-10 text-primary group-hover:text-primary" />
              </div>
              <h2 className="text-xl font-semibold capitalize">{category}</h2>
              <p className="text-sm mt-2 opacity-70 group-hover:opacity-100">
                Discover top books in <span className="font-medium">{category}</span>
              </p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;
