import React from "react";
import toast from "react-hot-toast";
import { Title } from "react-head";
import { useAuth } from "../../../Hooks/useAuth";
import useAxios from "../../../Hooks/useAxios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const UserBorrowBook = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();


  const { data: borrowBook = [], isLoading, isError } = useQuery({
    queryKey: ["borrowed-books", user?.email], 
    queryFn: async () => {
      const res = await axiosInstance.get("/borrowbooks/borrow");
      return res.data;
    },
    enabled: !!user?.email, 
    staleTime: 1000 * 60 * 5, 
  });


  const returnMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`/borrowbooks/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Thanks for returning the book!");
      
        queryClient.invalidateQueries(["borrowed-books", user?.email]);
      }
    },
    onError: () => {
      toast.error("Failed to Return Book");
    },
  });

  if (isLoading)
    return <div className="text-center py-20 text-primary">Loading...</div>;
  if (isError)
    return (
      <div className="text-center py-20 text-error">Something went wrong!</div>
    );

  return (
    <>
      <Title>BookGalaxy || Borrow</Title>
      <div className="container mx-auto my-10 px-4">
        <h2 className="text-4xl font-bold text-center mb-10">
          My Borrowed Books
        </h2>

        {borrowBook.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-xl font-medium bg-base-200 rounded-xl">
            You haven't borrowed any books yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {borrowBook.map((book) => (
              <div
                key={book._id}
                className="relative group bg-white/10 backdrop-blur-md border border-primary shadow-xl 
                           hover:shadow-primary/30 transition-all duration-500 
                           hover:-translate-y-2 p-5
                           rounded-tl-[50px] rounded-br-[50px] rounded-tr-lg rounded-bl-lg"
              >
                {/* Book Image */}
                <div className="overflow-hidden rounded-tl-[40px] rounded-br-[40px] rounded-tr-md rounded-bl-md mb-4 h-64">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold truncate">{book.title}</h3>

                  <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-wider ">
                      Return Date
                    </span>
                    <p className="text-sm font-semibold text-red-600">
                      {book.returnDate}
                    </p>
                  </div>

                  {/* Return Button */}
                  <button
                    onClick={() => returnMutation.mutate(book._id)}
                    disabled={returnMutation.isPending}
                    className="w-full py-3 bg-primary text-black font-bold rounded-xl transition-colors shadow-lg shadow-primary/20 duration-200"
                  >
                    {returnMutation.isPending ? "Returning..." : "Return Book"}
                  </button>
                </div>

                {/* Decorative Element */}
                <div className="absolute -top-2 -right-2 w-8 h-8 dark:bg-accent rounded-full blur-xl transition-opacity"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default UserBorrowBook;