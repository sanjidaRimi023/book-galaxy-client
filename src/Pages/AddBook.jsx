import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddBook = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const rawTags = data.tags || "";
    const tagArr = rawTags.split(",").map(tag => tag.trim()).filter(tag => tag !== "");

    const bookData = {
      bookName: data.bookName,
      author: data.author,
      image: data.image,
      shortDescription: data.shortDescription,
      bookContent: data.bookContent,
      quantity: Number(data.quantity),
      rating: Number(data.rating),
      category: data.category,
      tags: tagArr
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/books`, bookData);
      if (res.status === 200 || res.status === 201) {
        toast.success("✅ Book added successfully!");
        reset();
      }
    } catch (err) {
      toast.error("❌ Failed to add book");
      console.error(err);
    }
  };

  return (
    <div className="md:px-20 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">📚 Add A Book</h1>
      <div className="p-10 bg-base-200 border-2 border-primary rounded-3xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="label text-xl font-semibold">Book Name</label>
              <input
                {...register("bookName", { required: "Book name is required" })}
                className="input w-full"
                placeholder="Enter book name"
              />
              {errors.bookName && <p className="text-red-500 text-sm">{errors.bookName.message}</p>}
            </div>

            <div>
              <label className="label text-xl font-semibold">Author Name</label>
              <input
                {...register("author", { required: "Author name is required" })}
                className="input w-full"
                placeholder="Enter author name"
              />
              {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}
            </div>

            <div>
              <label className="label text-xl font-semibold">Category</label>
              <select
                {...register("category", { required: "Category is required" })}
                className="p-2.5 block w-full border rounded-3xl border-gray-300 bg-base-100"
              >
                <option value="">Select Category</option>
                <option value="Novel">Novel</option>
                <option value="Thriller">Thriller</option>
                <option value="History">History</option>
                <option value="Technology">Technology</option>
                <option value="Science-fic">Science-fic</option>
              </select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
            </div>

            <div>
              <label className="label text-xl font-semibold">Quantity</label>
              <input
                type="number"
                {...register("quantity", {
                  required: "Quantity is required",
                  min: 1,
                })}
                className="input w-full"
                placeholder="Enter quantity"
              />
              {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
            </div>

            <div>
              <label className="label text-xl font-semibold">Rating (1-5)</label>
              <input
                type="number"
                {...register("rating", {
                  required: "Rating is required",
                  min: 1,
                  max: 5,
                })}
                className="input w-full"
                placeholder="Rating"
              />
              {errors.rating && <p className="text-red-500 text-sm">{errors.rating.message}</p>}
            </div>

            <div>
              <label className="label text-xl font-semibold">Cover Image URL</label>
              <input
                type="text"
                {...register("image", {
                  required: "Image URL is required",
                })}
                className="input w-full"
                placeholder="Enter image URL"
              />
              {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
            </div>
            <div>
            <label className="label text-xl font-semibold">Book Content</label>
            <textarea
              {...register("bookContent", {
                required: "Book content is required",
              })}

              className="input w-full"
              placeholder="Write full book content or summary"
            ></textarea>
            {errors.bookContent && <p className="text-red-500 text-sm">{errors.bookContent.message}</p>}
          </div>

          <div>
            <label className="label text-xl font-semibold">Tags</label>
            <input
              type="text"
              {...register("tags")}
              className="input w-full"
              placeholder="Enter tags separated by comma (e.g. Family, War)"
            />
          </div>
          </div>

          <div>
            <label className="label text-xl font-semibold">Short Description</label>
            <textarea
              {...register("shortDescription", {
                required: "Short description is required",
              })}
              rows="3"
              className="input w-full h-20"
              placeholder="Write a short description"
            ></textarea>
            {errors.shortDescription && <p className="text-red-500 text-sm">{errors.shortDescription.message}</p>}
          </div>

          

          <input
            type="submit"
            value="Add Book"
            className="btn btn-primary mt-10 w-full border text-lg"
          />
        </form>
      </div>
    </div>
  );
};

export default AddBook;
