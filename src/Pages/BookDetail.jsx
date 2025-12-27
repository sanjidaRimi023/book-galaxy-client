"use client";
import React, { useContext, useState } from "react";
import bookDetailBg2 from "../assets/books2.jpg";
import { useLoaderData, useNavigate } from "react-router";
import StarRatings from "react-star-ratings";
import { Authcontext } from "../Context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { Title } from "react-head";
import { Calendar, User, Tag, Layers, Bookmark, ChevronsRight } from "lucide-react";
import { AnimatePresence } from "framer-motion";

const BookDetail = () => {
  const bookData = useLoaderData();
  const { user } = useContext(Authcontext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookQuantity, setBookQuantity] = useState(bookData.quantity);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const navigate = useNavigate();

  const {
    bookName,
    author,
    image,
    shortDescription,
    bookContent,
    rating,
    category,
    tags,
  } = bookData;

  const [ratingStar, setRatingStar] = useState(parseInt(rating));

  const changeRating = (newRating) => {
    setRatingStar(newRating);
    axios
      .patch(`${import.meta.env.VITE_API_URL}/books/${bookData._id}`, {
        rating: newRating,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Rating updated!");
        }
      })
      .catch((err) => console.error(err));
  };

  const handleBorrow = (e) => {
    e.preventDefault();
    const returnDate = e.target.returnDate.value;

    const borrowInfo = {
      bookId: bookData._id,
      title: bookData.bookName,
      userName: user.displayName,
      email: user.email,
      returnDate,
      image: bookData.image,
      returned: false,
    };

    axios
      .get(
        `${import.meta.env.VITE_API_URL}/borrowbooks/check?bookId=${
          bookData._id
        }&email=${user.email}`
      )
      .then((res) => {
        if (res.data.alreadyBorrow) {
          setIsModalOpen(false);
          toast.error("You have already borrowed this book!");
        } else {
          axios
            .post(
              `${import.meta.env.VITE_API_URL}/borrowbooks/borrow`,
              borrowInfo
            )
            .then((res) => {
              if (res.data.success) {
                setBookQuantity((prev) => prev - 1);
                setIsModalOpen(false);
                toast.success("Borrowed successfully!");
                navigate("/all-books");
              }
            });
        }
      });
  };

  return (
    <div className="bg-base-100 pb-20">
      <Title>BookGalaxy || {bookName}</Title>

      {/* Hero Header Section */}
      <div
        style={{ backgroundImage: `url(${bookDetailBg2})` }}
        className="relative h-[300px] md:h-[400px] flex items-center justify-center bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
        <div className="z-10 text-center px-4">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Explore the Story{" "}
            <span className="text-teal-400">Behind the Cover</span>
          </h1>
          <div className="h-1.5 w-24 bg-teal-500 mx-auto rounded-full" />
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Book Image */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-base-200 p-3 rounded-2xl shadow-2xl">
                <img
                  className="w-full max-w-[320px] h-[450px] object-cover rounded-xl shadow-lg"
                  src={image}
                  alt={bookName}
                />
              </div>
            </div>
          </div>

          {/* Right Side: Details Card */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-zinc-900 border border-base-200 dark:border-zinc-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-4 py-1.5 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full text-xs font-bold uppercase tracking-widest">
                  {category}
                </span>
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase ${
                    bookQuantity > 0
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {bookQuantity > 0
                    ? `In Stock: ${bookQuantity}`
                    : "Out of Stock"}
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 dark:text-white leading-tight">
                {bookName}
              </h2>

              <div className="flex items-center gap-2 mb-8 group">
                <User className="w-5 h-5 text-teal-500" />
                <span className="text-xl font-medium text-gray-600 dark:text-gray-400">
                  By{" "}
                  <span className="text-gray-900 dark:text-white font-bold group-hover:underline cursor-pointer">
                    {author}
                  </span>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 border-y border-base-200 dark:border-zinc-800 py-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                    <Bookmark className="w-5 h-5 text-teal-500" />
                    <StarRatings
                      rating={ratingStar}
                      starRatedColor="#facc15"
                      changeRating={changeRating}
                      numberOfStars={5}
                      starDimension="22px"
                      starSpacing="2px"
                    />
                    <span className="font-bold text-gray-900 dark:text-white">
                      ({ratingStar}.0)
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                    <Layers className="w-5 h-5 text-teal-500" />
                    <span>Multiple Tags Available</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 content-center">
                  {tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-1 bg-base-200 dark:bg-zinc-800 px-3 py-1 rounded-lg text-sm font-medium"
                    >
                      <Tag className="w-3 h-3" /> {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-10">
                <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                  Summary
                </h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed italic text-lg">
                  "{shortDescription?.slice(0, 180)}..."
                </p>
                <button
                  className="mt-4 text-teal-600 font-bold hover:underline flex items-center gap-1"
                  onClick={() => setIsDescriptionOpen(true)}
                >
                  Read Full Content <span>
                    <ChevronsRight />
                  </span>
                </button>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  className={`px-10 py-4 rounded-2xl font-black text-lg transition-all shadow-xl hover:shadow-teal-500/20 ${
                    bookQuantity === 0
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-teal-500 text-white hover:bg-teal-600 active:scale-95"
                  }`}
                  onClick={() => setIsModalOpen(true)}
                  disabled={bookQuantity === 0}
                >
                  {bookQuantity === 0 ? "Unavailable" : "Borrow This Book"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

{/* modal */}
      <AnimatePresence>
        {isDescriptionOpen && (
          <dialog className="modal modal-open backdrop-blur-sm">
            <div className="modal-box w-11/12 max-w-3xl rounded-[2rem] p-8 border border-base-200 shadow-2xl">
              <h3 className="text-3xl font-black mb-6 border-b pb-4">
                Full Book Insights
              </h3>
              <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                <div>
                  <h4 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">
                    Short Description
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                    {shortDescription}
                  </p>
                </div>
                <div className="bg-base-200 dark:bg-zinc-800 p-6 rounded-2xl border-l-4 border-teal-500">
                  <h4 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">
                    Book Content Preview
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {bookContent}
                  </p>
                </div>
              </div>
              <div className="modal-action">
                <button
                  className="btn btn-ghost rounded-xl font-bold"
                  onClick={() => setIsDescriptionOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </dialog>
        )}
      </AnimatePresence>

      {/* Borrow Modal */}
      {isModalOpen && (
        <dialog className="modal modal-open backdrop-blur-md">
          <div className="modal-box rounded-[2rem] p-10">
            <form onSubmit={handleBorrow} className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="font-black text-3xl mb-2">Confirm Borrow</h3>
                <p className="text-gray-500">
                  Please provide the return date below.
                </p>
              </div>

              <div className="space-y-4">
                <div className="form-control">
                  <label className="label font-bold text-xs uppercase tracking-widest opacity-60">
                    Borrower Name
                  </label>
                  <input
                    type="text"
                    value={user.displayName}
                    disabled
                    className="input input-bordered bg-base-200 rounded-xl"
                  />
                </div>
                <div className="form-control">
                  <label className="label font-bold text-xs uppercase tracking-widest opacity-60">
                    Return Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-500" />
                    <input
                      type="date"
                      name="returnDate"
                      required
                      className="input input-bordered w-full pl-12 rounded-xl focus:border-teal-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-8">
                <button
                  type="submit"
                  className="btn bg-teal-500 hover:bg-teal-600 text-white border-none rounded-xl h-14 text-lg font-bold"
                >
                  Confirm Borrowing
                </button>
                <button
                  type="button"
                  className="btn btn-ghost rounded-xl"
                  onClick={() => setIsModalOpen(false)}
                >
                  I've Changed My Mind
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default BookDetail;
