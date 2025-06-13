import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddBook = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  
  const [previewURL, setPreviewURL] = useState(null);

  const onSubmit = (data) => {
    console.log("📚 Book Data Submitted:", data);
    reset();
    setPreviewURL(null); 
  };

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  return (
    <div className="md:px-20 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">📚 Add A Book</h1>
      <div className="p-10 bg-base-200 border-2 border-primary rounded-3xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            
            <div>
              <label className="label text-xl font-semibold">Book Title</label>
              <input
                {...register("title", { required: "Title is required" })}
                className="input w-full"
                placeholder="Enter book title"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
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
                {...register("quantity", { required: "Quantity is required", min: 1 })}
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
                  max: 5
                })}
                className="input w-full"
                placeholder="Rating"
              />
              {errors.rating && <p className="text-red-500 text-sm">{errors.rating.message}</p>}
            </div>

         
            <div>
              <label className="label text-xl font-semibold">Book Cover</label>
              <input
                type="file"
                accept="image/*"
                {...register("coverImage", { required: "Cover image is required" })}
                onChange={(e) => {
                  handleImageChange(e);
                }}
                className="file-input w-full"
              />
              {errors.coverImage && <p className="text-red-500 text-sm">{errors.coverImage.message}</p>}

            
            </div>
          </div>

          <div className="mt-6">
            <label className="label text-xl font-semibold">Short Description</label>
            <textarea
              {...register("description", { required: "Description is required" })}
              rows="4"
              className="input w-full h-28"
              placeholder="Write a short description"
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
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
