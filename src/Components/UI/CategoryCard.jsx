import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import LoadSppiner from "../LoadSppiner";
import LotLoader from "../LotLoader";


const CategoryCard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uniqCategories, SetUniqCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/books`)
      .then((res) => {
        setBooks(res.data);
        setLoading(false);

        const categories = [...new Set(res.data.map((book) => book.category))];
        SetUniqCategories(categories);
      })
      .catch((err) => {
        console.error("Failed to fetch books:", err);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <LotLoader></LotLoader>;
  }

  return (
    <>
      <div className="container mx-auto space-y-2">
        <h1 className="md:text-4xl text-info font-bold flex justify-center">
          Explore Categories
        </h1>
        <div className="w-full flex justify-center items-center py-4 pl-2 overflow-hidden">
          <div className="flex flex-wrap gap-4 animate-bounce mt-4">
            {uniqCategories.map((category, idx) => (
              <Link key={idx} to={`/category/${category}`}>
                <div className="border border-accent text-center rounded-md shadow-md px-4 py-2 bg-base-100 hover:bg-accent hover:text-white transition">
                  <span>{category}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryCard;
