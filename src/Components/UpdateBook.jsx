import React from "react";

const UpdateBook = ({ book, onClose, onChange, onSubmit }) => {
  if (!book) return null;

  return (
    <dialog id="update_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="text-2xl font-bold mb-4">Update Book</h3>
        <form onSubmit={onSubmit} className="space-y-3">
          <label className="text-lg">Book cover pic</label>
          <input
            type="text"
            name="image"
            value={book.image || ""}
            onChange={onChange}
            placeholder="Image URL"
            className="input input-bordered w-full"
            required
          />
          <label className="text-lg">book name</label>
          <input
            type="text"
            name="bookName"
            value={book.bookName || ""}
            onChange={onChange}
            placeholder="Book Name"
            className="input input-bordered w-full"
            required
          />
          <label className="text-lg">Author</label>
          <input
            type="text"
            name="author"
            value={book.author || ""}
            onChange={onChange}
            placeholder="Author"
            className="input input-bordered w-full"
            required
          />
          <label className="text-lg">Category</label>
          <select
            name="category"
            value={book.category || ""}
            onChange={onChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">All Categories</option>
            <option value="Thriller">Thriller</option>
            <option value="Novel">Novel</option>
            <option value="History">History</option>
            <option value="Drama">Drama</option>
            <option value="Sci-Fi">Sci-Fi</option>
          </select>
          <label className="text-lg">Rating</label>
          <input
            type="number"
            name="rating"
            value={book.rating || ""}
            onChange={onChange}
            placeholder="Rating (1-5)"
            min="1"
            max="5"
            className="input input-bordered w-full"
            required
          />

          <div className="modal-action">
            <button type="submit" className="btn btn-success">
              Save
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateBook;
