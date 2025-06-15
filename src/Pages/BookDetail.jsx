import React from "react";
import bookDetailBg2 from "../assets/books2.jpg";
import { useLoaderData } from "react-router";

const BookDetail = () => {
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
  } = useLoaderData();

  const shortdes = shortDescription.slice(0, 100) + "...";

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

 
      <div className="container mx-auto px-4 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
  
        <div className="flex justify-center">
          <div className="bg-base-300 border-2 rounded-2xl p-4 sm:p-6 shadow-lg w-full max-w-xs">
            <img
              className="w-full object-cover rounded-xl"
              src={image}
              alt="book cover"
            />
          </div>
        </div>

        {/* Book Info */}
        <div className="flex flex-col space-y-4 text-base md:text-lg">
          <h2 className="text-2xl md:text-3xl font-bold">Name: {bookName}</h2>

          <div>
            Author Name:{" "}
            <span className="text-warning font-bold">{author}</span>
          </div>

          <div>
            Category:{" "}
            <span className="text-warning font-bold">{category}</span>
          </div>

          <div>
            Rating: <span className="text-error">{rating}</span>
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

          {/* Short Description + Modal Trigger */}
          <div>
            Description: <span>{shortdes}</span>
            <br />
            <button
              className="btn btn-accent btn-sm mt-2"
              onClick={() => document.getElementById("book_modal").showModal()}
            >
              Read more
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
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
    </>
  );
};

export default BookDetail;
