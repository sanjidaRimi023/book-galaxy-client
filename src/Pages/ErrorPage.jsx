import { BookX } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-[#fdf6e3] flex items-center justify-center p-6">
      <div className="flex flex-col items-center space-y-6 max-w-lg text-center">
        <BookX className="mx-auto text-primary" size={200} />
        <h1 className="text-4xl font-bold text-gray-800">
          Oops! Page not found 📚
        </h1>
        <p className="text-lg text-gray-600">
          It seems like the book you're searching for got lost in the stacks.
          Let’s help you find your way back to the library!
        </p>
        <Link
          to="/"
          className="inline-block bg-primary text-white px-6 py-3 rounded-xl hover:bg-accent transition-all duration-200"
        >
          Back to Library
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
