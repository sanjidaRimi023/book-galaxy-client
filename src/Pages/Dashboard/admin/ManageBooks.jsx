import { useQuery } from "@tanstack/react-query";
import { Edit, Layers, Plus, Search, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import AddBookModal from "./AddBookModal";

const ManageBooks = () => {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: books = [], refetch } = useQuery({
    queryKey: ["manage-books"],
    queryFn: async () => {
      const res = await axiosSecure.get("/books");
      return res.data;
    },
  });

  // Filtering logic
  const filteredBooks = books.filter(
    (book) =>
      book.bookName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-8">
      {/* Upper Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-extrabold  tracking-tight">
            Library Inventory
          </h1>
          <p className=" font-medium">
            Monitoring {books.length} books in total
          </p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative grow md:w-72 group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Search books..."
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-base-100 border rounded-2xl outline-none focus:ring-4 focus:ring-indigo-50 shadow-sm transition-all"
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-primary hover:bg-info  px-6 py-3 rounded-2xl font-bold transition-all whitespace-nowrap"
          >
            <Plus size={20} /> Add Book
          </button>
        </div>
      </div>

      {/* Modern Table Container */}
      <div className="bg-base-100 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-base-100 border-b border-slate-100">
                <th className="px-8 py-5 text-sm font-bold uppercase tracking-wider">
                  Book Detail
                </th>
                <th className="px-6 py-5 text-sm font-bold uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-5 text-sm font-bold uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-5 text-sm font-bold uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-8 py-5 text-sm font-bold uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredBooks.map((book) => (
                <tr
                  key={book._id}
                  className="hover:bg-base-200 transition-colors group"
                >
                  {/* Book Info */}
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-16 rounded-xl overflow-hidden shadow-md ring-2 ring-white">
                        <img
                          src={book.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-lg">{book.bookName}</div>
                        <div className="text-slate-500 text-sm font-medium">
                          by {book.author}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-5">
                    <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wide">
                      {book.category}
                    </span>
                  </td>

                  {/* Stock */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${book.quantity > 0 ? "bg-emerald-500" : "bg-rose-500"}`}
                      ></div>
                      <span className="font-semibold">{book.quantity} pcs</span>
                    </div>
                  </td>

                  {/* Rating */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                      <Star size={16} fill="currentColor" />
                      <span>{book.rating}</span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        className="p-2.5 text-primary rounded-xl transition-all"
                        title="Edit Book"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        className="p-2.5  text-rose-600 rounded-xl transition-all"
                        title="Delete Book"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <div className="p-20 text-center">
            <div className="inline-flex p-6 bg-slate-50 rounded-full mb-4 text-slate-300">
              <Layers size={48} />
            </div>
            <h3 className="text-xl font-bold text-slate-700">No books found</h3>
            <p className="text-slate-500">Try adjusting your search term.</p>
          </div>
        )}
      </div>

      {/* Add Book Modal */}
      {isModalOpen && (
        <AddBookModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default ManageBooks;
