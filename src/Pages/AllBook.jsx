import { LayoutGrid, Table } from "lucide-react";
import React, { useEffect, useState } from "react";
import LoadSppiner from "../Components/LoadSppiner";
import { Link } from "react-router";
import { AnimatePresence } from "framer-motion";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import UpdateBook from "../Components/UpdateBook";

const AllBook = () => {
  const [books, setBooks] = useState([]);
  const [layout, setLayout] = useState("card");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectBooks, setSelectBook] = useState(null);

  const filterBooks = books.filter((book) =>
    book.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    axios(`${import.meta.env.VITE_API_URL}/books`)
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch books:", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/books/${selectBooks._id}`,
        selectBooks
      );

      const updateData = books.map((book) =>
        book._id === selectBooks._id ? selectBooks : book
      );
      setBooks(updateData);

      document.getElementById("update_modal").close();
      toast.success("Book updated seccessfully");
    } catch (error) {
      toast.error("Fail to Update Data");
      console.error("update error", error);
    }
  };

  const openModal = (book) => {
    setSelectBook(book);
    setTimeout(() => {
      const modal = document.getElementById("update_modal");
      if (modal) modal.showModal();
    }, 0);
  };

  if (loading) {
    return <LoadSppiner></LoadSppiner>;
  }

  return (
    <>
      <div className="flex flex-col space-y-3 justify-center my-10 items-center">
        <h1 className="text-3xl font-bold text-primary text-center flex gap-2 items-center">
          Explore Our Book Collection
        </h1>
        <p className="text-lg font-medium w-2/3 text-center">
          Welcome to the complete catalog of our library collection. This
          section provides access to every available book, carefully categorized
          for your convenience.
        </p>
      </div>
      <div className="flex justify-center my-5 gap-3">
        <select
          className="select select-bordered"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Thriller">Thriller</option>
          <option value="Novel">Novel</option>
          <option value="History">History</option>
          <option value="Drama">Drama</option>
          <option value="Sci-Fi">Sci-Fi</option>
        </select>
      </div>
      <div className="flex justify-end pr-20 mb-4">
        <div
          className="tooltip tooltip-left flex gap-2"
          data-tip={layout === "card" ? "Switch to Table" : "Switch to Card"}
        >
          <span className="text-xl text-center">View</span>
          <label className="swap swap-rotate cursor-pointer transition-transform hover:scale-110 active:scale-95">
            <input
              type="checkbox"
              onChange={(e) => setLayout(e.target.checked ? "table" : "card")}
              checked={layout === "table"}
            />
            <LayoutGrid className="swap-off w-8 h-8" />
            <Table className="swap-on w-8 h-8" />
          </label>
        </div>
      </div>
      {layout === "card" ? (
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filterBooks.map((book, index) => (
              <motion.div
                key={book._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="card border border-primary shadow-md rounded-xl hover:shadow-lg transition duration-300"
              >
                <figure className="px-6 pt-6">
                  <img
                    src={book.image}
                    alt={book.bookName}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-xl">
                    Book Name:{" "}
                    <span className="text-error">{book.bookName}</span>
                  </h2>
                  <p className="text-lg">
                    <span>Author Name:</span> {book.author}
                  </p>
                  <p className="text-lg">
                    <span>Category: </span>
                    <span className="badge badge-warning rounded-2xl">
                      {book.category}
                    </span>
                  </p>
                  <div className="flex gap-2">
                     <span>Tags:</span>
                    {book.tags?.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 justify-end">
                    <div className="card-actions">
                      <Link to={`/books/${book._id}`}>
                        <button className="btn  btn-xs sm:btn-sm btn-primary">Detail</button>
                      </Link>
                    </div>
                    <div className="card-actions">
                      <button
                        className="btn btn-xs sm:btn-sm btn-secondary"
                        onClick={() => openModal(book)}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="w-full overflow-x-auto px-2 sm:px-4 lg:px-8 py-4">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
              <table className="min-w-full divide-y divide-gray-200 table-auto">
                <thead className="bg-base-300 text-sm text-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left">Image</th>
                    <th className="px-4 py-3 text-left">Book Name</th>
                    <th className="px-4 py-3 text-left">Author</th>
                    <th className="px-4 py-3 text-left">Tags</th>
                    <th className="px-4 py-3 text-left">Detail</th>
                    <th className="px-4 py-3 text-left">Update</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white text-sm">
                  {filterBooks.map((book) => (
                    <tr key={book._id} className="hover:bg-base-200">
                      <td className="px-4 py-3">
                        <img
                          src={book.image}
                          alt={book.bookName}
                          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md"
                        />
                      </td>
                      <td className="px-4 py-3 font-medium">{book.bookName}</td>
                      <td className="px-4 py-3">{book.author}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {book.tags?.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Link to={`/books/${book._id}`}>
                          <button className="btn btn-xs sm:btn-sm btn-primary">
                            Details
                          </button>
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          className="btn btn-xs sm:btn-sm btn-secondary"
                          onClick={() => openModal(book)}
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      <UpdateBook
        book={selectBooks}
        onClose={() => document.getElementById("update_modal").close()}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default AllBook;
