import React, { useState, useEffect } from "react";
import bookDetailBg2 from "../assets/books2.jpg";
import { useLoaderData } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import UpdateBook from "../Components/UpdateBook";
import StarRatings from "react-star-ratings";

const BookDetail = () => {
  const loaderBook = useLoaderData();
  const [bookData, setBookData] = useState(loaderBook);
  const [selectBook, setSelectBook] = useState(null);

  useEffect(() => {
    if (selectBook) {
      const modal = document.getElementById("update_modal");
      if (modal) modal.showModal();
    }
  }, [selectBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/books/${selectBook._id}`,
        selectBook
      );

      setBookData(selectBook);

      const modal = document.getElementById("update_modal");
      if (modal) modal.close();

      toast.success("Book updated successfully!");
    } catch (error) {
      toast.error("Failed to update the book.");
      console.error("Update error:", error);
    }
  };

  const openModal = () => {
    setSelectBook(bookData);
  };

  const {
    bookName,
    author,
    image,
    shortDescription,
    bookContent,
    quantity,
    rating,
    category,
    tags,
    _id,
  } = bookData;
  console.log(rating);

  const star = parseInt(rating);

  const [ratingStar, setRatingStar] = useState(star);

  const changeRating = (newRating) => {
    setRatingStar(newRating);
  };

  const shortdes = shortDescription?.slice(0, 100) + "...";

  return (
    <>
      <div
        style={{ backgroundImage: `url(${bookDetailBg2})` }}
        className="relative h-[250px] md:h-[300px] flex items-center justify-center bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-black/50" />
        <span className="text-xl md:text-4xl text-white font-bold z-10 px-4 py-2 rounded-md bg-white/10 backdrop-blur-2xl shadow-lg text-center">
          Explore the Story Behind the Cover
        </span>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 mt-10 items-center">
        <div className="flex justify-center">
          <div className="bg-base-300 border-2 border-warning rounded-2xl p-4 sm:p-6 shadow-lg w-full max-w-xs">
            <img
              className="w-full object-cover rounded-xl"
              src={image}
              alt="book cover"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-4 text-base md:text-lg">
          <h2 className="text-2xl md:text-3xl font-bold">Name: {bookName}</h2>

          <div>
            Author Name:{" "}
            <span className="text-warning font-bold">{author}</span>
          </div>

          <div>
            Category: <span className="text-warning font-bold">{category}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Rating:</span>
              <StarRatings
                rating={ratingStar}
                starRatedColor="red"
                changeRating={changeRating}
                numberOfStars={5}
                name="ratingStar"
                starDimension="30px"
              />
            </div>
          </div>

          <div>
            Quantity: <span className="font-bold">{quantity}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            Tags:{" "}
            {tags?.map((tag, index) => (
              <span
                key={index}
                className="bg-teal-200 text-teal-800 text-xs px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div>
            Description: <span>{shortdes}</span>
            <button
              className="text-warning"
              onClick={() => document.getElementById("book_modal").showModal()}
            >
              Read more
            </button>
          </div>
          <button className="btn w-30 sm:btn-sm btn-info" onClick={openModal}>
            Update
          </button>
        </div>
      </div>

      <dialog id="book_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="text-lg font-bold mb-2">Full Description</h3>
          <p className="mb-4">{shortDescription}</p>
          <h3 className="text-lg font-bold mb-2">Book Content</h3>
          <p>{bookContent}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-error text-white">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <UpdateBook
        book={selectBook}
        onClose={() => {
          const modal = document.getElementById("update_modal");
          if (modal) modal.close();
          setSelectBook(null);
        }}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default BookDetail;
