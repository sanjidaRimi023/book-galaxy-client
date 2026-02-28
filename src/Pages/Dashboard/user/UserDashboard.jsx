import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useUserDashboard from "../../../Hooks/useUserDashboard";
import UserStats from "../components/UserStats";
import BorrowedBooksTable from "./BorrowedBooksTable";


const UserDashboard = () => {
  const { data, isLoading, refetch } = useUserDashboard();
  const axiosSecure = useAxiosSecure();

  if (isLoading) return <div className="p-10 font-black italic animate-pulse">LOADING_USER_DATA...</div>;

  return (
    <div className="min-h-screen bg-base-100 p-6 lg:p-10 space-y-10 text-primary">
      <header>
        <h1 className="text-4xl font-black tracking-tighter uppercase italic">User_Dashboard</h1>
        <p className="opacity-60 font-medium italic">Track your reading progress and manage borrowed items.</p>
      </header>

      {/* Summary Cards */}
      <UserStats summary={data?.summary} />

      <div className="grid grid-cols-1 gap-8">
        {/* Table for History & Returning Books */}
        <BorrowedBooksTable 
          books={data?.history} 
          refetch={refetch} 
          axiosSecure={axiosSecure} 
        />
      </div>
    </div>
  );
};

export default UserDashboard;