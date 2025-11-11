import React, { useContext, useState } from "react";
import bookDetailBg2 from "../assets/books2.jpg";
import { useLoaderData, useNavigate } from "react-router";
import StarRatings from "react-star-ratings";
import { Authcontext } from "../Context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { Title } from "react-head";


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
        } else {
          // toast.error("Rating update failed");
        }
      })
      .catch((err) => {
        console.error(err);
        // toast.error("Server error!");
      });
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
          toast.error("you have Already borrowed this book..!!");
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
              } else {
                toast.error("Borrow failed!");
              }
            })
            .catch((err) => {
              console.error(err);
              toast.error("Something went wrong!");
            });
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Server error during borrow check!");
      });
  };
  const shortdes = shortDescription?.slice(0, 100) + "...";

  return (
    <>
      <Title>
     BookGalaxy || BookDetail
      </Title>
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

          <div>
            Quantity: <span className="font-bold">{bookQuantity}</span>
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
              onClick={() => setIsDescriptionOpen(true)}
            >
              Read more
            </button>
          </div>
          <button
            className="btn btn-primary w-40"
            onClick={() => setIsModalOpen(true)}
            disabled={bookQuantity === 0}
          >
            {bookQuantity === 0 ? "Out of Stock" : "Borrow"}
          </button>
        </div>
      </div>

      {isDescriptionOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-bold mb-2">Full Description</h3>
            <p className="mb-4">{shortDescription}</p>
            <h3 className="text-lg font-bold mb-2">Book Content</h3>
            <p>{bookContent}</p>
            <div className="modal-action">
              <button
                className="btn btn-error text-white"
                onClick={() => setIsDescriptionOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}

      {isModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <form onSubmit={handleBorrow}>
              <h3 className="font-bold text-lg">Borrow Book</h3>

              <input
                type="text"
                value={user.displayName}
                disabled
                className="input input-bordered w-full my-2"
              />
              <input
                type="email"
                value={user.email}
                disabled
                className="input input-bordered w-full my-2"
              />
              <input
                type="date"
                name="returnDate"
                required
                className="input input-bordered w-full my-2"
              />

              <div className="modal-action">
                <button type="submit" className="btn btn-success">
                  Confirm
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </>
  );
};

export default BookDetail;
