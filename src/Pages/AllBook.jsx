import { ArrowDownNarrowWide, LayoutGrid, Search, Table } from "lucide-react";
import React, { useEffect, useState } from "react";
import LoadSppiner from "../Components/LoadSppiner";

const AllBook = () => {
  const [books, setBooks] = useState([]);
  const [layout, setLayout] = useState("card");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const filterBooks = books.filter((book) =>
    book.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/books`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch books:", err);
        setLoading(false);
      });
  }, []);

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

      {/* Search Input */}
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

      {/* Layout Toggle Button */}
      <div className="flex justify-end pr-20 mb-4">
        <div
          className="tooltip tooltip-left"
          data-tip={
            layout === "card" ? "Switch to Table View" : "Switch to Card View"
          }
        >
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

      {/* Book Layout Display */}
      {layout === "card" ? (
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filterBooks.map((book) => (
            <div
              key={book._id}
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
                  <span className="text-error"> {book.bookName}</span>
                </h2>
                <p className="text-lg">
                  <span>Author Name:</span> {book.author}
                </p>
                <p className="text-lg">
                  <span>Category : </span>
                  <span className="badge badge-warning rounded-2xl">
                    {book.category}
                  </span>
                </p>

                <div className="flex gap-2">
                  {book.tags?.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="card-actions">
                  <button className="btn btn-primary">Detail</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto container mx-auto">
          <table className="table border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-base-300">
              <tr>
                <th>Image</th>
                <th>Book Name</th>
                <th>Author</th>
                <th>Tags</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filterBooks.map((book) => (
                <tr key={book._id} className="border-t hover:bg-base-300">
                  <td className="py-3 px-4">
                    <img
                      src={book.image}
                      alt={book.bookName}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium">{book.bookName}</td>
                  <td className="py-3 px-4">{book.author}</td>
                  <td className="py-3 px-4">
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
                  <td className="py-3 px-4">
                    <button className="btn btn-sm btn-primary">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default AllBook;
