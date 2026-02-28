import { BookPlus, Image as ImageIcon, Star, X } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AddBookModal = ({ onClose, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const bookData = {
      ...data,
      quantity: Number(data.quantity),
      rating: Number(data.rating),
      tags: data.tags.split(",").map((t) => t.trim()),
    };

    try {
      const res = await axiosSecure.post("/admin/books", bookData);
      if (res.data.insertedId) {
        toast.success("New book added to library!");
        refetch();
        reset();
        onClose();
      }
    } catch {
      toast.error("Process failed!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-base-200 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl relative animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-primary/10 text-primary rounded-2xl font-bold uppercase">
              <BookPlus />
            </div>
            <h2 className="text-3xl font-black  tracking-tight">
              Add New Collection
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Book Name */}
              <div className="space-y-2">
                <label className="text-sm font-bold  ml-1">Book Title</label>
                <input
                  {...register("bookName", { required: true })}
                  className="w-full px-5 py-3.5 bg-base-100 rounded-2xl focus:ring-2 focus:ring-primary transition-all outline-none"
                  placeholder="e.g. The Great Gatsby"
                />
              </div>

              {/* Author */}
              <div className="space-y-2">
                <label className="text-sm font-bold  ml-1">Author Name</label>
                <input
                  {...register("author", { required: true })}
                  className="w-full px-5 py-3.5  bg-base-100 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all outline-none"
                  placeholder="Author's name"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-sm font-bold  ml-1">Category</label>
                <select
                  {...register("category", { required: true })}
                  className="w-full px-5 py-3.5  bg-base-100 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all outline-none appearance-none"
                >
                  <option value="Novel">Novel</option>
                  <option value="Thriller">Thriller</option>
                  <option value="Technology">Technology</option>
                  <option value="Science-fic">Science-fic</option>
                </select>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <label className="text-sm font-bold  ml-1">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  {...register("quantity", { required: true })}
                  className="w-full px-5 py-3.5  bg-base-100 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all outline-none"
                  placeholder="Quantity"
                />
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <label className="text-sm font-bold  ml-1">Rating (1-5)</label>
                <div className="relative">
                  <Star
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400"
                    size={18}
                  />
                  <input
                    type="number"
                    step="0.1"
                    {...register("rating", { required: true, min: 1, max: 5 })}
                    className="w-full pl-12 pr-5 py-3.5  bg-base-100 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all outline-none"
                    placeholder="4.5"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <label className="text-sm font-bold  ml-1">
                  Cover Image URL
                </label>
                <div className="relative">
                  <ImageIcon
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    {...register("image", { required: true })}
                    className="w-full pl-12 pr-5 py-3.5  bg-base-100 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all outline-none"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>

            {/* Description & Content */}
            <div className="space-y-2">
              <label className="text-sm font-bold  ml-1">
                Short Description
              </label>
              <textarea
                {...register("shortDescription", { required: true })}
                rows="2"
                className="w-full px-5 py-3.5  bg-base-100 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all outline-none"
                placeholder="Write a catchy summary..."
              ></textarea>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold  ml-1">
                Tags (Comma separated)
              </label>
              <input
                {...register("tags")}
                className="w-full px-5 py-3.5  bg-base-100 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all outline-none"
                placeholder="History, War, Classic"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-info transition-all "
            >
              Publish Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBookModal;
