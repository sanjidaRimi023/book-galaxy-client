import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Title } from "react-head";
import { useAuth } from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios";

const BorrowedBook = () => {
  const { user } = useAuth()
  const [borrowBook, setBorrowBook] = useState([]);
const axiosInstance=useAxios()
  // useEffect(() => {
  //   if (user?.email) {
  //     axios
  //       .get(`${import.meta.env.VITE_API_URL}/borrowbooks/borrow`)
  //       .then((res) => {
  //         const userBooks = res.data.filter(
  //           (book) => book.email === user.email
  //         );
  //         setBorrowBook(userBooks);
  //       });
  //   }
  // }, [user]);

  useEffect(() => {
    if (user?.email) {
      const token = localStorage.getItem("token");

      axiosInstance
        .get("/borrowbooks/borrow", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setBorrowBook(res.data);
        })
        .catch((error) => {
          console.error("Error fetching borrowed books:", error);
          toast.error("Unauthorized or failed to fetch borrow books!");
        });
    }
  }, [user]);

  const handleReturnBtn = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/borrowbooks/${id}`
      );
      if (res.data.success) {
        toast.success("thanks to return Book");
        setBorrowBook((prev) => prev.filter((book) => book._id !== id));
      } else {
        toast.error("Failed to Return Book");
      }
    } catch (error) {
        console.log(error);
      toast.error("server error");
    }
  };
  return (
    <>
      <Title>
      BookGalaxy || Borrow</Title>
      <div className="overflow-x-auto container mx-auto my-6">
        <h2 className="text-4xl font-bold text-info text-center">
          Borrowed Books
        </h2>
        <table className="table w-full table-zebra">
          {borrowBook.length === 0 ? (
            <thead>
              <tr>
              <td colSpan="4" className="text-center py-6 text-gray-500">
                No books borrowed yet.
              </td>
            </tr>
            </thead>
          ) : (
            <>
              <thead>
                <tr>
                  <th>Cover</th>
                  <th>Book Title</th>
                  <th>Return Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {borrowBook.map((book) => (
                  <tr key={book._id}>
                    <td>
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-12 h-16 object-cover rounded"
                      />
                    </td>
                    <td>{book.title}</td>
                    <td>{book.returnDate}</td>
                    <td>
                      <button
                        onClick={() => handleReturnBtn(book._id)}
                        className="btn btn-sm btn-error text-white"
                      >
                        Return
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </table>
      </div>
    </>
  );
};

export default BorrowedBook;
