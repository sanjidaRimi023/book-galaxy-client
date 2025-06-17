import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import LoadSppiner from "../Components/LoadSppiner";
import { AnimatePresence } from "framer-motion";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import UpdateBook from "../Components/UpdateBook";

const CategoriesPage = () => {
  const { category } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectBooks, setSelectBook] = useState(null);

  const openModal = (book) => {
    setSelectBook(book);
    setTimeout(() => {
      const modal = document.getElementById("update_modal");
      if (modal) modal.showModal();
    }, 0);
  };
 const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectBook((prev) => ({ ...prev, [name]: value }));
  };



  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/category/${category}`)
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      });
  }, [category]);

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

  if (loading) return <LoadSppiner />;

  return (
    <>
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        Books in "{category}" Category
      </h2>
      <Link></Link>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {books.map((book, index) => (
            <motion.div
              key={book._id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="card border border-primary shadow-md rounded-xl hover:shadow-lg transition duration-300"
            >
              <figure className="px-6 pt-6">
                <img
                  src={book.image}
                  alt={book.bookName}
                  className="object-cover rounded-lg"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-xl">
                  Book Name: <span className="text-error">{book.bookName}</span>
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
                      <button className="btn  btn-xs sm:btn-sm btn-primary">
                        Detail
                      </button>
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
      </div>
      <UpdateBook
        book={selectBooks}
        onClose={() => document.getElementById("update_modal").close()}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      </>
  );
};

export default CategoriesPage;
