import { RotateCcw, Book } from "lucide-react";
import Swal from "sweetalert2";

const BorrowedBooksTable = ({ books, refetch, axiosSecure }) => {
  const handleReturn = async (id) => {
    try {
      const res = await axiosSecure.patch(`/return/${id}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Returned!", "Book returned successfully.", "success");
        refetch();
      }
    } catch  {
      Swal.fire("Error", "Could not return book.", "error");
    }
  };

  return (
    <div className="bg-base-100 rounded-2xl border border-primary/10 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-primary/5">
        <h3 className="text-xl font-black italic uppercase">My_Borrow_History</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-primary/5 text-primary">
            <tr className="border-none uppercase text-[10px] tracking-widest">
              <th>Book Detail</th>
              <th>Borrowed Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books?.map((item) => (
              <tr key={item._id} className="border-primary/5 hover:bg-primary/5 transition-colors">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Book size={18} className="opacity-40" />
                    </div>
                    <div>
                      <div className="font-bold text-sm">{item.bookTitle}</div>
                      <div className="text-[10px] opacity-50">{item.category}</div>
                    </div>
                  </div>
                </td>
                <td className="text-xs font-medium opacity-70">{item.borrowDate}</td>
                <td>
                  <span className={`badge badge-sm font-black ${item.status === 'Returned' ? 'badge-success' : 'badge-warning'}`}>
                    {item.status.toUpperCase()}
                  </span>
                </td>
                <td>
                  {item.status !== "Returned" && (
                    <button 
                      onClick={() => handleReturn(item._id)}
                      className="btn btn-ghost btn-xs text-emerald-500 hover:bg-emerald-500/10 flex items-center gap-1"
                    >
                      <RotateCcw size={14} /> Return
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BorrowedBooksTable;